import type { SetTextParameters } from "@ensforge/sdk/records";
import { expectTypeOf, it } from "vitest";

import {
  createRegistry,
  invalidate,
  invalidateEffect,
  prefetch,
  prefetchEffect,
  useInvalidate,
  useIndexedName,
  useIndexedNameSuspense,
  useOwner,
  useRecords,
  useSetText,
} from "../../src/index.js";

it("preserves named hook parameter and result types", () => {
  expectTypeOf(useOwner).parameter(0).toHaveProperty("atom");
  expectTypeOf(useOwner).parameter(0).toHaveProperty("enabled");
  expectTypeOf(useOwner).parameter(0).toHaveProperty("map");
  expectTypeOf(useOwner).returns.toHaveProperty("isWaiting");
  expectTypeOf(useOwner).returns.toHaveProperty("refreshEffect");
  expectTypeOf(useSetText).returns.toHaveProperty("mutate");
  expectTypeOf(useSetText).returns.toHaveProperty("mutateAsync");
  expectTypeOf(useSetText).returns.toHaveProperty("mutateEffect");
  expectTypeOf(useSetText).returns.toHaveProperty("isWaiting");
  expectTypeOf<
    Parameters<ReturnType<typeof useSetText>["mutate"]>[0]
  >().toEqualTypeOf<SetTextParameters>();
  expectTypeOf(useRecords).toBeFunction();
  expectTypeOf(useIndexedName).parameter(0).toHaveProperty("enabled");
  expectTypeOf(useIndexedName).parameter(0).toHaveProperty("atom");
  expectTypeOf(useIndexedNameSuspense).parameter(0).not.toHaveProperty("enabled");
  expectTypeOf(useIndexedNameSuspense).returns.toHaveProperty("data");
});

it("exposes Effect Atom-native options and concise cache helpers", () => {
  expectTypeOf<NonNullable<Parameters<typeof useSetText>[0]>>().toHaveProperty("retry");
  expectTypeOf(createRegistry).toBeFunction();
  expectTypeOf(invalidate).toBeFunction();
  expectTypeOf(invalidateEffect).toBeFunction();
  expectTypeOf(prefetch).toBeFunction();
  expectTypeOf(prefetchEffect).toBeFunction();
  expectTypeOf(useInvalidate).toBeFunction();
});
