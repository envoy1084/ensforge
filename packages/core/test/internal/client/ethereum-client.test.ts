import { Effect } from "effect";

import type { PublicClient } from "viem";
import { describe, expect, it, vi } from "vitest";

import { ContractError } from "../../../src/index.js";
import { makeEthereumClient } from "../../../src/internal/client/ethereum-client.js";

const address = "0x0000000000000000000000000000000000000001";
const ownerAbi = [
  {
    type: "function",
    name: "owner",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },
] as const;

describe("EthereumClient", () => {
  it("executes typed contract reads through the configured public client", async () => {
    const readContract = vi.fn().mockResolvedValue(address);
    const client = makeEthereumClient({
      publicClient: { readContract } as unknown as PublicClient,
    });

    const result = await Effect.runPromise(
      client.readContract({
        address,
        abi: ownerAbi,
        functionName: "owner",
      }),
    );

    expect(result).toBe(address);
    expect(readContract).toHaveBeenCalledOnce();
  });

  it("translates rejected reads into the typed error channel", async () => {
    const cause = new Error("RPC unavailable");
    const client = makeEthereumClient({
      publicClient: {
        readContract: vi.fn().mockRejectedValue(cause),
      } as unknown as PublicClient,
    });

    const error = await Effect.runPromise(
      Effect.flip(
        client.readContract({
          address,
          abi: ownerAbi,
          functionName: "owner",
        }),
      ),
    );

    expect(error).toEqual(
      new ContractError({
        code: "READ_FAILED",
        message: cause.message,
        cause,
      }),
    );
  });

  it("keeps individual multicall failures available to domain actions", async () => {
    const failure = new Error("ERC-721 token does not exist");
    const multicall = vi.fn().mockResolvedValue([{ status: "failure", error: failure }]);
    const client = makeEthereumClient({
      publicClient: { multicall } as unknown as PublicClient,
    });

    const result = await Effect.runPromise(
      client.multicall({
        allowFailure: true,
        contracts: [{ address, abi: ownerAbi, functionName: "owner" }],
      }),
    );

    expect(result).toEqual([{ status: "failure", error: failure }]);
  });
});
