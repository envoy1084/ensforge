import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  getMigrationEligibility,
  getMigrationPlan,
  getMigrationStatus,
  getMigrationTarget,
  readBatch,
} from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

describe("migration reads integration", () => {
  it.effect("classifies every seeded migration route", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* Effect.all(
        {
          unwrapped: getMigrationStatus.effect(devnet.configs.v2, {
            name: devnet.fixtures.migration.reservedUnwrapped.name,
          }),
          wrapped: getMigrationStatus.effect(devnet.configs.v2, {
            name: devnet.fixtures.migration.reservedWrapped.name,
          }),
          locked: getMigrationStatus.effect(devnet.configs.v2, {
            name: devnet.fixtures.migration.reservedWrappedLocked.name,
          }),
          migratedUnlocked: getMigrationStatus.effect(devnet.configs.v2, {
            name: devnet.fixtures.migration.migratedUnlocked.name,
          }),
          migratedLocked: getMigrationStatus.effect(devnet.configs.v2, {
            name: devnet.fixtures.migration.migratedLocked.name,
          }),
          child: getMigrationStatus.effect(devnet.configs.v2, {
            name: devnet.fixtures.migration.mirroredChild.name,
          }),
        },
        { concurrency: "unbounded" },
      );

      assert.strictEqual(result.unwrapped.status, "reserved-unwrapped");
      assert.strictEqual(result.wrapped.status, "reserved-wrapped-unlocked");
      assert.strictEqual(result.locked.status, "reserved-wrapped-locked");
      assert.strictEqual(result.migratedUnlocked.status, "migrated-unlocked");
      assert.strictEqual(result.migratedLocked.status, "migrated-locked");
      assert.strictEqual(result.child.status, "mirrored-child");
    }),
  );

  it.effect("returns the token standard and receiver for every transferable route", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* readBatch.effect(devnet.configs.v2, {
        unwrapped: getMigrationTarget.request({
          name: devnet.fixtures.migration.reservedUnwrapped.name,
        }),
        unlocked: getMigrationTarget.request({
          name: devnet.fixtures.migration.reservedWrapped.name,
        }),
        locked: getMigrationTarget.request({
          name: devnet.fixtures.migration.reservedWrappedLocked.name,
        }),
        child: getMigrationTarget.request({ name: devnet.fixtures.migration.mirroredChild.name }),
      });

      assert.isTrue(result.unwrapped.supported);
      if (result.unwrapped.supported) {
        assert.strictEqual(result.unwrapped.route, "unwrapped");
        assert.strictEqual(result.unwrapped.tokenStandard, "erc721");
        assert.strictEqual(
          result.unwrapped.receiver,
          devnet.deployments.v2.migration.unlockedMigrationController,
        );
      }
      assert.isTrue(result.unlocked.supported);
      if (result.unlocked.supported) assert.strictEqual(result.unlocked.route, "wrapped-unlocked");
      assert.isTrue(result.locked.supported);
      if (result.locked.supported) assert.strictEqual(result.locked.route, "wrapped-locked");
      assert.isTrue(result.child.supported);
      if (result.child.supported) assert.strictEqual(result.child.route, "locked-child");
    }),
  );

  it.effect("checks owner authorization and produces semantic plans", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.migration.reservedWrapped.name;
      const [ownerEligibility, unauthorizedEligibility, ready, authorizationRequired] =
        yield* Effect.all(
          [
            getMigrationEligibility.effect(devnet.configs.v2, {
              name,
              account: devnet.accounts.owner,
            }),
            getMigrationEligibility.effect(devnet.configs.v2, {
              name,
              account: devnet.accounts.unauthorized,
            }),
            getMigrationPlan.effect(devnet.configs.v2, {
              name,
              account: devnet.accounts.owner,
            }),
            getMigrationPlan.effect(devnet.configs.v2, {
              name,
              account: devnet.accounts.unauthorized,
            }),
          ] as const,
          { concurrency: "unbounded" },
        );

      assert.isTrue(ownerEligibility.eligible);
      assert.isFalse(unauthorizedEligibility.eligible);
      assert.include(unauthorizedEligibility.blockers, "ACCOUNT_NOT_OWNER_OR_OPERATOR");
      assert.strictEqual(ready.status, "ready");
      assert.strictEqual(authorizationRequired.status, "authorization-required");
    }),
  );

  it.effect("reports completed, available, and pre-V2 states without throwing", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [migrated, available, v1] = yield* Effect.all(
        [
          getMigrationPlan.effect(devnet.configs.v2, {
            name: devnet.fixtures.migration.migratedLocked.name,
            account: devnet.accounts.owner,
          }),
          getMigrationPlan.effect(devnet.configs.v2, {
            name: devnet.fixtures.v2.available.name,
            account: devnet.accounts.owner,
          }),
          getMigrationPlan.effect(devnet.configs.v1, {
            name: devnet.fixtures.v1.activeUnwrapped.name,
            account: devnet.accounts.owner,
          }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.strictEqual(migrated.status, "not-required");
      assert.strictEqual(available.status, "not-required");
      assert.strictEqual(v1.status, "unsupported");
    }),
  );
});
