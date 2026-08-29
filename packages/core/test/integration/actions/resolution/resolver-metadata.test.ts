import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { getAlias, getResolverVersion, readBatch } from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

describe("resolver metadata integration", () => {
  it.effect("reads resolver record versions and reports a missing resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [v1, result] = yield* Effect.all(
        [
          getResolverVersion.effect(devnet.configs.v1, {
            name: devnet.fixtures.records.v1.name,
          }),
          readBatch.effect(devnet.configs.v2, {
            v2: getResolverVersion.request({
              name: devnet.fixtures.permissions.v2.permissionedResolver.name,
            }),
            missing: getResolverVersion.request({ name: devnet.fixtures.v2.noResolver.name }),
          }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.isTrue(result.v2.supported);
      if (!v1.supported) {
        assert.strictEqual(v1.reason, "VERSIONING_UNSUPPORTED");
      }
      if (result.v2.supported) {
        assert.typeOf(result.v2.version, "bigint");
      }
      assert.isFalse(result.missing.supported);
      if (!result.missing.supported) {
        assert.strictEqual(result.missing.reason, "RESOLVER_NOT_FOUND");
      }
    }),
  );

  it.effect("distinguishes Permissioned Resolver aliases from unsupported public resolvers", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [permissioned, publicResolver] = yield* Effect.all(
        [
          getAlias.effect(devnet.configs.v2, {
            name: devnet.fixtures.permissions.v2.permissionedResolver.name,
          }),
          getAlias.effect(devnet.configs.v1, { name: devnet.fixtures.records.v1.name }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.isTrue(permissioned.supported);
      if (permissioned.supported) {
        assert.isNull(permissioned.target);
        assert.strictEqual(permissioned.raw, "0x");
      }
      assert.isFalse(publicResolver.supported);
      if (!publicResolver.supported) {
        assert.strictEqual(publicResolver.reason, "ALIASING_UNSUPPORTED");
      }
    }),
  );
});
