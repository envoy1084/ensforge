import { Effect } from "effect";

import { mainnetV1Deployment } from "@ensforge/contracts/deployments";
import type { Address, PublicClient, WalletClient } from "viem";
import { mainnet } from "viem/chains";
import { bench, describe } from "vitest";

import { defineReadAction, defineWriteAction, prepareCalls, readBatch } from "../src/index.js";
import { createTestConfig, ensTestChainId } from "../src/testing/index.js";

const account = "0x0000000000000000000000000000000000000001" as const;
const target = "0x0000000000000000000000000000000000000002" as const;
const chain = { ...mainnet, id: ensTestChainId };
const publicClient = {
  chain,
  getBlock: async () => ({ number: 1n, timestamp: 1n }),
  multicall: async () => [],
} as unknown as PublicClient;
const walletClient = { chain, account: { address: account } } as unknown as WalletClient;
const config = createTestConfig({
  deployments: {
    protocol: "v1",
    v1: { ...mainnetV1Deployment, id: "bench-v1", chainId: ensTestChainId },
  },
  publicClient,
  walletClient,
});
const read = defineReadAction((_config, value: number) => Effect.succeed(value));
const write = defineWriteAction(
  "benchWrite",
  (_config, parameters: { readonly to: Address }) => Effect.succeed(parameters.to),
  (_config, parameters, context) =>
    Effect.succeed({ to: parameters.to, value: 0n, account: context.account }),
);

for (const size of [10, 100, 1_000]) {
  describe(`${size} calls`, () => {
    bench("readBatch orchestration", async () => {
      const requests = Object.fromEntries(
        Array.from({ length: size }, (_, index) => [`call-${index}`, read.request(index)]),
      );
      await readBatch(config, requests, { blockNumber: 1n });
    });

    bench("write-intent preparation", async () => {
      await prepareCalls(config, {
        calls: Array.from({ length: size }, () => write.call({ to: target })),
      });
    });
  });
}
