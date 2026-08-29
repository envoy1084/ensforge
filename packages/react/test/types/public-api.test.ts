import { expectTypeOf, it } from "vitest";

import type { SetTextParameters } from "../../src/index.js";
import { useOwner, useRecords, useSetText } from "../../src/index.js";

it("preserves named hook parameter and result types", () => {
  expectTypeOf(useOwner).parameter(0).toMatchTypeOf<{
    readonly name: string;
  }>();
  expectTypeOf(useSetText).returns.toHaveProperty("mutate");
  expectTypeOf<
    Parameters<ReturnType<typeof useSetText>["mutate"]>[0]
  >().toEqualTypeOf<SetTextParameters>();
  expectTypeOf(useRecords).toBeFunction();
});
