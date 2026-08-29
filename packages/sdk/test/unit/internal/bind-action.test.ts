import { it } from "@effect/vitest";
import { Effect } from "effect";

import { createConfig, defineReadAction, defineWriteAction } from "@ensforge/core";
import { describe, expect, vi } from "vitest";

import { bindAction } from "../../../src/internal/bind-action.js";
import { makeMainnetPublicClient } from "../fixtures/clients.js";

describe("bindAction", () => {
  it.effect("injects config into the Promise and Effect forms", () =>
    Effect.gen(function* () {
      const config = createConfig({
        network: "mainnet",
        publicClient: makeMainnetPublicClient(),
      });
      const implementation = vi.fn((currentConfig: typeof config, value: number) =>
        Effect.succeed({ currentConfig, value: value * 2 }),
      );
      const bound = bindAction(config, defineReadAction(implementation));

      const effectResult = yield* bound.effect(21);
      const promiseResult = yield* Effect.promise(() => bound(21));

      expect(effectResult).toEqual({ currentConfig: config, value: 42 });
      expect(promiseResult).toEqual(effectResult);
      expect(implementation).toHaveBeenCalledTimes(2);
    }),
  );

  it("keeps read requests lazy and write intents config-free", () => {
    const config = createConfig({
      network: "mainnet",
      publicClient: makeMainnetPublicClient(),
    });
    const readImplementation = vi.fn((_: typeof config, value: number) => Effect.succeed(value));
    const read = bindAction(config, defineReadAction(readImplementation));
    const write = bindAction(
      config,
      defineWriteAction("setValue", (_: typeof config, value: number) => Effect.succeed(value)),
    );

    const request = read.request(42);
    const intent = write.call(42);

    expect(readImplementation).not.toHaveBeenCalled();
    expect(request).toBeDefined();
    expect(intent).toMatchObject({ operation: "setValue", parameters: 42 });
    expect(Object.isFrozen(read)).toBe(true);
    expect(Object.isFrozen(write)).toBe(true);
  });
});
