import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  getAddress,
  getDnsRecords,
  getFuses,
  getOwner,
  getPrimaryName,
  getTtl,
  getWrapperExpiry,
  hasDnsRecords,
} from "../../../src/index.js";
import { sepoliaConfig, sepoliaNames } from "../setup/sepolia.js";

describe("Sepolia protocol-specific reads", () => {
  it.effect("round-trips the seeded V2 primary name", () =>
    Effect.gen(function* () {
      const address = yield* getAddress.effect(sepoliaConfig, { name: sepoliaNames.v2.profile });
      if (address.address === null) {
        return yield* Effect.die(new Error("Sepolia profile has no Ethereum address"));
      }

      const primary = yield* getPrimaryName.effect(sepoliaConfig, { address: address.address });
      assert.isNotNull(primary);
      assert.strictEqual(String(primary?.name), sepoliaNames.v2.profile);
      assert.isTrue(primary?.match);
    }),
  );

  it.effect("returns V1 wrapper data and typed V2 unsupported results", () =>
    Effect.gen(function* () {
      const [v1Fuses, v1Expiry, v2Fuses, v2Expiry] = yield* Effect.all(
        [
          getFuses.effect(sepoliaConfig, { name: sepoliaNames.v1.wrapped }),
          getWrapperExpiry.effect(sepoliaConfig, { name: sepoliaNames.v1.wrapped }),
          getFuses.effect(sepoliaConfig, { name: sepoliaNames.v2.profile }),
          getWrapperExpiry.effect(sepoliaConfig, { name: sepoliaNames.v2.profile }),
        ] as const,
        { concurrency: 3 },
      );

      assert.isTrue(v1Fuses.supported && v1Fuses.wrapped);
      assert.isTrue(v1Expiry.supported && v1Expiry.expiry !== null);
      assert.deepStrictEqual(v2Fuses, {
        protocol: "v2",
        supported: false,
        reason: "FUSES_NOT_SUPPORTED",
      });
      assert.deepStrictEqual(v2Expiry, {
        protocol: "v2",
        supported: false,
        reason: "WRAPPER_EXPIRY_NOT_SUPPORTED",
      });
    }),
  );

  it.effect("reads V1 TTL and reports V2 TTL support explicitly", () =>
    Effect.gen(function* () {
      const [v1, v2] = yield* Effect.all(
        [
          getTtl.effect(sepoliaConfig, { name: sepoliaNames.v1.reserved }),
          getTtl.effect(sepoliaConfig, { name: sepoliaNames.v2.profile }),
        ] as const,
        { concurrency: 2 },
      );

      assert.strictEqual(v1.protocol, "v1");
      assert.isTrue(v1.supported);
      assert.deepStrictEqual(v2, {
        protocol: "v2",
        supported: false,
        reason: "TTL_UNSUPPORTED",
      });
    }),
  );

  it.effect("returns stable empty DNS records for the V2 Public Resolver fixture", () =>
    Effect.gen(function* () {
      const recordName = `profile.${sepoliaNames.v2.dns}`;
      const [records, exists] = yield* Effect.all(
        [
          getDnsRecords.effect(sepoliaConfig, {
            name: sepoliaNames.v2.dns,
            records: [{ recordName, resource: 16 }],
          }),
          hasDnsRecords.effect(sepoliaConfig, { name: sepoliaNames.v2.dns, recordName }),
        ] as const,
        { concurrency: 2 },
      );

      assert.isNull(records.records[0]?.value);
      assert.isFalse(exists.exists);
    }),
  );

  it.effect("keeps migrated-name ownership readable through the V2 route", () =>
    Effect.gen(function* () {
      const owner = yield* getOwner.effect(sepoliaConfig, { name: sepoliaNames.migrated });
      assert.strictEqual(owner?.protocol, "v2");
      assert.isNotNull(owner?.owner ?? null);
    }),
  );
});
