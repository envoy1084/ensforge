import type { ReactNode } from "react";

import { Effect } from "effect";

import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { makeQueryAtom } from "../../../src/atoms/index.js";
import { makeQueryHook } from "../../../src/hooks/index.js";
import { EnsforgeProvider } from "../../../src/provider/index.js";
import { defaultEnsQueryOptions } from "../../../src/query/options.js";
import { makeSdk } from "../fixtures/sdk.js";

interface TestParameters {
  readonly value: number;
}

describe("query hooks", () => {
  it("deduplicates structurally equal atom parameters", () => {
    const sdk = makeSdk();
    const factory = makeQueryAtom("test", () => ({
      effect: ({ value }: TestParameters) => Effect.succeed(value),
    }));

    expect(factory(sdk, { value: 1 }, defaultEnsQueryOptions)).toBe(
      factory(sdk, { value: 1 }, defaultEnsQueryOptions),
    );
  });

  it("exposes familiar query state and selectors", async () => {
    const sdk = makeSdk();
    const factory = makeQueryAtom("test", () => ({
      effect: ({ value }: TestParameters) => Effect.succeed(value),
    }));
    const useTestQuery = makeQueryHook(factory);
    const wrapper = ({ children }: { readonly children: ReactNode }) => (
      <EnsforgeProvider sdk={sdk}>{children}</EnsforgeProvider>
    );
    const { result } = renderHook(
      () =>
        useTestQuery({
          value: 21,
          query: { select: (value) => value * 2 },
        }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBe(42);
    expect(result.current.status).toBe("success");
  });

  it("does not execute disabled queries", async () => {
    const sdk = makeSdk();
    const execute = vi.fn(() => Effect.succeed(1));
    const useTestQuery = makeQueryHook(
      makeQueryAtom<TestParameters, number, never>("test", () => ({ effect: execute })),
    );
    const wrapper = ({ children }: { readonly children: ReactNode }) => (
      <EnsforgeProvider sdk={sdk}>{children}</EnsforgeProvider>
    );
    const { result } = renderHook(() => useTestQuery({ value: 1, query: { enabled: false } }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.fetchStatus).toBe("idle"));
    expect(execute).not.toHaveBeenCalled();
    expect(result.current.isPending).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it("retries typed query failures when configured", async () => {
    const sdk = makeSdk();
    let attempts = 0;
    const useTestQuery = makeQueryHook(
      makeQueryAtom<TestParameters, number, "RETRY">("test", () => ({
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
    const { result } = renderHook(() => useTestQuery({ value: 3, query: { retry: 1 } }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBe(3);
    expect(attempts).toBe(2);
  });
});
