import { Effect, Result, Semaphore } from "effect";

import type { PublicClient } from "viem";
import { describe, expect, it, vi } from "vitest";

import { ContractError } from "../../../../src/errors/contract-error.js";
import {
  executeContractRead,
  makeContractReadResolver,
} from "../../../../src/internal/read/contract-read-resolver.js";
import { makeContractReadRequest } from "../../../../src/internal/read/contract-read.js";

const registry = "0x0000000000000000000000000000000000000001";
const alice = "0x0000000000000000000000000000000000000002";
const bob = "0x0000000000000000000000000000000000000003";
const otherRegistry = "0x0000000000000000000000000000000000000004";
const ownerAbi = [
  {
    type: "function",
    name: "owner",
    stateMutability: "view",
    inputs: [{ name: "node", type: "bytes32" }],
    outputs: [{ name: "", type: "address" }],
  },
] as const;
const firstNode = `0x${"01".repeat(32)}` as const;
const secondNode = `0x${"02".repeat(32)}` as const;
const thirdNode = `0x${"03".repeat(32)}` as const;

const requestOwner = (
  node: `0x${string}`,
  blockNumber?: bigint,
  target: `0x${string}` = registry,
  account?: `0x${string}`,
) =>
  Effect.runPromise(
    makeContractReadRequest({
      address: target,
      abi: ownerAbi,
      functionName: "owner",
      args: [node],
      ...(blockNumber === undefined ? {} : { blockNumber }),
      ...(account === undefined ? {} : { account }),
    }),
  );

describe("ContractReadResolver", () => {
  it("executes compatible reads in one Multicall3 request", async () => {
    const multicall = vi.fn().mockResolvedValue([
      { status: "success", result: alice },
      { status: "success", result: bob },
    ]);
    const resolver = makeContractReadResolver({
      publicClient: { multicall } as unknown as Pick<PublicClient, "multicall">,
    });
    const [first, second] = await Promise.all([
      requestOwner(firstNode),
      requestOwner(secondNode, undefined, otherRegistry),
    ]);

    const result = await Effect.runPromise(
      Effect.all(
        [executeContractRead(first, resolver), executeContractRead(second, resolver)] as const,
        {
          concurrency: "unbounded",
        },
      ),
    );

    expect(result).toEqual([alice, bob]);
    expect(multicall).toHaveBeenCalledOnce();
    expect(multicall.mock.calls[0]?.[0].contracts).toHaveLength(2);
    expect(
      multicall.mock.calls[0]?.[0].contracts.map(
        ({ address }: { readonly address: `0x${string}` }) => address,
      ),
    ).toEqual([registry, otherRegistry]);
    expect(multicall.mock.calls[0]?.[0].allowFailure).toBe(true);
    expect(multicall.mock.calls[0]?.[0].batchSize).toBe(0);
  });

  it("chunks unique reads by encoded calldata bytes while preserving order", async () => {
    const owners = new Map([
      [firstNode, alice],
      [secondNode, bob],
      [thirdNode, otherRegistry],
    ]);
    const multicall = vi.fn().mockImplementation(({ contracts }) =>
      Promise.resolve(
        contracts.map(({ args }: { readonly args: readonly [`0x${string}`] }) => ({
          status: "success",
          result: owners.get(args[0]),
        })),
      ),
    );
    const resolver = makeContractReadResolver({
      publicClient: { multicall } as unknown as Pick<PublicClient, "multicall">,
      multicallBatchSize: 36,
    });
    const requests = await Promise.all([
      requestOwner(firstNode),
      requestOwner(secondNode),
      requestOwner(thirdNode),
    ]);

    const result = await Effect.runPromise(
      Effect.all(
        requests.map((request) => executeContractRead(request, resolver)),
        {
          concurrency: "unbounded",
        },
      ),
    );

    expect(result).toEqual([alice, bob, otherRegistry]);
    expect(multicall).toHaveBeenCalledTimes(3);
    expect(multicall.mock.calls.map(([parameters]) => parameters.contracts.length)).toEqual([
      1, 1, 1,
    ]);
    expect(multicall.mock.calls.every(([parameters]) => parameters.batchSize === 0)).toBe(true);
  });

  it("limits concurrent Multicall3 chunks with the shared semaphore", async () => {
    let active = 0;
    let maximumActive = 0;
    const multicall = vi.fn().mockImplementation(async () => {
      active += 1;
      maximumActive = Math.max(maximumActive, active);
      await new Promise<void>((resolve) => setTimeout(resolve, 5));
      active -= 1;
      return [{ status: "success", result: alice }];
    });
    const resolver = makeContractReadResolver({
      publicClient: { multicall } as unknown as Pick<PublicClient, "multicall">,
      multicallBatchSize: 36,
      readSemaphore: Semaphore.makeUnsafe(2),
    });
    const requests = await Promise.all([
      requestOwner(firstNode),
      requestOwner(secondNode),
      requestOwner(thirdNode),
    ]);

    await Effect.runPromise(
      Effect.all(
        requests.map((request) => executeContractRead(request, resolver)),
        {
          concurrency: "unbounded",
        },
      ),
    );

    expect(multicall).toHaveBeenCalledTimes(3);
    expect(maximumActive).toBe(2);
  });

  it("isolates a transport failure to its Multicall3 chunk", async () => {
    const cause = new Error("first chunk unavailable");
    const multicall = vi.fn().mockImplementation(({ contracts }) => {
      const [{ args }] = contracts as [{ readonly args: readonly [`0x${string}`] }];
      return args[0] === firstNode
        ? Promise.reject(cause)
        : Promise.resolve([{ status: "success", result: bob }]);
    });
    const resolver = makeContractReadResolver({
      publicClient: { multicall } as unknown as Pick<PublicClient, "multicall">,
      multicallBatchSize: 36,
    });
    const [first, second] = await Promise.all([requestOwner(firstNode), requestOwner(secondNode)]);

    const result = await Effect.runPromise(
      Effect.all(
        [
          Effect.result(executeContractRead(first, resolver)),
          Effect.result(executeContractRead(second, resolver)),
        ] as const,
        { concurrency: "unbounded" },
      ),
    );

    expect(Result.isFailure(result[0]) && result[0].failure).toMatchObject({
      _tag: "ContractError",
      code: "MULTICALL_FAILED",
      cause,
    });
    expect(Result.isSuccess(result[1]) && result[1].success).toBe(bob);
  });

  it("deduplicates identical reads within a resolver batch", async () => {
    const multicall = vi.fn().mockResolvedValue([{ status: "success", result: alice }]);
    const resolver = makeContractReadResolver({
      publicClient: { multicall } as unknown as Pick<PublicClient, "multicall">,
    });
    const [first, duplicate] = await Promise.all([
      requestOwner(firstNode),
      requestOwner(firstNode),
    ]);

    const result = await Effect.runPromise(
      Effect.all(
        [executeContractRead(first, resolver), executeContractRead(duplicate, resolver)] as const,
        {
          concurrency: "unbounded",
        },
      ),
    );

    expect(result).toEqual([alice, alice]);
    expect(multicall).toHaveBeenCalledOnce();
    expect(multicall.mock.calls[0]?.[0].contracts).toHaveLength(1);
  });

  it("separates reads at different blocks", async () => {
    const multicall = vi.fn().mockImplementation(({ blockNumber }: { blockNumber: bigint }) =>
      Promise.resolve([
        {
          status: "success",
          result: blockNumber === 1n ? alice : bob,
        },
      ]),
    );
    const resolver = makeContractReadResolver({
      publicClient: { multicall } as unknown as Pick<PublicClient, "multicall">,
    });
    const [first, second] = await Promise.all([
      requestOwner(firstNode, 1n),
      requestOwner(secondNode, 2n),
    ]);

    const result = await Effect.runPromise(
      Effect.all(
        [executeContractRead(first, resolver), executeContractRead(second, resolver)] as const,
        {
          concurrency: "unbounded",
        },
      ),
    );

    expect(result).toEqual([alice, bob]);
    expect(multicall).toHaveBeenCalledTimes(2);
    expect(multicall.mock.calls.map(([parameters]) => parameters.blockNumber)).toEqual([1n, 2n]);
  });

  it("separates reads with different caller accounts", async () => {
    const multicall = vi
      .fn()
      .mockImplementation(({ account }: { account: `0x${string}` }) =>
        Promise.resolve([{ status: "success", result: account }]),
      );
    const resolver = makeContractReadResolver({
      publicClient: { multicall } as unknown as Pick<PublicClient, "multicall">,
    });
    const [first, second] = await Promise.all([
      requestOwner(firstNode, undefined, registry, alice),
      requestOwner(secondNode, undefined, registry, bob),
    ]);

    const result = await Effect.runPromise(
      Effect.all(
        [executeContractRead(first, resolver), executeContractRead(second, resolver)] as const,
        { concurrency: "unbounded" },
      ),
    );

    expect(result).toEqual([alice, bob]);
    expect(multicall).toHaveBeenCalledTimes(2);
    expect(multicall.mock.calls.map(([parameters]) => parameters.account)).toEqual([alice, bob]);
  });

  it("completes each read with its individual success or failure", async () => {
    const cause = new Error("owner lookup reverted");
    const multicall = vi.fn().mockResolvedValue([
      { status: "success", result: alice },
      { status: "failure", error: cause },
    ]);
    const resolver = makeContractReadResolver({
      publicClient: { multicall } as unknown as Pick<PublicClient, "multicall">,
    });
    const [first, second] = await Promise.all([requestOwner(firstNode), requestOwner(secondNode)]);

    const result = await Effect.runPromise(
      Effect.all(
        [
          Effect.result(executeContractRead(first, resolver)),
          Effect.result(executeContractRead(second, resolver)),
        ] as const,
        { concurrency: "unbounded" },
      ),
    );

    expect(Result.isSuccess(result[0]) && result[0].success).toBe(alice);
    expect(Result.isFailure(result[1]) && result[1].failure).toEqual(
      new ContractError({
        code: "MULTICALL_FAILED",
        message: cause.message,
        cause,
      }),
    );
  });

  it("completes every grouped read when the aggregate request fails", async () => {
    const cause = new Error("RPC unavailable");
    const multicall = vi.fn().mockRejectedValue(cause);
    const resolver = makeContractReadResolver({
      publicClient: { multicall } as unknown as Pick<PublicClient, "multicall">,
    });
    const [first, second] = await Promise.all([requestOwner(firstNode), requestOwner(secondNode)]);

    const result = await Effect.runPromise(
      Effect.all(
        [
          Effect.result(executeContractRead(first, resolver)),
          Effect.result(executeContractRead(second, resolver)),
        ] as const,
        { concurrency: "unbounded" },
      ),
    );

    for (const outcome of result) {
      expect(Result.isFailure(outcome) && outcome.failure).toEqual(
        new ContractError({
          code: "MULTICALL_FAILED",
          message: cause.message,
          cause,
        }),
      );
    }
  });

  it("fails entries that have no corresponding Multicall3 result", async () => {
    const multicall = vi.fn().mockResolvedValue([{ status: "success", result: alice }]);
    const resolver = makeContractReadResolver({
      publicClient: { multicall } as unknown as Pick<PublicClient, "multicall">,
    });
    const [first, second] = await Promise.all([requestOwner(firstNode), requestOwner(secondNode)]);

    const result = await Effect.runPromise(
      Effect.all(
        [
          Effect.result(executeContractRead(first, resolver)),
          Effect.result(executeContractRead(second, resolver)),
        ] as const,
        { concurrency: "unbounded" },
      ),
    );

    expect(Result.isSuccess(result[0]) && result[0].success).toBe(alice);
    expect(Result.isFailure(result[1]) && result[1].failure).toMatchObject({
      _tag: "ContractError",
      code: "DECODE_FAILED",
    });
  });
});
