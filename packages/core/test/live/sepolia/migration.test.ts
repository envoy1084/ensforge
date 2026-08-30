import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  getMigrationEligibility,
  getMigrationPlan,
  getMigrationStatus,
  getMigrationTarget,
  getOwner,
} from "../../../src/index.js";
import { sepoliaConfig, sepoliaFixtureAccounts, sepoliaNames } from "../setup/sepolia.js";

describe("Sepolia V1 to V2 migration reads", () => {
  it.effect("classifies reserved, migrated, native, and available names", () =>
    Effect.gen(function* () {
      const [reserved, migrated, native, available] = yield* Effect.all(
        [
          getMigrationStatus.effect(sepoliaConfig, { name: sepoliaNames.v1.reserved }),
          getMigrationStatus.effect(sepoliaConfig, { name: sepoliaNames.migrated }),
          getMigrationStatus.effect(sepoliaConfig, { name: sepoliaNames.v2.root }),
          getMigrationStatus.effect(sepoliaConfig, { name: sepoliaNames.v2.available }),
        ] as const,
        { concurrency: 3 },
      );

      assert.isTrue(reserved.status.startsWith("reserved-"));
      assert.isTrue(migrated.status.startsWith("migrated-"));
      assert.strictEqual(native.status, "not-required");
      if (native.status === "not-required") {
        assert.strictEqual(String(native.name), sepoliaNames.v2.root);
        assert.strictEqual(native.reason, "V2_NATIVE");
      }
      assert.strictEqual(available.status, "not-required");
      if (available.status === "not-required") {
        assert.strictEqual(String(available.name), sepoliaNames.v2.available);
        assert.strictEqual(available.reason, "AVAILABLE");
      }
    }),
  );

  it.effect("returns a concrete migration target for a reserved V1 name", () =>
    Effect.gen(function* () {
      const target = yield* getMigrationTarget.effect(sepoliaConfig, {
        name: sepoliaNames.v1.reserved,
      });

      assert.isTrue(target.supported);
      if (target.supported) {
        assert.isTrue(["unwrapped", "wrapped-unlocked", "wrapped-locked"].includes(target.route));
        assert.isTrue(target.tokenId > 0n);
      }
    }),
  );

  it.effect("checks owner eligibility and produces semantic migration plans", () =>
    Effect.gen(function* () {
      const owner = yield* getOwner.effect(sepoliaConfig, { name: sepoliaNames.v1.reserved });
      if (owner?.owner === null || owner === null) {
        return yield* Effect.die(new Error("Reserved Sepolia name has no owner"));
      }

      const [eligible, denied, ownerPlan, migratedPlan] = yield* Effect.all(
        [
          getMigrationEligibility.effect(sepoliaConfig, {
            name: sepoliaNames.v1.reserved,
            account: owner.owner,
          }),
          getMigrationEligibility.effect(sepoliaConfig, {
            name: sepoliaNames.v1.reserved,
            account: sepoliaFixtureAccounts.secondary,
          }),
          getMigrationPlan.effect(sepoliaConfig, {
            name: sepoliaNames.v1.reserved,
            account: owner.owner,
          }),
          getMigrationPlan.effect(sepoliaConfig, {
            name: sepoliaNames.migrated,
            account: owner.owner,
          }),
        ] as const,
        { concurrency: 3 },
      );

      assert.isTrue(eligible.eligible);
      assert.isFalse(denied.eligible);
      assert.include(denied.blockers, "ACCOUNT_NOT_OWNER_OR_OPERATOR");
      assert.strictEqual(ownerPlan.status, "ready");
      assert.strictEqual(migratedPlan.status, "not-required");
    }),
  );
});
