import { Effect, Result } from "effect";

import type { PublicClient } from "viem";
import { describe, expect, it, vi } from "vitest";

import { createConfig } from "../../../src/config/create-config.js";
import { getConfigLayer } from "../../../src/config/internal.js";
import { RpcError } from "../../../src/errors/rpc-error.js";
import { ReadExecution, makeReadExecution } from "../../../src/internal/read/execution-context.js";
import { makeSepoliaPublicClient } from "../../fixtures/client-fixtures.js";

const makePublicClient = (getBlock: ReturnType<typeof vi.fn>) =>
  ({
    getBlock,
    multicall: vi.fn(),
  }) as unknown as Pick<PublicClient, "getBlock" | "multicall">;

describe("ReadExecution", () => {
  it("stores one shared contract resolver in each config context", async () => {
    const config = createConfig({
      network: "sepolia",
      publicClient: makeSepoliaPublicClient(),
    });

    const result = await Effect.runPromise(
      Effect.provide(
        Effect.gen(function* () {
          const execution = yield* ReadExecution;
          const first = yield* execution.makeContext({ consistency: "best-effort" });
          const second = yield* execution.makeContext({ consistency: "best-effort" });
          return { execution, first, second };
        }),
        getConfigLayer(config),
      ),
    );

    expect(result.first.contractReadResolver).toBe(result.execution.contractReadResolver);
    expect(result.second.contractReadResolver).toBe(result.execution.contractReadResolver);
    expect(result.second.contractReadResolver).toBe(result.first.contractReadResolver);
  });

  it("resolves snapshot consistency to one concrete block", async () => {
    const getBlock = vi.fn().mockResolvedValue({ number: 123n });
    const execution = makeReadExecution({ publicClient: makePublicClient(getBlock) });

    const context = await Effect.runPromise(execution.makeContext());

    expect(context).toMatchObject({
      consistency: "snapshot",
      block: { blockNumber: 123n },
    });
    expect(getBlock).toHaveBeenCalledOnce();
    expect(getBlock).toHaveBeenCalledWith({ blockTag: "latest" });
    expect(Object.isFrozen(context)).toBe(true);
    expect(Object.isFrozen(context.block)).toBe(true);
  });

  it("resolves the selected stable block tag for snapshot consistency", async () => {
    const getBlock = vi.fn().mockResolvedValue({ number: 100n });
    const execution = makeReadExecution({ publicClient: makePublicClient(getBlock) });

    const context = await Effect.runPromise(
      execution.makeContext({ consistency: "snapshot", blockTag: "finalized" }),
    );

    expect(context.block).toEqual({ blockNumber: 100n });
    expect(getBlock).toHaveBeenCalledWith({ blockTag: "finalized" });
  });

  it("preserves the selector without an RPC request in best-effort mode", async () => {
    const getBlock = vi.fn();
    const execution = makeReadExecution({ publicClient: makePublicClient(getBlock) });

    const context = await Effect.runPromise(
      execution.makeContext({ consistency: "best-effort", blockTag: "safe" }),
    );

    expect(context).toMatchObject({
      consistency: "best-effort",
      block: { blockTag: "safe" },
    });
    expect(getBlock).not.toHaveBeenCalled();
  });

  it("uses an explicit block number without resolving another block", async () => {
    const getBlock = vi.fn();
    const execution = makeReadExecution({ publicClient: makePublicClient(getBlock) });

    const context = await Effect.runPromise(
      execution.makeContext({ consistency: "snapshot", blockNumber: 50n }),
    );

    expect(context.block).toEqual({ blockNumber: 50n });
    expect(getBlock).not.toHaveBeenCalled();
  });

  it("rejects pending blocks for snapshot consistency", async () => {
    const getBlock = vi.fn();
    const execution = makeReadExecution({ publicClient: makePublicClient(getBlock) });

    const result = await Effect.runPromise(
      Effect.result(execution.makeContext({ consistency: "snapshot", blockTag: "pending" })),
    );

    expect(Result.isFailure(result) && result.failure).toEqual(
      new RpcError({
        code: "REQUEST_FAILED",
        message: "Snapshot consistency cannot use the pending block",
        cause: { blockTag: "pending" },
      }),
    );
    expect(getBlock).not.toHaveBeenCalled();
  });

  it("translates snapshot block lookup failures", async () => {
    const cause = new Error("RPC unavailable");
    const execution = makeReadExecution({
      publicClient: makePublicClient(vi.fn().mockRejectedValue(cause)),
    });

    const result = await Effect.runPromise(Effect.result(execution.makeContext()));

    expect(Result.isFailure(result) && result.failure).toEqual(
      new RpcError({
        code: "REQUEST_FAILED",
        message: cause.message,
        cause,
      }),
    );
  });
});
