import { createPublicClient, defineChain, http } from "viem";
import { inject } from "vitest";

import type { EnsforgeConfig } from "../../../src/index.js";
import { createTestConfig } from "../../../src/testing/index.js";
import type { IntegrationDevnetContext } from "./context.js";

export interface IntegrationDevnet extends IntegrationDevnetContext {
  readonly configs: {
    readonly v1: EnsforgeConfig;
    readonly v2: EnsforgeConfig;
  };
}

export const getIntegrationDevnet = (): IntegrationDevnet => {
  const context = inject("ensDevnet");
  const chain = defineChain({
    id: 31_337,
    name: "Ensforge integration devnet",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
    rpcUrls: { default: { http: [context.rpcUrl] } },
    contracts: {
      multicall3: {
        address: context.deployments.multicall3,
        blockCreated: 0,
      },
    },
  });
  const publicClient = createPublicClient({
    chain,
    transport: http(context.rpcUrl, { retryCount: 0, timeout: 10_000 }),
  });

  return {
    ...context,
    configs: {
      v1: createTestConfig({
        deployments: Object.freeze({ protocol: "v1", v1: context.deployments.v1 }),
        publicClient,
      }),
      v2: createTestConfig({
        deployments: Object.freeze({
          protocol: "v2",
          v1: context.deployments.v1,
          v2: context.deployments.v2,
        }),
        publicClient,
      }),
    },
  };
};
