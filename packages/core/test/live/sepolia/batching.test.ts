import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  getAddress,
  getExpiry,
  getOwner,
  getResolver,
  getText,
  readBatch,
  readBatchSettled,
} from "../../../src/index.js";
import { sepoliaConfig, sepoliaNames } from "../setup/sepolia.js";

describe("Sepolia semantic batching", () => {
  it.effect("matches individual reads across native, migrated, and reserved names", () =>
    Effect.gen(function* () {
      const individual = yield* Effect.all(
        {
          nativeOwner: getOwner.effect(sepoliaConfig, { name: sepoliaNames.v2.profile }),
          nativeAddress: getAddress.effect(sepoliaConfig, { name: sepoliaNames.v2.profile }),
          migratedResolver: getResolver.effect(sepoliaConfig, { name: sepoliaNames.migrated }),
          reservedExpiry: getExpiry.effect(sepoliaConfig, { name: sepoliaNames.v1.reserved }),
        },
        { concurrency: 3 },
      );
      const batched = yield* readBatch.effect(sepoliaConfig, {
        nativeOwner: getOwner.request({ name: sepoliaNames.v2.profile }),
        nativeAddress: getAddress.request({ name: sepoliaNames.v2.profile }),
        migratedResolver: getResolver.request({ name: sepoliaNames.migrated }),
        reservedExpiry: getExpiry.request({ name: sepoliaNames.v1.reserved }),
      });

      assert.deepStrictEqual(batched, individual);
    }),
  );

  it.effect("settles independent reads without losing successful results", () =>
    Effect.gen(function* () {
      const result = yield* readBatchSettled.effect(sepoliaConfig, {
        address: getAddress.request({ name: sepoliaNames.v2.profile }),
        text: getText.request({ name: sepoliaNames.v2.profile, key: "description" }),
        reservedOwner: getOwner.request({ name: sepoliaNames.v1.reserved }),
      });

      assert.strictEqual(result.address.status, "success");
      assert.strictEqual(result.text.status, "success");
      assert.strictEqual(result.reservedOwner.status, "success");
    }),
  );
});
