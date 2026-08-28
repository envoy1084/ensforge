import {
  mainnetV1Deployment,
  sepoliaV1Deployment,
  sepoliaV2Deployment,
} from "@ensforge/contracts/deployments";
import { describe, expect, it, vi } from "vitest";

import { createConfig, ConfigError, type ConfigErrorCode } from "../../../src/index.js";
import {
  makeChainlessPublicClient,
  makeMainnetPublicClient,
  makeMainnetWalletClient,
  makeSepoliaPublicClient,
  makeSepoliaWalletClient,
} from "../fixtures/client-fixtures.js";

const expectConfigError = (operation: () => unknown, code: ConfigErrorCode) => {
  try {
    operation();
    throw new Error("Expected config creation to fail");
  } catch (error) {
    expect(error).toBeInstanceOf(ConfigError);
    if (!(error instanceof ConfigError)) throw error;
    expect(error.code).toBe(code);
    expect(error.message.length).toBeGreaterThan(0);
  }
};

describe("createConfig", () => {
  it("selects the mainnet V1 profile", () => {
    const publicClient = makeMainnetPublicClient();
    const config = createConfig({ network: "mainnet", publicClient });

    expect(config.network).toBe("mainnet");
    expect(config.chainId).toBe(1);
    expect(config.publicClient).toBe(publicClient);
    expect(config.walletClient).toBeUndefined();
    expect(config.deployments.protocol).toBe("v1");
    expect(config.deployments.v1).toBe(mainnetV1Deployment);
    expect(config.deployments.v2).toBeUndefined();
  });

  it("selects the Sepolia V2 profile with V1 compatibility", () => {
    const publicClient = makeSepoliaPublicClient();
    const walletClient = makeSepoliaWalletClient();
    const config = createConfig({ network: "sepolia", publicClient, walletClient });

    expect(config.network).toBe("sepolia");
    expect(config.chainId).toBe(11155111);
    expect(config.publicClient).toBe(publicClient);
    expect(config.walletClient).toBe(walletClient);
    expect(config.deployments.protocol).toBe("v2");
    expect(config.deployments.v1).toBe(sepoliaV1Deployment);
    expect(config.deployments.v2).toBe(sepoliaV2Deployment);
  });

  it("does not contact the public client", () => {
    const request = vi.fn();
    const publicClient = makeMainnetPublicClient(request);

    createConfig({ network: "mainnet", publicClient });

    expect(request).not.toHaveBeenCalled();
  });

  it("returns immutable config-owned wrappers", () => {
    const config = createConfig({
      network: "sepolia",
      publicClient: makeSepoliaPublicClient(),
    });

    expect(Object.isFrozen(config)).toBe(true);
    expect(Object.isFrozen(config.deployments)).toBe(true);
  });

  it("rejects a public client for another network", () => {
    expectConfigError(
      () => createConfig({ network: "mainnet", publicClient: makeSepoliaPublicClient() }),
      "NETWORK_CLIENT_MISMATCH",
    );
  });

  it("rejects a wallet client for another network", () => {
    expectConfigError(
      () =>
        createConfig({
          network: "mainnet",
          publicClient: makeMainnetPublicClient(),
          walletClient: makeSepoliaWalletClient(),
        }),
      "NETWORK_CLIENT_MISMATCH",
    );

    expectConfigError(
      () =>
        createConfig({
          network: "sepolia",
          publicClient: makeSepoliaPublicClient(),
          walletClient: makeMainnetWalletClient(),
        }),
      "NETWORK_CLIENT_MISMATCH",
    );
  });

  it("rejects a chainless public client", () => {
    expectConfigError(
      () => createConfig({ network: "mainnet", publicClient: makeChainlessPublicClient() }),
      "CLIENT_CHAIN_UNAVAILABLE",
    );
  });

  it("rejects an unsupported network at the runtime boundary", () => {
    expectConfigError(
      () =>
        createConfig({
          network: "holesky" as "mainnet",
          publicClient: makeMainnetPublicClient(),
        }),
      "UNSUPPORTED_NETWORK",
    );
  });
});
