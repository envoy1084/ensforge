import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { sepoliaV1Deployment, sepoliaV2Deployment } from "@ensforge/contracts/deployments";
import {
  registryInterfaceIds,
  resolverInterfaceIds,
  upgradableUniversalResolverProxyV2Abi,
} from "@ensforge/contracts/v2";
import { getAddress, isAddress, parseAbi, type Address } from "viem";

import { sepoliaPublicClient } from "../setup/sepolia.js";

const deployedAddresses = (value: unknown, path = "deployment"): Array<[string, Address]> => {
  if (typeof value === "string" && isAddress(value)) return [[path, value]];
  if (value === null || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([key, child]) =>
    deployedAddresses(child, `${path}.${key}`),
  );
};

const supportsInterfaceAbi = parseAbi([
  "function supportsInterface(bytes4 interfaceId) view returns (bool)",
]);

const eip1967ImplementationSlot =
  "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc" as const;

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

  it.effect("resolves the configured proxy implementation chain", () =>
    Effect.gen(function* () {
      const deployment = sepoliaV2Deployment;
      const [publicImplementation, managedImplementation, contractNamerStorage] = yield* Effect.all(
        [
          Effect.tryPromise(() =>
            sepoliaPublicClient.readContract({
              address: deployment.contracts.universalResolver,
              abi: upgradableUniversalResolverProxyV2Abi,
              functionName: "implementation",
            }),
          ),
          Effect.tryPromise(() =>
            sepoliaPublicClient.readContract({
              address: deployment.infrastructure.managedUniversalResolverProxy,
              abi: upgradableUniversalResolverProxyV2Abi,
              functionName: "implementation",
            }),
          ),
          Effect.tryPromise(() =>
            sepoliaPublicClient.getStorageAt({
              address: deployment.contracts.contractNamer,
              slot: eip1967ImplementationSlot,
            }),
          ),
        ] as const,
        { concurrency: 3 },
      );

      assert.strictEqual(
        publicImplementation,
        deployment.infrastructure.managedUniversalResolverProxy,
      );
      assert.strictEqual(managedImplementation, deployment.implementations.universalResolver);
      assert.isDefined(contractNamerStorage);
      assert.strictEqual(
        getAddress(`0x${contractNamerStorage.slice(-40)}`),
        deployment.implementations.contractNamer,
      );
    }),
  );

  it.effect("recognizes the deployed registry and resolver interfaces", () =>
    Effect.gen(function* () {
      const deployment = sepoliaV2Deployment;
      const checks = [
        [
          deployment.contracts.rootRegistry,
          registryInterfaceIds.permissionedRegistry,
          "root Permissioned Registry",
        ],
        [
          deployment.contracts.ethRegistry,
          registryInterfaceIds.permissionedRegistry,
          "ETH Permissioned Registry",
        ],
        [
          deployment.implementations.wrapperRegistry,
          registryInterfaceIds.wrapperRegistry,
          "Wrapper Registry implementation",
        ],
        [
          deployment.implementations.permissionedResolver,
          resolverInterfaceIds.permissionedResolver,
          "Permissioned Resolver implementation",
        ],
      ] as const;
      const supported = yield* Effect.forEach(
        checks,
        ([address, interfaceId, description]) =>
          Effect.tryPromise(() =>
            sepoliaPublicClient.readContract({
              address,
              abi: supportsInterfaceAbi,
              functionName: "supportsInterface",
              args: [interfaceId],
            }),
          ).pipe(Effect.map((result) => ({ description, result }))),
        { concurrency: 4 },
      );

      for (const { description, result } of supported) {
        assert.isTrue(result, `${description} does not support its configured interface ID`);
      }
    }),
  );
});
