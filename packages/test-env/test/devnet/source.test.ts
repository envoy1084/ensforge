import { Effect } from "effect";

import { expect, it } from "vitest";

import { verifyContractsSource } from "../../src/devnet/source.js";

it("reports a missing contracts checkout through the typed error channel", async () => {
  const error = await Effect.runPromise(
    Effect.flip(
      verifyContractsSource({
        directory: "/ensforge-test-source-that-does-not-exist",
      }),
    ),
  );

  expect(error.code).toBe("SOURCE_UNAVAILABLE");
});
