import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { nameWrapperFuses } from "@ensforge/contracts/v1";

import {
  AuthorizationError,
  decodeFuseMask,
  encodeFuseMask,
  wrapperFuseMasks,
} from "../../../../src/index.js";

describe("Name Wrapper fuse masks", () => {
  it.effect("encodes and decodes named owner-controlled fuses", () =>
    Effect.gen(function* () {
      const mask = yield* encodeFuseMask(
        ["cannotUnwrap", "cannotTransfer"],
        wrapperFuseMasks.ownerControlledMask,
      );

      assert.strictEqual(mask, nameWrapperFuses.cannotUnwrap | nameWrapperFuses.cannotTransfer);
      assert.deepEqual(decodeFuseMask(mask), ["cannotUnwrap", "cannotTransfer"]);
    }),
  );

  it.effect("rejects fuse bits outside the allowed mask", () =>
    Effect.gen(function* () {
      const error = yield* encodeFuseMask(
        ["parentCannotControl"],
        wrapperFuseMasks.ownerControlledMask,
      ).pipe(Effect.flip);

      assert.instanceOf(error, AuthorizationError);
      assert.strictEqual(error.code, "WRITE_TARGET_UNAVAILABLE");
    }),
  );
});
