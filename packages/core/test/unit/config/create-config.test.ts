import {
  mainnetV1Deployment,
  sepoliaV1Deployment,
  sepoliaV2Deployment,
} from "@ensforge/contracts/deployments";
import { describe, expect, it, vi } from "vitest";

import {
  createConfig,
  ConfigError,
  type ConfigErrorCode,
  type CreateConfigParameters,
} from "../../../src/index.js";
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
    expect(config.reads).toEqual({ concurrency: 8, multicallBatchSize: 1024 });
    expect(config.writes).toEqual({
      simulation: "required",
      confirmation: { type: "confirmed" },
      statusRetries: 0,
    });
    expect(config.gateways).toEqual({
      allowedHosts: null,
      deniedHosts: [],
      timeout: 10_000,
      maxResponseSize: 1_048_576,
      maxRedirects: 3,
    });
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
    expect(Object.isFrozen(config.reads)).toBe(true);
    expect(Object.isFrozen(config.writes)).toBe(true);
    expect(Object.isFrozen(config.writes.confirmation)).toBe(true);
    expect(Object.isFrozen(config.gateways)).toBe(true);
  });

  it("accepts custom gateway policies", () => {
    const config = createConfig({
      network: "mainnet",
      publicClient: makeMainnetPublicClient(),
      gateways: {
        allowedHosts: ["gateway.example"],
        deniedHosts: ["blocked.example"],
        timeout: 5_000,
        maxResponseSize: 2_048,
        maxRedirects: 1,
      },
    });

    expect(config.gateways).toEqual({
      allowedHosts: ["gateway.example"],
      deniedHosts: ["blocked.example"],
      timeout: 5_000,
      maxResponseSize: 2_048,
      maxRedirects: 1,
    });
  });

  it("rejects invalid gateway policies", () => {
    expectConfigError(
      () =>
        createConfig({
          network: "mainnet",
          publicClient: makeMainnetPublicClient(),
          gateways: { timeout: 0 },
        }),
      "INVALID_GATEWAY_OPTIONS",
    );
  });

  it("accepts custom write policies", () => {
    const config = createConfig({
      network: "mainnet",
      publicClient: makeMainnetPublicClient(),
      writes: {
        simulation: "skip",
        confirmation: { type: "confirmed", confirmations: 2, timeout: 30_000 },
        statusRetries: 2,
      },
    });

    expect(config.writes).toEqual({
      simulation: "skip",
      confirmation: { type: "confirmed", confirmations: 2, timeout: 30_000 },
      statusRetries: 2,
    });
  });

  it.each([
    { simulation: "sometimes" },
    { confirmation: { type: "confirmed", confirmations: 0 } },
    { statusRetries: -1 },
    { statusRetries: 1.5 },
  ])("rejects invalid write policies: %o", (writes) => {
    expectConfigError(
      () =>
        createConfig({
          network: "mainnet",
          publicClient: makeMainnetPublicClient(),
          writes: writes as never,
        }),
      "INVALID_WRITE_OPTIONS",
    );
  });

  it("accepts custom read limits", () => {
    const config = createConfig({
      network: "mainnet",
      publicClient: makeMainnetPublicClient(),
      reads: { concurrency: 3, multicallBatchSize: 4096 },
    });

    expect(config.reads).toEqual({ concurrency: 3, multicallBatchSize: 4096 });
  });

  it.each([
    { concurrency: 0 },
    { concurrency: 1.5 },
    { multicallBatchSize: -1 },
    { multicallBatchSize: 0.5 },
  ])("rejects invalid read limits: %o", (reads) => {
    expectConfigError(
      () =>
        createConfig({
          network: "mainnet",
          publicClient: makeMainnetPublicClient(),
          reads,
        }),
      "INVALID_READ_OPTIONS",
    );
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

  it("requires exactly one client source at the runtime boundary", () => {
    expectConfigError(
      () => createConfig({ network: "mainnet" } as CreateConfigParameters),
      "INVALID_CLIENT_CONFIGURATION",
    );

    expectConfigError(
      () =>
        createConfig({
          network: "mainnet",
          publicClient: makeMainnetPublicClient(),
          wagmiConfig: {},
        } as unknown as CreateConfigParameters),
      "INVALID_CLIENT_CONFIGURATION",
    );
  });
});
