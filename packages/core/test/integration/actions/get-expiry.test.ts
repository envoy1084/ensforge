import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { getExpiry, readBatch } from "../../../src/index.js";
import { getIntegrationDevnet } from "../setup/devnet.js";

describe("getExpiry integration", () => {
  it.effect("reads active, grace, and expired v1 registrations", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixtures = [
        devnet.fixtures.v1.activeUnwrapped,
        devnet.fixtures.v1.grace,
        devnet.fixtures.v1.expired,
      ];
      const results = yield* Effect.promise(() =>
        Promise.all(
          fixtures.map((fixture) => getExpiry(devnet.configs.v1, { name: fixture.name })),
        ),
      );

      for (const [index, fixture] of fixtures.entries()) {
        const result = results[index];
        assert.strictEqual(result?.expiry, fixture.expiry);
        assert.strictEqual(result?.name, fixture.name);
        assert.strictEqual(result?.protocol, "v1");
        assert.strictEqual(result?.source, "baseRegistrar");
      }
    }),
  );

  it.effect("reads wrapped v1 subname expiry without registrar grace", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.v1.wrappedSubname;
      const result = yield* Effect.promise(() =>
        getExpiry(devnet.configs.v1, { name: fixture.name }),
      );

      assert.deepStrictEqual(result, {
        expiry: fixture.expiry,
        gracePeriod: 0n,
        gracePeriodEnd: fixture.expiry,
        name: fixture.name,
        protocol: "v1",
        source: "nameWrapper",
      });
    }),
  );

  it.effect("uses v1 expiry for reserved names and v2 expiry after migration", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const reserved = devnet.fixtures.migration.reservedUnwrapped;
      const migrated = devnet.fixtures.migration.migratedLocked;
      const [reservedResult, migratedResult] = yield* Effect.promise(() =>
        Promise.all([
          getExpiry(devnet.configs.v2, { name: reserved.name }),
          getExpiry(devnet.configs.v2, { name: migrated.name }),
        ]),
      );

      assert.strictEqual(reservedResult?.expiry, reserved.expiry);
      assert.strictEqual(reservedResult?.protocol, "v1");
      assert.strictEqual(reservedResult?.source, "baseRegistrar");
      assert.strictEqual(migratedResult?.expiry, migrated.expiry);
      assert.strictEqual(migratedResult?.protocol, "v2");
      assert.strictEqual(migratedResult?.source, "registry");
    }),
  );

  it.effect("reads native v2 registration and nested-name expiries", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixtures = [devnet.fixtures.v2.active, devnet.fixtures.v2.nestedOwnResolver];
      const results = yield* Effect.promise(() =>
        Promise.all(
          fixtures.map((fixture) => getExpiry(devnet.configs.v2, { name: fixture.name })),
        ),
      );

      for (const [index, fixture] of fixtures.entries()) {
        const result = results[index];
        assert.strictEqual(result?.expiry, fixture.expiry);
        assert.strictEqual(result?.name, fixture.name);
        assert.strictEqual(result?.protocol, "v2");
        assert.strictEqual(result?.source, "registry");
      }
    }),
  );

  it.effect("returns null for an available name", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* Effect.promise(() =>
        getExpiry(devnet.configs.v2, { name: devnet.fixtures.v2.available.name }),
      );

      assert.isNull(result);
    }),
  );

  it.effect("keeps Promise and Effect APIs equivalent", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const parameters = { name: devnet.fixtures.migration.migratedLocked.name };
      const promiseResult = yield* Effect.promise(() => getExpiry(devnet.configs.v2, parameters));
      const effectResult = yield* getExpiry.effect(devnet.configs.v2, parameters);

      assert.deepStrictEqual(effectResult, promiseResult);
    }),
  );

  it.effect("executes prepared expiry requests through one semantic batch", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* Effect.promise(() =>
        readBatch(devnet.configs.v2, {
          reserved: getExpiry.request({ name: devnet.fixtures.migration.reservedUnwrapped.name }),
          migrated: getExpiry.request({ name: devnet.fixtures.migration.migratedLocked.name }),
          native: getExpiry.request({ name: devnet.fixtures.v2.active.name }),
        }),
      );

      assert.strictEqual(result.reserved?.protocol, "v1");
      assert.strictEqual(result.migrated?.protocol, "v2");
      assert.strictEqual(result.native?.protocol, "v2");
    }),
  );
});
