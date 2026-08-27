import { Effect, Exit } from "effect";

import { describe, expect, it, vi } from "vitest";

import {
  defineAction,
  defineReadAction,
  defineWriteAction,
  type EnsforgeConfig,
} from "../src/index.js";

const config = {} as EnsforgeConfig;

describe("defineAction", () => {
  it("exposes the canonical Effect through both APIs", async () => {
    const implementation = vi.fn((_: EnsforgeConfig, input: { readonly value: number }) =>
      Effect.succeed(input.value * 2),
    );
    const action = defineAction(implementation);

    await expect(action(config, { value: 21 })).resolves.toBe(42);
    await expect(Effect.runPromise(action.effect(config, { value: 21 }))).resolves.toBe(42);
    expect(implementation).toHaveBeenCalledTimes(2);
    expect(action.effect).toBe(implementation);
  });

  it("runs the implementation exactly once per Promise call", async () => {
    let executions = 0;
    const action = defineAction((_: EnsforgeConfig, value: number) =>
      Effect.sync(() => {
        executions += 1;
        return value;
      }),
    );

    await expect(action(config, 42)).resolves.toBe(42);
    expect(executions).toBe(1);
  });

  it("preserves failures through the Effect and Promise forms", async () => {
    const failure = { _tag: "TestFailure", message: "synthetic failure" } as const;
    const action = defineAction((currentConfig: EnsforgeConfig, __: undefined) => {
      void currentConfig;
      return Effect.fail(failure);
    });

    const exit = await Effect.runPromiseExit(action.effect(config, undefined));

    expect(Exit.isFailure(exit)).toBe(true);
    await expect(action(config, undefined)).rejects.toThrow("synthetic failure");
  });

  it("forwards an AbortSignal to the Effect runtime", async () => {
    const AbortControllerConstructor = Reflect.get(
      globalThis,
      "AbortController",
    ) as unknown as new () => {
      readonly signal: NonNullable<Effect.RunOptions["signal"]>;
      abort(): void;
    };
    const action = defineAction((currentConfig: EnsforgeConfig, __: undefined) => {
      void currentConfig;
      return Effect.never;
    });
    const controller = new AbortControllerConstructor();
    const result = action(config, undefined, { signal: controller.signal });

    controller.abort();

    await expect(result).rejects.toThrow(/interrupted/i);
  });

  it("keeps the nested Effect property immutable", () => {
    const action = defineAction((_: EnsforgeConfig, value: number) => Effect.succeed(value));
    const descriptor = Object.getOwnPropertyDescriptor(action, "effect");

    expect(Object.isFrozen(action)).toBe(true);
    expect(descriptor).toMatchObject({ configurable: false, enumerable: true, writable: false });
  });
});

describe("action descriptors", () => {
  it("constructs a lazy, immutable read request", () => {
    const implementation = vi.fn((_: EnsforgeConfig, value: number) => Effect.succeed(value));
    const action = defineReadAction(implementation);

    const request = action.request(42);

    expect(implementation).not.toHaveBeenCalled();
    expect(Object.isFrozen(request)).toBe(true);
    expect(Object.getOwnPropertyDescriptor(action, "request")).toMatchObject({
      configurable: false,
      enumerable: true,
      writable: false,
    });
  });

  it("constructs a lazy, immutable semantic write intent", () => {
    const implementation = vi.fn((_: EnsforgeConfig, value: number) => Effect.succeed(value));
    const action = defineWriteAction("setValue", implementation);

    const intent = action.call(42);

    expect(implementation).not.toHaveBeenCalled();
    expect(intent).toMatchObject({ operation: "setValue", parameters: 42 });
    expect(Object.isFrozen(intent)).toBe(true);
    expect(Object.getOwnPropertyDescriptor(action, "call")).toMatchObject({
      configurable: false,
      enumerable: true,
      writable: false,
    });
  });
});
