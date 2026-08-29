import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { zeroAddress } from "viem";

import {
  AuthorizationError,
  getResolver,
  setResolver,
  simulateCalls,
} from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

describe("resolver lifecycle integration", () => {
  it.effect("sets and replaces V1 and V2 resolvers with version-neutral routing", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const v1Name = devnet.fixtures.v1.resolverLifecycle.name;
      const v2Name = devnet.fixtures.v2.resolverLifecycle.name;
      const permissionedResolver = devnet.fixtures.permissions.v2.permissionedResolver.resolver;
      const denied = yield* simulateCalls
        .effect(devnet.configs.v2, {
          calls: [setResolver.call({ name: v2Name, resolver: permissionedResolver })],
          account: devnet.accounts.owner2,
        })
        .pipe(Effect.flip);

      yield* setResolver.effect(devnet.configs.v1, {
        name: v1Name,
        resolver: devnet.deployments.v1.contracts.publicResolver,
      });
      yield* setResolver.effect(devnet.configs.v2, {
        name: v2Name,
        resolver: permissionedResolver,
      });
      const [v1, v2] = yield* Effect.all(
        [
          getResolver.effect(devnet.configs.v1, { name: v1Name }),
          getResolver.effect(devnet.configs.v2, { name: v2Name }),
        ] as const,
        { concurrency: "unbounded" },
      );
      yield* setResolver.effect(devnet.configs.v2, { name: v2Name, resolver: zeroAddress });
      const cleared = yield* getResolver.effect(devnet.configs.v2, { name: v2Name });

      assert.instanceOf(denied, AuthorizationError);
      assert.strictEqual(denied.code, "UNAUTHORIZED");
      assert.strictEqual(v1, devnet.deployments.v1.contracts.publicResolver);
      assert.strictEqual(v2, permissionedResolver);
      assert.isNull(cleared);
    }),
  );
});
