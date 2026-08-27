import {
  mainnetV1Deployment,
  sepoliaV1Deployment,
  sepoliaV2Deployment,
} from "@ensforge/contracts/deployments";
import { describe, expect, it, vi } from "vitest";

import {
  ClientChainUnavailableError,
  createConfig,
  NetworkClientMismatchError,
  UnsupportedEnsNetworkError,
} from "../src/index.js";
import {
  makeChainlessPublicClient,
  makeMainnetPublicClient,
  makeMainnetWalletClient,
  makeSepoliaPublicClient,
  makeSepoliaWalletClient,
} from "./client-fixtures.js";

describe("createConfig", () => {
  it("selects the mainnet V1 profile", () => {
    const publicClient = makeMainnetPublicClient();
    const config = createConfig({ network: "mainnet", publicClient });

    expect(config.network).toBe("mainnet");
    expect(config.chainId).toBe(1);
    expect(config.publicClient).toBe(publicClient);
    expect(config.walletClient).toBeUndefined();
    expect(config.deployments.active).toBe(mainnetV1Deployment);
    expect(config.deployments.compatibility).toEqual([]);
  });

  it("selects the Sepolia V2 profile with V1 compatibility", () => {
    const publicClient = makeSepoliaPublicClient();
    const walletClient = makeSepoliaWalletClient();
    const config = createConfig({ network: "sepolia", publicClient, walletClient });

    expect(config.network).toBe("sepolia");
    expect(config.chainId).toBe(11155111);
    expect(config.publicClient).toBe(publicClient);
    expect(config.walletClient).toBe(walletClient);
    expect(config.deployments.active).toBe(sepoliaV2Deployment);
    expect(config.deployments.compatibility).toEqual([sepoliaV1Deployment]);
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
    expect(Object.isFrozen(config.deployments.compatibility)).toBe(true);
  });

  it("rejects a public client for another network", () => {
    expect(() =>
      createConfig({ network: "mainnet", publicClient: makeSepoliaPublicClient() }),
    ).toThrow(NetworkClientMismatchError);
  });

  it("rejects a wallet client for another network", () => {
    expect(() =>
      createConfig({
        network: "mainnet",
        publicClient: makeMainnetPublicClient(),
        walletClient: makeSepoliaWalletClient(),
      }),
    ).toThrow(NetworkClientMismatchError);

    expect(() =>
      createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
        walletClient: makeMainnetWalletClient(),
      }),
    ).toThrow(NetworkClientMismatchError);
  });

  it("rejects a chainless public client", () => {
    expect(() =>
      createConfig({ network: "mainnet", publicClient: makeChainlessPublicClient() }),
    ).toThrow(ClientChainUnavailableError);
  });

  it("rejects an unsupported network at the runtime boundary", () => {
    expect(() =>
      createConfig({
        network: "holesky" as "mainnet",
        publicClient: makeMainnetPublicClient(),
      }),
    ).toThrow(UnsupportedEnsNetworkError);
  });
});
