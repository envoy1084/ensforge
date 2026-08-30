import type { ReactNode } from "react";

import { Effect, Exit, Schedule } from "effect";

import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { makeMutationAtom, makeQueryAtom } from "../../../src/atoms/index.js";
import { makeMutationHook, makeQueryHook } from "../../../src/hooks/index.js";
import { EnsforgeProvider } from "../../../src/provider/index.js";
import { makeSdk } from "../fixtures/sdk.js";

interface TestParameters {
  readonly value: number;
}

describe("mutation hooks", () => {
  it("supports Promise execution, callbacks, and reset", async () => {
    const sdk = makeSdk();
    const onExit = vi.fn();
    const useTestMutation = makeMutationHook(
      makeMutationAtom<TestParameters, number, never>("test", () => ({
        effect: ({ value }) => Effect.succeed(value * 2),
      })),
    );
    const wrapper = ({ children }: { readonly children: ReactNode }) => (
      <EnsforgeProvider sdk={sdk}>{children}</EnsforgeProvider>
    );
    const { result } = renderHook(() => useTestMutation({ onExit }), { wrapper });

    let value: number | undefined;
    await act(async () => {
      value = await result.current.mutateAsync({ value: 21 });
    });

    expect(value).toBe(42);
    expect(onExit).toHaveBeenCalledOnce();
    expect(Exit.isSuccess(onExit.mock.calls[0]?.[0])).toBe(true);
    expect(onExit.mock.calls[0]?.[1]).toEqual({ value: 21 });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBe(42);

    act(() => result.current.reset());
    expect(result.current.isInitial).toBe(true);
    expect(result.current.parameters).toBeUndefined();
  });

  it("exposes Effect execution", async () => {
    const sdk = makeSdk();
    const useTestMutation = makeMutationHook(
      makeMutationAtom<TestParameters, number, never>("test", () => ({
        effect: ({ value }) => Effect.succeed(value),
      })),
    );
    const wrapper = ({ children }: { readonly children: ReactNode }) => (
      <EnsforgeProvider sdk={sdk}>{children}</EnsforgeProvider>
    );
    const { result } = renderHook(() => useTestMutation(), { wrapper });

    let value: number | undefined;
    await act(async () => {
      value = await Effect.runPromise(result.current.mutateEffect({ value: 7 }));
    });

    expect(value).toBe(7);
    expect(result.current.data).toBe(7);
  });

  it("retries typed mutation failures with an Effect schedule", async () => {
    const sdk = makeSdk();
    let attempts = 0;
    const useTestMutation = makeMutationHook(
      makeMutationAtom<TestParameters, number, "RETRY">("test", () => ({
        effect: ({ value }) =>
          Effect.suspend(() => {
            attempts += 1;
            return attempts === 1 ? Effect.fail("RETRY" as const) : Effect.succeed(value);
          }),
      })),
    );
    const wrapper = ({ children }: { readonly children: ReactNode }) => (
      <EnsforgeProvider sdk={sdk}>{children}</EnsforgeProvider>
    );
    const { result } = renderHook(() => useTestMutation({ retry: Schedule.recurs(1) }), {
      wrapper,
    });

    let value: number | undefined;
    await act(async () => {
      value = await result.current.mutateAsync({ value: 7 });
    });

    expect(value).toBe(7);
    expect(attempts).toBe(2);
  });

  it("refreshes related queries after a successful mutation", async () => {
    const sdk = makeSdk();
    let value = 1;
    const useTestQuery = makeQueryHook(
      makeQueryAtom<TestParameters, number, never>("records", () => ({
        effect: () => Effect.succeed(value),
      })),
    );
    const useTestMutation = makeMutationHook(
      makeMutationAtom<TestParameters, number, never>("records", () => ({
        effect: ({ value: nextValue }) => Effect.sync(() => (value = nextValue)),
      })),
    );
    const wrapper = ({ children }: { readonly children: ReactNode }) => (
      <EnsforgeProvider sdk={sdk}>{children}</EnsforgeProvider>
    );
    const { result } = renderHook(
      () => ({
        mutation: useTestMutation(),
        query: useTestQuery({ value: 0 }),
      }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.query.data).toBe(1));
    await act(() => result.current.mutation.mutateAsync({ value: 2 }));
    await waitFor(() => expect(result.current.query.data).toBe(2));
  });
});
