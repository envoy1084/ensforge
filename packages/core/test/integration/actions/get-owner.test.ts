import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { getOwner, readBatch } from "../../../src/index.js";
import { getIntegrationDevnet } from "../setup/devnet.js";

describe("getOwner integration", () => {
  it.effect("routes native and migrated names through ENS v2", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixtures = [
        devnet.fixtures.v2.active,
        devnet.fixtures.v2.differentOwner,
        devnet.fixtures.migration.migratedUnlocked,
        devnet.fixtures.migration.migratedLocked,
      ];
      const results = yield* Effect.promise(() =>
        Promise.all(fixtures.map((fixture) => getOwner(devnet.configs.v2, { name: fixture.name }))),
      );

      for (const [index, fixture] of fixtures.entries()) {
        const result = results[index];
        assert.strictEqual(result?.name, fixture.name);
        assert.strictEqual(result?.owner, fixture.owner);
        assert.strictEqual(result?.protocol, "v2");
      }
    }),
  );

  it.effect("reads legacy names from an ENS v1 deployment", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixtures = [
        devnet.fixtures.v1.activeUnwrapped,
        devnet.fixtures.v1.activeWrapped,
        devnet.fixtures.v1.wrappedSubname,
      ];
      const results = yield* Effect.promise(() =>
        Promise.all(fixtures.map((fixture) => getOwner(devnet.configs.v1, { name: fixture.name }))),
      );

      for (const [index, fixture] of fixtures.entries()) {
        const result = results[index];
        assert.strictEqual(result?.name, fixture.name);
        assert.strictEqual(result?.owner, fixture.owner);
        assert.strictEqual(result?.protocol, "v1");
      }
    }),
  );

  it.effect("routes reserved names back to ENS v1 during migration", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixtures = [
        devnet.fixtures.migration.reservedUnwrapped,
        devnet.fixtures.migration.reservedWrapped,
        devnet.fixtures.migration.reservedWrappedLocked,
      ];
      const results = yield* Effect.promise(() =>
        Promise.all(fixtures.map((fixture) => getOwner(devnet.configs.v2, { name: fixture.name }))),
      );

      for (const [index, fixture] of fixtures.entries()) {
        const result = results[index];
        assert.strictEqual(result?.name, fixture.name);
        assert.strictEqual(result?.owner, fixture.owner);
        assert.strictEqual(result?.protocol, "v1");
      }
    }),
  );

  it.effect("returns null for names available in both protocols", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* Effect.promise(() =>
        getOwner(devnet.configs.v2, { name: devnet.fixtures.v2.available.name }),
      );

      assert.isNull(result);
    }),
  );

  it.effect("keeps Promise and Effect APIs equivalent", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const parameters = { name: devnet.fixtures.migration.migratedLocked.name };
      const promiseResult = yield* Effect.promise(() => getOwner(devnet.configs.v2, parameters));
      const effectResult = yield* getOwner.effect(devnet.configs.v2, parameters);

      assert.deepStrictEqual(effectResult, promiseResult);
    }),
  );

  it.effect("executes prepared owner requests through one semantic batch", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* Effect.promise(() =>
        readBatch(devnet.configs.v2, {
          reserved: getOwner.request({ name: devnet.fixtures.migration.reservedUnwrapped.name }),
          migrated: getOwner.request({ name: devnet.fixtures.migration.migratedLocked.name }),
          native: getOwner.request({ name: devnet.fixtures.v2.active.name }),
        }),
      );

      assert.strictEqual(result.reserved?.protocol, "v1");
      assert.strictEqual(result.migrated?.protocol, "v2");
      assert.strictEqual(result.native?.protocol, "v2");
    }),
  );
});
