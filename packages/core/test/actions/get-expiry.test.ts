import { Effect } from "effect";

import { sepoliaV2Deployment } from "@ensforge/contracts/deployments";
import type { Address, PublicClient } from "viem";
import { zeroAddress } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { describe, expect, it, vi } from "vitest";

import { createConfig, getExpiry, getOwner, getResolver, readBatch } from "../../src/index.js";

const owner = "0x0000000000000000000000000000000000000011";
const resolver = "0x0000000000000000000000000000000000000022";
const parentRegistry = "0x0000000000000000000000000000000000000033";
const node = `0x${"11".repeat(32)}` as const;

interface ContractCall {
  readonly address: Address;
  readonly functionName: string;
}

type MulticallOutcome =
  | { readonly status: "success"; readonly result: unknown }
  | { readonly status: "failure"; readonly error: Error };

const makePublicClient = (
  network: "mainnet" | "sepolia",
  resolve: (call: ContractCall) => unknown,
) => {
  const getBlock = vi.fn().mockResolvedValue({ number: 999n });
  const multicall = vi.fn(
    async ({
      contracts,
    }: {
      readonly contracts: readonly ContractCall[];
    }): Promise<readonly MulticallOutcome[]> =>
      contracts.map((contract) => ({ status: "success", result: resolve(contract) })),
  );

  return {
    client: {
      chain: network === "mainnet" ? mainnet : sepolia,
      getBlock,
      multicall,
    } as unknown as PublicClient,
    getBlock,
    multicall,
  };
};

describe("getExpiry", () => {
  it("reads V1 .eth registration expiry and grace period", async () => {
    const publicClient = makePublicClient("mainnet", (call) => {
      if (call.functionName === "nameExpires") return 1_000n;
      if (call.functionName === "GRACE_PERIOD") return 100n;
      throw new Error(`Unexpected contract read: ${call.functionName}`);
    });
    const config = createConfig({ network: "mainnet", publicClient: publicClient.client });

    await expect(getExpiry(config, { name: "example.eth" })).resolves.toEqual({
      name: "example.eth",
      expiry: 1_000n,
      gracePeriod: 100n,
      gracePeriodEnd: 1_100n,
      protocol: "v1",
      source: "baseRegistrar",
    });

    expect(publicClient.getBlock).toHaveBeenCalledOnce();
    expect(publicClient.multicall).toHaveBeenCalledOnce();
    expect(publicClient.multicall.mock.calls[0]?.[0].contracts).toHaveLength(2);
  });

  it("reads V1 wrapped-name expiry without registrar grace", async () => {
    const publicClient = makePublicClient("mainnet", (call) => {
      if (call.functionName === "getData") return [owner, 0, 1_200n];
      throw new Error(`Unexpected contract read: ${call.functionName}`);
    });
    const config = createConfig({ network: "mainnet", publicClient: publicClient.client });

    await expect(
      getExpiry(config, { name: "sub.example.eth", blockNumber: 999n }),
    ).resolves.toEqual({
      name: "sub.example.eth",
      expiry: 1_200n,
      gracePeriod: 0n,
      gracePeriodEnd: 1_200n,
      protocol: "v1",
      source: "nameWrapper",
    });
  });

  it("uses V2 registry expiry for a migrated .eth registration", async () => {
    const publicClient = makePublicClient("sepolia", (call) => {
      switch (call.functionName) {
        case "getState":
          return { status: 2, expiry: 2_000n, latestOwner: owner, tokenId: 1n, resource: 2n };
        case "nameExpires":
          return 1_000n;
        case "GRACE_PERIOD":
          return call.address === sepoliaV2Deployment.contracts.ethRegistrar ? 200n : 300n;
        default:
          throw new Error(`Unexpected contract read: ${call.functionName}`);
      }
    });
    const config = createConfig({ network: "sepolia", publicClient: publicClient.client });

    await expect(
      Effect.runPromise(getExpiry.effect(config, { name: "migrated.eth", blockNumber: 999n })),
    ).resolves.toEqual({
      name: "migrated.eth",
      expiry: 2_000n,
      gracePeriod: 200n,
      gracePeriodEnd: 2_200n,
      protocol: "v2",
      source: "registry",
    });
  });

  it("preserves V1 expiry semantics for an unmigrated reserved name", async () => {
    const publicClient = makePublicClient("sepolia", (call) => {
      switch (call.functionName) {
        case "getState":
          return { status: 1, expiry: 1_300n, latestOwner: zeroAddress, tokenId: 1n, resource: 2n };
        case "nameExpires":
          return 1_000n;
        case "GRACE_PERIOD":
          return call.address === sepoliaV2Deployment.migration.ethRenewerV1 ? 400n : 200n;
        default:
          throw new Error(`Unexpected contract read: ${call.functionName}`);
      }
    });
    const config = createConfig({ network: "sepolia", publicClient: publicClient.client });

    await expect(getExpiry(config, { name: "reserved.eth" })).resolves.toEqual({
      name: "reserved.eth",
      expiry: 1_000n,
      gracePeriod: 400n,
      gracePeriodEnd: 1_400n,
      protocol: "v1",
      source: "baseRegistrar",
    });
  });

  it("ignores failed speculative V1 reads for a migrated name", async () => {
    const resolve = (call: ContractCall): unknown => {
      switch (call.functionName) {
        case "getState":
          return { status: 2, expiry: 2_000n, latestOwner: owner, tokenId: 1n, resource: 2n };
        case "GRACE_PERIOD":
          return 200n;
        default:
          throw new Error(`Unexpected contract read: ${call.functionName}`);
      }
    };
    const publicClient = makePublicClient("sepolia", resolve);
    publicClient.multicall.mockImplementationOnce(
      async ({ contracts }: { readonly contracts: readonly ContractCall[] }) =>
        contracts.map((contract): MulticallOutcome =>
          contract.functionName === "nameExpires"
            ? { status: "failure", error: new Error("irrelevant V1 failure") }
            : { status: "success", result: resolve(contract) },
        ),
    );
    const config = createConfig({ network: "sepolia", publicClient: publicClient.client });

    const result = await getExpiry(config, { name: "migrated.eth", blockNumber: 999n });

    expect(result?.protocol).toBe("v2");
    expect(result?.expiry).toBe(2_000n);
  });

  it("discovers a V2 subname parent registry before reading its expiry", async () => {
    const publicClient = makePublicClient("sepolia", (call) => {
      if (call.functionName === "findParentRegistry") return parentRegistry;
      if (call.functionName === "findResolver") return [resolver, node, 0n];
      if (call.functionName === "getData") return [zeroAddress, 0, 900n];
      if (call.functionName === "findExpiry") return 1_500n;
      throw new Error(`Unexpected contract read: ${call.functionName}`);
    });
    const config = createConfig({ network: "sepolia", publicClient: publicClient.client });

    await expect(getExpiry(config, { name: "sub.example.eth" })).resolves.toEqual({
      name: "sub.example.eth",
      expiry: 1_500n,
      gracePeriod: 0n,
      gracePeriodEnd: 1_500n,
      protocol: "v2",
      source: "registry",
    });

    expect(publicClient.getBlock).toHaveBeenCalledOnce();
    expect(publicClient.multicall).toHaveBeenCalledTimes(2);
    expect(publicClient.multicall.mock.calls[0]?.[0].contracts).toHaveLength(3);
    expect(publicClient.multicall.mock.calls[1]?.[0].contracts).toEqual([
      expect.objectContaining({ address: parentRegistry, functionName: "findExpiry" }),
    ]);
  });

  it("falls back to V1 wrapped expiry for a mirrored child", async () => {
    const publicClient = makePublicClient("sepolia", (call) => {
      if (call.functionName === "findParentRegistry") return parentRegistry;
      if (call.functionName === "findResolver") {
        return [sepoliaV2Deployment.migration.ensV1Resolver, node, 0n];
      }
      if (call.functionName === "getData") return [owner, 0, 900n];
      throw new Error(`Unexpected contract read: ${call.functionName}`);
    });
    const config = createConfig({ network: "sepolia", publicClient: publicClient.client });

    await expect(
      getExpiry(config, { name: "sub.reserved.eth", blockNumber: 999n }),
    ).resolves.toEqual({
      name: "sub.reserved.eth",
      expiry: 900n,
      gracePeriod: 0n,
      gracePeriodEnd: 900n,
      protocol: "v1",
      source: "nameWrapper",
    });
  });

  it("returns null when no expiry is stored", async () => {
    const publicClient = makePublicClient("mainnet", () => [zeroAddress, 0, 0n]);
    const config = createConfig({ network: "mainnet", publicClient: publicClient.client });

    await expect(
      getExpiry(config, { name: "unregistered.example", blockNumber: 999n }),
    ).resolves.toBeNull();
  });

  it("batches owner, resolver, and expiry reads together", async () => {
    const publicClient = makePublicClient("sepolia", (call) => {
      switch (call.functionName) {
        case "findOwner":
          return owner;
        case "findResolver":
          return [resolver, node, 0n];
        case "getState":
          return { status: 2, expiry: 2_000n, latestOwner: owner, tokenId: 1n, resource: 2n };
        case "isRenewable":
          return true;
        case "nameExpires":
          return 1_000n;
        case "GRACE_PERIOD":
          return 200n;
        case "owner":
        case "ownerOf":
          return zeroAddress;
        default:
          throw new Error(`Unexpected contract read: ${call.functionName}`);
      }
    });
    const config = createConfig({ network: "sepolia", publicClient: publicClient.client });

    const result = await readBatch(config, {
      owner: getOwner.request({ name: "example.eth" }),
      resolver: getResolver.request({ name: "example.eth" }),
      expiry: getExpiry.request({ name: "example.eth" }),
    });

    expect(result.owner?.owner).toBe(owner);
    expect(result.resolver).toBe(resolver);
    expect(result.expiry?.expiry).toBe(2_000n);
    expect(publicClient.getBlock).toHaveBeenCalledOnce();
    expect(publicClient.multicall).toHaveBeenCalledOnce();
    expect(publicClient.multicall.mock.calls[0]?.[0].contracts).toHaveLength(10);
  });
});
