import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { getResolver, readBatch } from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

describe("getResolver integration", () => {
  it.effect("discovers a v1 resolver and the v2 protocol resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [legacy, migrated, nested] = yield* Effect.all(
        [
          getResolver.effect(devnet.configs.v1, {
            name: devnet.fixtures.v1.activeUnwrapped.name,
          }),
          getResolver.effect(devnet.configs.v2, {
            name: devnet.fixtures.migration.migratedLocked.name,
          }),
          getResolver.effect(devnet.configs.v2, {
            name: devnet.fixtures.v2.nestedOwnResolver.name,
          }),
        ],
        { concurrency: "unbounded" },
      );

      assert.strictEqual(legacy, devnet.fixtures.v1.activeUnwrapped.resolver);
      assert.strictEqual(migrated, devnet.fixtures.migration.migratedLocked.resolver);
      assert.strictEqual(nested, devnet.fixtures.v2.nestedOwnResolver.resolver);
    }),
  );

  it.effect("discovers inherited and mirrored resolvers", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [parent, inherited, mirrored] = yield* Effect.all(
        [
          getResolver.effect(devnet.configs.v2, { name: "ens.eth" }),
          getResolver.effect(devnet.configs.v2, {
            name: devnet.fixtures.v2.inheritedResolver.name,
          }),
          getResolver.effect(devnet.configs.v2, {
            name: devnet.fixtures.migration.mirroredChild.name,
          }),
        ],
        { concurrency: "unbounded" },
      );

      assert.isNotNull(parent);
      assert.strictEqual(inherited, parent);
      assert.strictEqual(mirrored, devnet.deployments.v2.migration.ensV1Resolver);
    }),
  );

  it.effect("distinguishes parent fallback from a missing resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [legacy, native, available] = yield* Effect.all(
        [
          getResolver.effect(devnet.configs.v1, { name: devnet.fixtures.v1.noResolver.name }),
          getResolver.effect(devnet.configs.v2, { name: devnet.fixtures.v2.noResolver.name }),
          getResolver.effect(devnet.configs.v2, { name: devnet.fixtures.v2.available.name }),
        ],
        { concurrency: "unbounded" },
      );

      assert.strictEqual(legacy, devnet.deployments.v2.contracts.ensV2Resolver);
      assert.isNull(native);
      assert.isNull(available);
    }),
  );

  it.effect("executes prepared resolver requests through one semantic batch", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const inheritedResolver = yield* getResolver.effect(devnet.configs.v2, { name: "ens.eth" });
      const result = yield* readBatch.effect(devnet.configs.v2, {
        inherited: getResolver.request({ name: devnet.fixtures.v2.inheritedResolver.name }),
        migrated: getResolver.request({ name: devnet.fixtures.migration.migratedLocked.name }),
        parentFallback: getResolver.request({ name: devnet.fixtures.v2.noResolver.name }),
      });

      assert.isNotNull(inheritedResolver);
      assert.strictEqual(result.inherited, inheritedResolver);
      assert.strictEqual(result.migrated, devnet.fixtures.migration.migratedLocked.resolver);
      assert.isNull(result.parentFallback);
    }),
  );
});
