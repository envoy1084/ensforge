import { mainnetV1Deployment, type EnsV1Deployment } from "@ensforge/contracts/deployments";
import { createPublicClient, createWalletClient, custom, defineChain, zeroAddress } from "viem";
import { describe, expect, it } from "vitest";

import { createTestConfig, ensTestChainId } from "../../../src/testing/index.js";

const devnetChain = defineChain({
  id: ensTestChainId,
  name: "ensforge devnet",
  nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
  rpcUrls: { default: { http: ["http://127.0.0.1:8545"] } },
});
const transport = custom({ request: async () => null });
const deployment = {
  ...mainnetV1Deployment,
  id: "devnet-v1",
  chainId: ensTestChainId,
} satisfies EnsV1Deployment;

describe("createTestConfig", () => {
  it("creates an isolated devnet config without widening the public factory", () => {
    const publicClient = createPublicClient({ chain: devnetChain, transport });
    const walletClient = createWalletClient({
      account: zeroAddress,
      chain: devnetChain,
      transport,
    });
    const config = createTestConfig({
      deployments: { protocol: "v1", v1: deployment },
      publicClient,
      walletClient,
    });

    expect(config).toMatchObject({
      network: "devnet",
      chainId: ensTestChainId,
      publicClient,
      walletClient,
    });
    expect(config.deployments).toEqual({ protocol: "v1", v1: deployment });
    expect(Object.isFrozen(config)).toBe(true);
  });
});
