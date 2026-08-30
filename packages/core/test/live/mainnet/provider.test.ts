import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { mainnetV1Deployment } from "@ensforge/contracts/deployments";
import type { Address } from "viem";

import { mainnetPublicClient } from "../setup/mainnet.js";

describe("Mainnet provider and deployments", () => {
  it.effect("connects to a current Ethereum Mainnet head", () =>
    Effect.gen(function* () {
      const [chainId, block] = yield* Effect.all(
        [
          Effect.tryPromise(() => mainnetPublicClient.getChainId()),
          Effect.tryPromise(() => mainnetPublicClient.getBlock({ blockTag: "latest" })),
        ] as const,
        { concurrency: 2 },
      );

      const now = BigInt(Math.floor(Date.now() / 1_000));
      const age = now - block.timestamp;
      assert.strictEqual(chainId, 1);
      assert.isTrue(block.number > 0n);
      assert.isTrue(age >= -60n && age <= 600n, `Latest block is ${age} seconds old`);
    }),
  );

  it.effect("finds bytecode at every active ENS contract address", () =>
    Effect.gen(function* () {
      const contracts = Object.entries(mainnetV1Deployment.contracts) as ReadonlyArray<
        readonly [string, Address]
      >;
      const deployed = yield* Effect.forEach(
        contracts,
        ([name, address]) =>
          Effect.tryPromise(() => mainnetPublicClient.getCode({ address })).pipe(
            Effect.map((code) => ({ name, address, code })),
          ),
        { concurrency: 2 },
      );

      for (const { name, address, code } of deployed) {
        assert.isDefined(code, `${name} (${address}) has no deployed bytecode`);
        assert.notStrictEqual(code, "0x", `${name} (${address}) has empty bytecode`);
      }
    }),
  );
});
