import { Effect } from "effect";

import type { PublicClient } from "viem";
import { sepolia } from "viem/chains";
import { describe, expect, it, vi } from "vitest";

import {
  createConfig,
  defineReadAction,
  readBatch,
  readBatchSettled,
  RpcError,
  type EnsforgeConfig,
} from "../../src/index.js";

const makeConfig = (getBlock = vi.fn().mockResolvedValue({ number: 123n })) =>
  createConfig({
    network: "sepolia",
    publicClient: {
      chain: sepolia,
      getBlock,
      multicall: vi.fn(),
    } as unknown as PublicClient,
  });

describe("readBatch", () => {
  it("exposes immutable canonical Effect implementations", () => {
    for (const action of [readBatch, readBatchSettled]) {
      expect(Object.isFrozen(action)).toBe(true);
      expect(Object.getOwnPropertyDescriptor(action, "effect")).toMatchObject({
        configurable: false,
        enumerable: true,
        writable: false,
      });
    }
  });

  it("executes keyed semantic requests with one snapshot context", async () => {
    const getBlock = vi.fn().mockResolvedValue({ number: 123n });
    const config = makeConfig(getBlock);
    const number = defineReadAction((_: EnsforgeConfig, value: number) => Effect.succeed(value));
    const label = defineReadAction((_: EnsforgeConfig, value: string) => Effect.succeed(value));

    const result = await readBatch(config, {
      number: number.request(42),
      label: label.request("ens"),
    });

    expect(result).toEqual({ number: 42, label: "ens" });
    expect(getBlock).toHaveBeenCalledOnce();
    expect(getBlock).toHaveBeenCalledWith({ blockTag: "latest" });
  });

  it("supports best-effort execution without resolving a snapshot", async () => {
    const getBlock = vi.fn();
    const config = makeConfig(getBlock);
    const action = defineReadAction((_: EnsforgeConfig, value: number) => Effect.succeed(value));

    await expect(
      readBatch(config, { value: action.request(1) }, { consistency: "best-effort" }),
    ).resolves.toEqual({ value: 1 });
    expect(getBlock).not.toHaveBeenCalled();
  });

  it("preserves Promise and Effect result parity", async () => {
    const config = makeConfig();
    const action = defineReadAction((_: EnsforgeConfig, value: number) => Effect.succeed(value));
    const requests = { value: action.request(42) };

    const promiseResult = await readBatch(config, requests, { blockNumber: 123n });
    const effectResult = await Effect.runPromise(
      readBatch.effect(config, requests, { blockNumber: 123n }),
    );

    expect(effectResult).toEqual(promiseResult);
  });

  it("fails when the snapshot context cannot be created", async () => {
    const cause = new Error("RPC unavailable");
    const config = makeConfig(vi.fn().mockRejectedValue(cause));
    const action = defineReadAction((_: EnsforgeConfig, value: number) => Effect.succeed(value));

    const error = await Effect.runPromise(
      Effect.flip(readBatch.effect(config, { value: action.request(1) })),
    );

    expect(error).toEqual(
      new RpcError({
        code: "REQUEST_FAILED",
        message: cause.message,
        cause,
      }),
    );
  });
});

describe("readBatchSettled", () => {
  it("returns stable outcomes for independent successes and failures", async () => {
    const config = makeConfig();
    const failure = { _tag: "TestFailure", message: "failed" } as const;
    const succeeds = defineReadAction((_: EnsforgeConfig, value: number) => Effect.succeed(value));
    const fails = defineReadAction((currentConfig: EnsforgeConfig, __: undefined) => {
      void currentConfig;
      return Effect.fail(failure);
    });

    const result = await readBatchSettled(
      config,
      {
        success: succeeds.request(42),
        failure: fails.request(undefined),
      },
      { blockNumber: 123n },
    );

    expect(result).toEqual({
      success: { status: "success", value: 42 },
      failure: { status: "failure", error: failure },
    });
  });
});
