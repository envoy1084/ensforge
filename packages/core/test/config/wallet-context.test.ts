import { Cause, Effect, Exit, Option } from "effect";

import type { WalletClient } from "viem";
import { describe, expect, it } from "vitest";

import { EnsforgeConfigError } from "../../src/index.js";
import { EnsNetworkService } from "../../src/services/network.js";
import { resolveWalletContext, WalletClientService } from "../../src/services/wallet-client.js";
import {
  makeMainnetWalletClient,
  makeSepoliaWalletClient,
  makeSepoliaWalletClientWithoutAccount,
  testAccount,
} from "../fixtures/client-fixtures.js";

const provideSepoliaWallet = <Success, Failure>(
  effect: Effect.Effect<Success, Failure, WalletClientService | EnsNetworkService>,
  walletClient: Option.Option<WalletClient> = Option.none(),
) =>
  effect.pipe(
    Effect.provideService(EnsNetworkService, { network: "sepolia", chainId: 11155111 }),
    Effect.provideService(WalletClientService, { client: walletClient }),
  );

const getFailure = <Success, Failure>(exit: Exit.Exit<Success, Failure>): Failure => {
  if (!Exit.isFailure(exit)) throw new Error("Expected wallet resolution to fail");
  return Option.getOrThrow(Cause.findErrorOption(exit.cause));
};

describe("resolveWalletContext", () => {
  it("uses the configured wallet client and its account", async () => {
    const walletClient = makeSepoliaWalletClient();

    const result = await Effect.runPromise(
      provideSepoliaWallet(resolveWalletContext(), Option.some(walletClient)),
    );

    expect(result).toEqual({ walletClient, account: walletClient.account });
  });

  it("prefers per-call wallet and account overrides", async () => {
    const walletClient = makeSepoliaWalletClientWithoutAccount();

    const result = await Effect.runPromise(
      provideSepoliaWallet(resolveWalletContext({ walletClient, account: testAccount })),
    );

    expect(result).toEqual({ walletClient, account: testAccount });
  });

  it("fails when no wallet client is available", async () => {
    const exit = await Effect.runPromiseExit(provideSepoliaWallet(resolveWalletContext()));

    expect(getFailure(exit)).toEqual(
      new EnsforgeConfigError({
        code: "WALLET_CLIENT_UNAVAILABLE",
        message: "A wallet client is required for this operation",
      }),
    );
  });

  it("fails when no account is available", async () => {
    const walletClient = makeSepoliaWalletClientWithoutAccount();
    const exit = await Effect.runPromiseExit(
      provideSepoliaWallet(resolveWalletContext({ walletClient })),
    );

    expect(getFailure(exit)).toEqual(
      new EnsforgeConfigError({
        code: "WALLET_ACCOUNT_UNAVAILABLE",
        message: "An account is required for this operation",
      }),
    );
  });

  it("rejects a per-call wallet client for another network", async () => {
    const exit = await Effect.runPromiseExit(
      provideSepoliaWallet(resolveWalletContext({ walletClient: makeMainnetWalletClient() })),
    );

    expect(getFailure(exit)).toMatchObject({
      _tag: "EnsforgeConfigError",
      code: "NETWORK_CLIENT_MISMATCH",
    });
  });
});
