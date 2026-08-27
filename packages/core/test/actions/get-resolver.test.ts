import { Effect } from "effect";

import { mainnetV1Deployment, sepoliaV2Deployment } from "@ensforge/contracts/deployments";
import type { Address, PublicClient } from "viem";
import { zeroAddress } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { describe, expect, it, vi } from "vitest";

import { createConfig, getOwner, getResolver, readBatch } from "../../src/index.js";

const owner = "0x0000000000000000000000000000000000000011";
const resolver = "0x0000000000000000000000000000000000000022";
const node = `0x${"11".repeat(32)}` as const;

interface ContractCall {
  readonly address: Address;
  readonly functionName: string;
}

const makePublicClient = (
  network: "mainnet" | "sepolia",
  resolve: (call: ContractCall) => unknown,
) => {
  const getBlock = vi.fn().mockResolvedValue({ number: 999n });
  const multicall = vi.fn(async ({ contracts }: { readonly contracts: readonly ContractCall[] }) =>
    contracts.map((contract) => ({ status: "success" as const, result: resolve(contract) })),
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

describe("getResolver", () => {
  it("discovers a resolver through the V1 Universal Resolver", async () => {
    const publicClient = makePublicClient("mainnet", () => [resolver, node, 0n]);
    const config = createConfig({ network: "mainnet", publicClient: publicClient.client });

    await expect(getResolver(config, { name: "example.eth" })).resolves.toBe(resolver);

    expect(publicClient.getBlock).toHaveBeenCalledOnce();
    expect(publicClient.multicall).toHaveBeenCalledOnce();
    expect(publicClient.multicall.mock.calls[0]?.[0].contracts).toEqual([
      expect.objectContaining({
        address: mainnetV1Deployment.contracts.universalResolver,
        functionName: "findResolver",
      }),
    ]);
  });

  it("discovers inherited and mirrored resolvers through the V2 Universal Resolver", async () => {
    const publicClient = makePublicClient("sepolia", () => [resolver, node, 12n]);
    const config = createConfig({ network: "sepolia", publicClient: publicClient.client });

    await expect(
      Effect.runPromise(getResolver.effect(config, { name: "sub.example.eth", blockNumber: 999n })),
    ).resolves.toBe(resolver);

    expect(publicClient.getBlock).not.toHaveBeenCalled();
    expect(publicClient.multicall.mock.calls[0]?.[0].contracts).toEqual([
      expect.objectContaining({
        address: sepoliaV2Deployment.contracts.universalResolver,
        functionName: "findResolver",
      }),
    ]);
  });

  it("returns null when no resolver is configured", async () => {
    const publicClient = makePublicClient("mainnet", () => [zeroAddress, node, 0n]);
    const config = createConfig({ network: "mainnet", publicClient: publicClient.client });

    await expect(
      getResolver(config, { name: "unconfigured.eth", blockNumber: 999n }),
    ).resolves.toBeNull();
  });

  it("batches resolver discovery with other semantic read actions", async () => {
    const publicClient = makePublicClient("sepolia", (call) => {
      switch (call.functionName) {
        case "findResolver":
          return [resolver, node, 0n];
        case "findOwner":
          return owner;
        case "getState":
          return { status: 1, expiry: 0n, latestOwner: zeroAddress, tokenId: 0n, resource: 0n };
        case "isRenewable":
          return true;
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
    });

    expect(result.owner?.owner).toBe(owner);
    expect(result.resolver).toBe(resolver);
    expect(publicClient.getBlock).toHaveBeenCalledOnce();
    expect(publicClient.multicall).toHaveBeenCalledOnce();
    expect(publicClient.multicall.mock.calls[0]?.[0].contracts).toHaveLength(7);
  });
});
