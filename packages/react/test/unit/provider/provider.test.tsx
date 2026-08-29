import type { ReactNode } from "react";

import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EnsforgeProvider, useEnsforge } from "../../../src/index.js";
import { makePublicClient, makeSdk } from "../fixtures/sdk.js";

describe("EnsforgeProvider", () => {
  it("provides an existing SDK", () => {
    const sdk = makeSdk();
    const wrapper = ({ children }: { readonly children: ReactNode }) => (
      <EnsforgeProvider sdk={sdk}>{children}</EnsforgeProvider>
    );
    const { result } = renderHook(useEnsforge, { wrapper });

    expect(result.current).toBe(sdk);
  });

  it("creates one stable SDK from config", () => {
    const publicClient = makePublicClient();
    const wrapper = ({ children }: { readonly children: ReactNode }) => (
      <EnsforgeProvider config={{ network: "mainnet", publicClient }}>{children}</EnsforgeProvider>
    );
    const { result, rerender } = renderHook(useEnsforge, { wrapper });
    const sdk = result.current;

    rerender();

    expect(result.current).toBe(sdk);
    expect(result.current.config.publicClient).toBe(publicClient);
  });

  it("rejects hooks outside the provider", () => {
    expect(() => renderHook(useEnsforge)).toThrow(
      "Ensforge React hooks must be used inside an EnsforgeProvider",
    );
  });
});
