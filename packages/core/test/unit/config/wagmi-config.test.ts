import { it } from "@effect/vitest";
import { Cause, Effect, Exit, Option } from "effect";

import { mainnet, sepolia } from "viem/chains";
import { describe, expect } from "vitest";
import { createConfig as createWagmiConfig, custom, mock } from "wagmi";
import { connect } from "wagmi/actions";

import { ConfigError, createConfig } from "../../../src/index.js";
import { getConfigLayer } from "../../../src/internal/config/context.js";
import { resolveWalletContext } from "../../../src/internal/services/wallet-client.js";
import { testAccount } from "../fixtures/client-fixtures.js";

const transport = custom({
  request: () => Promise.reject(new Error("The test transport must not make an RPC request")),
});

const getFailure = <Success, Failure>(exit: Exit.Exit<Success, Failure>): Failure => {
  if (!Exit.isFailure(exit)) throw new Error("Expected wallet resolution to fail");
  return Option.getOrThrow(Cause.findErrorOption(exit.cause));
};

describe("createConfig with Wagmi", () => {
  it("selects the public client for the configured ENS network", () => {
    const wagmiConfig = createWagmiConfig({
      chains: [mainnet, sepolia],
      transports: {
        [mainnet.id]: transport,
        [sepolia.id]: transport,
      },
    });

    const config = createConfig({ network: "sepolia", wagmiConfig });

    expect(config.network).toBe("sepolia");
    expect(config.publicClient.chain?.id).toBe(sepolia.id);
    expect(config.walletClient).toBeUndefined();
  });

  it("rejects a Wagmi config without the selected ENS network", () => {
    const wagmiConfig = createWagmiConfig({
      chains: [mainnet],
      transports: { [mainnet.id]: transport },
    });

    expect(() => createConfig({ network: "sepolia", wagmiConfig })).toThrow(
      new ConfigError({
        code: "PUBLIC_CLIENT_UNAVAILABLE",
        message: "The Wagmi config does not provide a public client for sepolia (11155111)",
      }),
    );
  });

  it.effect("resolves the current Wagmi wallet when a write needs it", () =>
    Effect.gen(function* () {
      const wagmiConfig = createWagmiConfig({
        chains: [sepolia],
        connectors: [mock({ accounts: [testAccount] })],
        transports: { [sepolia.id]: transport },
      });
      const config = createConfig({ network: "sepolia", wagmiConfig });
      const beforeConnection = yield* Effect.exit(
        Effect.provide(resolveWalletContext(), getConfigLayer(config)),
      );

      expect(getFailure(beforeConnection)).toMatchObject({
        _tag: "ConfigError",
        code: "WALLET_CLIENT_UNAVAILABLE",
      });

      yield* Effect.tryPromise(() =>
        connect(wagmiConfig, {
          connector: wagmiConfig.connectors[0],
          chainId: sepolia.id,
        }),
      );

      const resolved = yield* Effect.provide(resolveWalletContext(), getConfigLayer(config));

      expect(
        typeof resolved.account === "string" ? resolved.account : resolved.account.address,
      ).toBe(testAccount);
      expect(resolved.walletClient.chain?.id).toBe(sepolia.id);
    }),
  );
});
