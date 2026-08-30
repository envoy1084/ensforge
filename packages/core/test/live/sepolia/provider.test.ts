import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { sepoliaV1Deployment, sepoliaV2Deployment } from "@ensforge/contracts/deployments";
import { isAddress, type Address } from "viem";

import { sepoliaPublicClient } from "../setup/sepolia.js";

const deployedAddresses = (value: unknown, path = "deployment"): Array<[string, Address]> => {
  if (typeof value === "string" && isAddress(value)) return [[path, value]];
  if (value === null || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([key, child]) =>
    deployedAddresses(child, `${path}.${key}`),
  );
};

describe("Sepolia provider and deployments", () => {
  it.effect("connects to a current Sepolia head", () =>
    Effect.gen(function* () {
      const [chainId, block] = yield* Effect.all(
        [
          Effect.tryPromise(() => sepoliaPublicClient.getChainId()),
          Effect.tryPromise(() => sepoliaPublicClient.getBlock({ blockTag: "latest" })),
        ] as const,
        { concurrency: 2 },
      );

      const age = BigInt(Math.floor(Date.now() / 1_000)) - block.timestamp;
      assert.strictEqual(chainId, 11_155_111);
      assert.isTrue(block.number > 0n);
      assert.isTrue(age >= -60n && age <= 600n, `Latest block is ${age} seconds old`);
    }),
  );

  it.effect("finds bytecode at every configured V1 and V2 contract address", () =>
    Effect.gen(function* () {
      const unique = new Map<string, string>();
      for (const [path, address] of [
        ...deployedAddresses(sepoliaV1Deployment, "v1"),
        ...deployedAddresses(sepoliaV2Deployment, "v2"),
      ]) {
        unique.set(address.toLowerCase(), path);
      }

      const deployed = yield* Effect.forEach(
        unique,
        ([address, path]) =>
          Effect.tryPromise(() =>
            sepoliaPublicClient.getCode({ address: address as Address }),
          ).pipe(Effect.map((code) => ({ path, address, code }))),
        { concurrency: 3 },
      );

      for (const { path, address, code } of deployed) {
        assert.isDefined(code, `${path} (${address}) has no deployed bytecode`);
        assert.notStrictEqual(code, "0x", `${path} (${address}) has empty bytecode`);
      }
    }),
  );
});
