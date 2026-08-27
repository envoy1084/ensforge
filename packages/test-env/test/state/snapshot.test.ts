import { Effect } from "effect";

import { describe, expect, it, vi } from "vitest";

import { createDevnetState, type DevnetStateClient } from "../../src/state/snapshot.js";

describe("createDevnetState", () => {
  it("reverts and immediately renews the consumed snapshot", async () => {
    const client = {
      snapshot: vi.fn().mockResolvedValueOnce("0x1").mockResolvedValueOnce("0x2"),
      revert: vi.fn().mockResolvedValue(undefined),
      increaseTime: vi.fn().mockResolvedValue("0x0"),
      mine: vi.fn().mockResolvedValue(undefined),
    } as unknown as DevnetStateClient;
    const state = await Effect.runPromise(createDevnetState(client));

    await Effect.runPromise(state.reset);

    expect(client.revert).toHaveBeenCalledWith({ id: "0x1" });
    expect(client.snapshot).toHaveBeenCalledTimes(2);
  });

  it("advances time and mines a block", async () => {
    const client = {
      snapshot: vi.fn().mockResolvedValue("0x1"),
      revert: vi.fn().mockResolvedValue(undefined),
      increaseTime: vi.fn().mockResolvedValue("0x3c"),
      mine: vi.fn().mockResolvedValue(undefined),
    } as unknown as DevnetStateClient;
    const state = await Effect.runPromise(createDevnetState(client));

    await Effect.runPromise(state.advanceTime(60));

    expect(client.increaseTime).toHaveBeenCalledWith({ seconds: 60 });
    expect(client.mine).toHaveBeenCalledWith({ blocks: 1 });
  });

  it("can replace the baseline after fixture seeding", async () => {
    const client = {
      snapshot: vi
        .fn()
        .mockResolvedValueOnce("0x1")
        .mockResolvedValueOnce("0x2")
        .mockResolvedValueOnce("0x3"),
      revert: vi.fn().mockResolvedValue(undefined),
      increaseTime: vi.fn().mockResolvedValue("0x0"),
      mine: vi.fn().mockResolvedValue(undefined),
    } as unknown as DevnetStateClient;
    const state = await Effect.runPromise(createDevnetState(client));

    await Effect.runPromise(state.checkpoint);
    await Effect.runPromise(state.reset);

    expect(client.revert).toHaveBeenCalledWith({ id: "0x2" });
  });
});
