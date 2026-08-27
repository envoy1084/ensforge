import { Effect } from "effect";

import { mainnetV1Deployment, sepoliaV1Deployment } from "@ensforge/contracts/deployments";
import type { Address, PublicClient } from "viem";
import { zeroAddress } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { describe, expect, it, vi } from "vitest";

import { createConfig, getOwner, readBatch } from "../../src/index.js";

const owner = "0x0000000000000000000000000000000000000011";
const registrant = "0x0000000000000000000000000000000000000022";

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
  const chain = network === "mainnet" ? mainnet : sepolia;

  return {
    client: { chain, getBlock, multicall } as unknown as PublicClient,
    getBlock,
    multicall,
  };
};

const resolveV2Owner = (call: ContractCall): unknown => {
  switch (call.functionName) {
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
};

describe("getOwner read execution", () => {
  it("creates one snapshot and one primitive batch for an individual action", async () => {
    const publicClient = makePublicClient("sepolia", resolveV2Owner);
    const config = createConfig({ network: "sepolia", publicClient: publicClient.client });

    const result = await getOwner(config, { name: "example.eth" });

    expect(result).toEqual({
      name: "example.eth",
      owner,
      registrant: null,
      protocol: "v2",
      ownershipLevel: "registry",
    });
    expect(publicClient.getBlock).toHaveBeenCalledOnce();
    expect(publicClient.multicall).toHaveBeenCalledOnce();
    expect(publicClient.multicall).toHaveBeenCalledWith(
      expect.objectContaining({ blockNumber: 999n, contracts: expect.any(Array) }),
    );
    expect(publicClient.multicall.mock.calls[0]?.[0].contracts).toHaveLength(6);
  });

  it("collects multiple semantic owner requests into the batch context", async () => {
    const publicClient = makePublicClient("sepolia", resolveV2Owner);
    const config = createConfig({ network: "sepolia", publicClient: publicClient.client });

    const result = await readBatch(config, {
      first: getOwner.request({ name: "first.eth" }),
      second: getOwner.request({ name: "second.eth" }),
    });

    expect(result.first?.owner).toBe(owner);
    expect(result.second?.owner).toBe(owner);
    expect(publicClient.getBlock).toHaveBeenCalledOnce();
    expect(publicClient.multicall).toHaveBeenCalledOnce();
    expect(publicClient.multicall.mock.calls[0]?.[0].contracts).toHaveLength(12);
  });

  it("automatically collects concurrent Effect actions on the same block", async () => {
    const publicClient = makePublicClient("sepolia", resolveV2Owner);
    const config = createConfig({ network: "sepolia", publicClient: publicClient.client });

    const result = await Effect.runPromise(
      Effect.all(
        [
          getOwner.effect(config, { name: "first.eth", blockNumber: 999n }),
          getOwner.effect(config, { name: "second.eth", blockNumber: 999n }),
        ],
        { concurrency: "unbounded" },
      ),
    );

    expect(result[0]?.owner).toBe(owner);
    expect(result[1]?.owner).toBe(owner);
    expect(publicClient.multicall).toHaveBeenCalledOnce();
    expect(publicClient.multicall.mock.calls[0]?.[0].contracts).toHaveLength(12);
  });

  it("preserves the V1 owner route through primitive reads", async () => {
    const publicClient = makePublicClient("mainnet", (call) => {
      if (call.functionName === "owner") return owner;
      if (call.address === mainnetV1Deployment.contracts.baseRegistrar) return registrant;
      return zeroAddress;
    });
    const config = createConfig({ network: "mainnet", publicClient: publicClient.client });

    const result = await Effect.runPromise(
      getOwner.effect(config, { name: "example.eth", blockNumber: 999n }),
    );

    expect(result).toEqual({
      name: "example.eth",
      owner,
      registrant,
      protocol: "v1",
      ownershipLevel: "registrar",
    });
    expect(publicClient.getBlock).not.toHaveBeenCalled();
    expect(publicClient.multicall).toHaveBeenCalledOnce();
    expect(publicClient.multicall.mock.calls[0]?.[0].contracts).toHaveLength(3);
  });

  it("falls back to reserved V1 ownership during the V2 transition", async () => {
    const publicClient = makePublicClient("sepolia", (call) => {
      switch (call.functionName) {
        case "findOwner":
          return zeroAddress;
        case "getState":
          return { status: 1, expiry: 0n, latestOwner: zeroAddress, tokenId: 0n, resource: 0n };
        case "isRenewable":
          return true;
        case "owner":
          return owner;
        case "ownerOf":
          return call.address === sepoliaV1Deployment.contracts.baseRegistrar
            ? registrant
            : zeroAddress;
        default:
          throw new Error(`Unexpected contract read: ${call.functionName}`);
      }
    });
    const config = createConfig({ network: "sepolia", publicClient: publicClient.client });

    const result = await getOwner(config, { name: "reserved.eth", blockNumber: 999n });

    expect(result).toEqual({
      name: "reserved.eth",
      owner,
      registrant,
      protocol: "v1",
      ownershipLevel: "registrar",
    });
  });

  it("does not fail a migrated name when an irrelevant speculative read fails", async () => {
    const publicClient = makePublicClient("sepolia", resolveV2Owner);
    publicClient.multicall.mockImplementationOnce(
      async ({
        contracts,
      }: {
        readonly contracts: readonly ContractCall[];
      }): Promise<readonly MulticallOutcome[]> =>
        contracts.map((contract) =>
          contract.functionName === "getState"
            ? { status: "failure", error: new Error("irrelevant state failure") }
            : { status: "success", result: resolveV2Owner(contract) },
        ),
    );
    const config = createConfig({ network: "sepolia", publicClient: publicClient.client });

    const result = await getOwner(config, { name: "migrated.eth", blockNumber: 999n });

    expect(result?.owner).toBe(owner);
    expect(result?.protocol).toBe("v2");
  });
});
