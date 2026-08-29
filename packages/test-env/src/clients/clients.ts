import { Effect, Schedule } from "effect";

import {
  createPublicClient,
  createTestClient,
  createWalletClient,
  defineChain,
  http,
  isAddressEqual,
  type Address,
  type Chain,
  type PublicClient,
  type TestClient,
  type WalletClient,
} from "viem";

import { devnetAccounts, devnetUnlockedAccounts } from "../accounts/accounts.js";
import type { devnetAccountRoles } from "../accounts/accounts.js";
import { ensDevnetChainId } from "../devnet/source.js";
import { TestEnvironmentError } from "../errors/test-environment-error.js";

export interface DevnetClients {
  readonly chain: Chain;
  readonly publicClient: PublicClient;
  readonly testClient: TestClient<"anvil">;
  readonly walletClient: WalletClient;
  readonly walletClients: Readonly<Record<(typeof devnetAccountRoles)[number], WalletClient>>;
}

export interface DevnetVerificationClients {
  readonly publicClient: Pick<PublicClient, "getBytecode" | "getChainId">;
  readonly walletClient: Pick<WalletClient, "getAddresses">;
}

export const createDevnetClients = (rpcUrl: string, multicall3: Address): DevnetClients => {
  const chain = defineChain({
    id: ensDevnetChainId,
    name: "ensforge devnet",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    rpcUrls: {
      default: {
        http: [rpcUrl],
      },
    },
    contracts: {
      multicall3: {
        address: multicall3,
        blockCreated: 0,
      },
    },
  });
  const transport = http(rpcUrl, { retryCount: 0, timeout: 5_000 });
  const publicClient = createPublicClient({ chain, transport });
  const createAccountClient = (account: Address) =>
    createWalletClient({ account, chain, transport });
  const walletClients = {
    deployer: createAccountClient(devnetAccounts.deployer),
    owner: createAccountClient(devnetAccounts.owner),
    owner2: createAccountClient(devnetAccounts.owner2),
    operator: createAccountClient(devnetAccounts.operator),
    unauthorized: createAccountClient(devnetAccounts.unauthorized),
  } satisfies Record<(typeof devnetAccountRoles)[number], WalletClient>;

  return {
    chain,
    publicClient,
    testClient: createTestClient({ chain, mode: "anvil", transport }),
    walletClient: walletClients.owner,
    walletClients,
  };
};

export const verifyDevnetClients = Effect.fn("verifyDevnetClients")(function* (
  clients: DevnetVerificationClients,
  requiredAddresses: ReadonlyArray<Address>,
) {
  const chainId = yield* Effect.tryPromise({
    try: () => clients.publicClient.getChainId(),
    catch: (cause) => cause,
  }).pipe(
    Effect.retry({ schedule: Schedule.spaced(500), times: 30 }),
    Effect.timeout(60_000),
    Effect.mapError(
      (cause) =>
        new TestEnvironmentError({
          code: "RPC_INVALID",
          message: "Unable to read the ENS devnet chain ID",
          cause,
        }),
    ),
  );

  if (chainId !== ensDevnetChainId) {
    return yield* new TestEnvironmentError({
      code: "RPC_INVALID",
      message: `ENS devnet returned chain ${chainId}, expected ${ensDevnetChainId}`,
      cause: chainId,
    });
  }

  const unlockedAccounts = yield* Effect.tryPromise({
    try: () => clients.walletClient.getAddresses(),
    catch: (cause) =>
      new TestEnvironmentError({
        code: "RPC_INVALID",
        message: "Unable to read ENS devnet accounts",
        cause,
      }),
  });
  const missingAccounts = devnetUnlockedAccounts.filter(
    (expected) => !unlockedAccounts.some((actual) => isAddressEqual(actual, expected)),
  );

  if (missingAccounts.length > 0) {
    return yield* new TestEnvironmentError({
      code: "RPC_INVALID",
      message: "ENS devnet does not expose the expected deterministic accounts",
      cause: missingAccounts,
    });
  }

  yield* Effect.forEach(
    requiredAddresses,
    (address) =>
      Effect.tryPromise({
        try: () => clients.publicClient.getBytecode({ address }),
        catch: (cause) =>
          new TestEnvironmentError({
            code: "RPC_INVALID",
            message: `Unable to inspect bytecode at ${address}`,
            cause,
          }),
      }).pipe(
        Effect.flatMap((bytecode) =>
          bytecode === undefined || bytecode === "0x"
            ? Effect.fail(
                new TestEnvironmentError({
                  code: "BYTECODE_MISSING",
                  message: `ENS devnet has no contract bytecode at ${address}`,
                  cause: address,
                }),
              )
            : Effect.void,
        ),
      ),
    { concurrency: 8, discard: true },
  );
});
