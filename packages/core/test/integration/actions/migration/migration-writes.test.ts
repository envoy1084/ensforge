import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  approveMigration,
  getMigrationStatus,
  MigrationError,
  migrateName,
  migrateNames,
} from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

describe("migration writes integration", () => {
  it.effect("rejects a deployment address that is not an ENSv2 MigrationHelper", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const error = yield* Effect.flip(
        approveMigration.effect(devnet.configs.v2, {
          name: devnet.fixtures.migration.writeBatchUnwrapped.name,
        }),
      );

      assert.instanceOf(error, MigrationError);
      if (error instanceof MigrationError) assert.strictEqual(error.code, "MIGRATION_UNSUPPORTED");
    }),
  );

  it.effect("migrates unwrapped, wrapped-unlocked, and wrapped-locked names directly", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixtures = [
        devnet.fixtures.migration.writeUnwrapped,
        devnet.fixtures.migration.writeWrapped,
        devnet.fixtures.migration.writeWrappedLocked,
      ];
      const results = yield* Effect.forEach(fixtures, ({ name }) =>
        migrateName.effect(devnet.configs.v2, { name }),
      );

      assert.deepStrictEqual(
        results.map(({ status }) => status),
        ["completed", "completed", "completed"],
      );
      const statuses = yield* Effect.forEach(fixtures, ({ name }) =>
        getMigrationStatus.effect(devnet.configs.v2, { name }),
      );
      assert.deepStrictEqual(
        statuses.map(({ status }) => status),
        ["migrated-unlocked", "migrated-unlocked", "migrated-locked"],
      );
    }),
  );

  it.effect("falls back to sequential migration when MigrationHelper is incompatible", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* migrateNames.effect(devnet.configs.v2, {
        migrations: [
          { name: devnet.fixtures.migration.writeBatchUnwrapped.name },
          { name: devnet.fixtures.migration.writeBatchWrapped.name },
        ],
      });

      assert.strictEqual(result.status, "completed");
      assert.strictEqual(result.strategy, "sequential");
      assert.lengthOf(result.approvals, 0);
      assert.deepStrictEqual(
        result.migrations.map(({ status }) => status),
        ["completed", "completed"],
      );
      assert.isTrue(result.migrations.every(({ finalState }) => finalState?.migrated === true));
    }),
  );

  it.effect("migrates a locked parent before its dependent child", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const child = devnet.fixtures.migration.writeLockedChild.name;
      const before = yield* getMigrationStatus.effect(devnet.configs.v2, { name: child });
      assert.strictEqual(before.status, "locked-child-pending-parent");

      const result = yield* migrateName.effect(devnet.configs.v2, { name: child });
      assert.strictEqual(result.status, "completed");
      if (result.status !== "not-required") {
        assert.deepStrictEqual(
          result.steps.map(({ route }) => route),
          ["wrapped-locked", "locked-child"],
        );
      }
      const [parent, migratedChild] = yield* Effect.all(
        [
          getMigrationStatus.effect(devnet.configs.v2, {
            name: devnet.fixtures.migration.writeParentLocked.name,
          }),
          getMigrationStatus.effect(devnet.configs.v2, { name: child }),
        ] as const,
        { concurrency: "unbounded" },
      );
      assert.strictEqual(parent.status, "migrated-locked");
      assert.strictEqual(migratedChild.status, "not-required");
      if (migratedChild.status === "not-required") {
        assert.strictEqual(migratedChild.reason, "V2_NATIVE");
      }
    }),
  );

  it.effect("treats an already migrated name as an idempotent no-op", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* migrateName.effect(devnet.configs.v2, {
        name: devnet.fixtures.migration.migratedUnlocked.name,
      });

      assert.strictEqual(result.status, "not-required");
      if (result.status === "not-required") {
        assert.strictEqual(result.reason, "ALREADY_MIGRATED");
      }
      assert.isNull(result.write);
    }),
  );

  it.effect("treats an already migrated batch as an idempotent no-op", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* migrateNames.effect(devnet.configs.v2, {
        migrations: [
          { name: devnet.fixtures.migration.migratedUnlocked.name },
          { name: devnet.fixtures.migration.migratedLocked.name },
        ],
      });

      assert.strictEqual(result.status, "completed");
      assert.isEmpty(result.steps);
      assert.isTrue(result.migrations.every(({ status }) => status === "not-required"));
    }),
  );
});
