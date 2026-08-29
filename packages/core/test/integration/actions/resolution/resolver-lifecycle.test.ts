import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { zeroAddress } from "viem";

import {
  AuthorizationError,
  createResolver,
  getOrCreateResolver,
  getResolver,
  getResolverCapabilities,
  getText,
  predictResolverAddress,
  setResolver,
  setResolverAndRecords,
  simulateCalls,
  upgradeResolver,
  WritePlanError,
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

  it.effect("predicts and deploys a standard Permissioned Resolver proxy", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.v2.resolverLifecycle.name;
      const parameters = { salt: 12_001n } as const;
      const predicted = yield* predictResolverAddress.effect(devnet.configs.v2, parameters);
      const created = yield* createResolver.effect(devnet.configs.v2, parameters);

      yield* setResolver.effect(devnet.configs.v2, { name, resolver: created.resolver });
      const capabilities = yield* getResolverCapabilities.effect(devnet.configs.v2, { name });
      yield* setResolver.effect(devnet.configs.v2, { name, resolver: zeroAddress });

      assert.strictEqual(created.status, "deployed");
      assert.strictEqual(created.resolver, predicted);
      assert.strictEqual(
        created.implementation,
        devnet.deployments.v2.implementations.permissionedResolver,
      );
      assert.strictEqual(created.factory, devnet.deployments.v2.contracts.verifiableFactory);
      assert.isTrue(capabilities.permissioned);
    }),
  );

  it.effect("reuses compatible resolvers and upgrades Permissioned Resolver proxies", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const v1Name = devnet.fixtures.v1.resolverLifecycle.name;
      const v2Name = devnet.fixtures.v2.resolverLifecycle.name;

      yield* setResolver.effect(devnet.configs.v1, {
        name: v1Name,
        resolver: devnet.deployments.v1.contracts.publicResolver,
      });
      yield* setResolver.effect(devnet.configs.v2, { name: v2Name, resolver: zeroAddress });

      const v1 = yield* getOrCreateResolver.effect(devnet.configs.v1, { name: v1Name });
      const v2Public = yield* getOrCreateResolver.effect(devnet.configs.v2, {
        name: devnet.fixtures.v2.active.name,
      });
      const deployed = yield* getOrCreateResolver.effect(devnet.configs.v2, {
        name: v2Name,
        salt: 12_002n,
      });
      yield* setResolver.effect(devnet.configs.v2, {
        name: v2Name,
        resolver: deployed.resolver,
      });
      const existing = yield* getOrCreateResolver.effect(devnet.configs.v2, { name: v2Name });
      const current = yield* upgradeResolver.effect(devnet.configs.v2, { name: v2Name });
      const denied = yield* simulateCalls
        .effect(devnet.configs.v2, {
          calls: [upgradeResolver.call({ name: v2Name, force: true })],
          account: devnet.accounts.owner2,
        })
        .pipe(Effect.flip);
      const upgraded = yield* upgradeResolver.effect(devnet.configs.v2, {
        name: v2Name,
        force: true,
      });
      yield* setResolver.effect(devnet.configs.v2, { name: v2Name, resolver: zeroAddress });

      assert.strictEqual(v1.status, "existing");
      assert.strictEqual(v1.protocol, "v1");
      assert.strictEqual(v2Public.status, "existing");
      assert.strictEqual(v2Public.resolver, devnet.deployments.v2.contracts.publicResolver);
      assert.strictEqual(deployed.status, "deployed");
      assert.strictEqual(existing.status, "existing");
      assert.strictEqual(existing.resolver, deployed.resolver);
      assert.strictEqual(current.status, "current");
      assert.instanceOf(denied, AuthorizationError);
      assert.strictEqual(denied.code, "UNAUTHORIZED");
      assert.strictEqual(upgraded.status, "upgraded");
      assert.strictEqual(upgraded.resolver, deployed.resolver);
    }),
  );

  it.effect("stages resolver deployment, attachment, and record writes with resumption", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const v1Name = devnet.fixtures.v1.resolverLifecycle.name;
      const v2Name = devnet.fixtures.v2.resolverLifecycle.name;
      const v1 = yield* setResolverAndRecords.effect(devnet.configs.v1, {
        name: v1Name,
        records: [{ type: "text", key: "com.ensforge.lifecycle", value: "v1" }],
      });
      const parameters = {
        name: v2Name,
        salt: 12_003n,
        records: [{ type: "text" as const, key: "com.ensforge.lifecycle", value: "v2" }],
      };
      const deployed = yield* setResolverAndRecords.effect(devnet.configs.v2, parameters);
      const partial = {
        ...deployed,
        write: {
          ...deployed.write,
          status: "partial" as const,
          completedStages: deployed.write.completedStages.slice(0, 1),
          currentStage: "set-resolver",
        },
      };
      const resumed = yield* setResolverAndRecords.effect(devnet.configs.v2, {
        ...parameters,
        resume: partial,
      });
      const mismatched = yield* setResolverAndRecords
        .effect(devnet.configs.v2, {
          ...parameters,
          records: [{ type: "text", key: "com.ensforge.lifecycle", value: "different" }],
          resume: resumed,
        })
        .pipe(Effect.flip);
      const reused = yield* setResolverAndRecords.effect(devnet.configs.v2, {
        name: v2Name,
        records: [{ type: "text", key: "com.ensforge.lifecycle", value: "v2-updated" }],
      });
      const [resolver, text] = yield* Effect.all(
        [
          getResolver.effect(devnet.configs.v2, { name: v2Name }),
          getText.effect(devnet.configs.v2, {
            name: v2Name,
            key: "com.ensforge.lifecycle",
          }),
        ] as const,
        { concurrency: "unbounded" },
      );
      yield* setResolver.effect(devnet.configs.v2, { name: v2Name, resolver: zeroAddress });

      assert.strictEqual(v1.resolverSource, "existing");
      assert.lengthOf(v1.write.completedStages, 1);
      assert.strictEqual(deployed.resolverSource, "deployed");
      assert.deepEqual(
        deployed.write.completedStages.map((stage) => stage.id),
        ["create-resolver", "set-resolver", "set-records"],
      );
      assert.strictEqual(resumed.write.status, "completed");
      assert.lengthOf(resumed.write.completedStages, 3);
      assert.instanceOf(mismatched, WritePlanError);
      assert.strictEqual(mismatched.code, "INVALID_CALL_PLAN");
      assert.strictEqual(reused.resolverSource, "existing");
      assert.lengthOf(reused.write.completedStages, 1);
      assert.strictEqual(resolver, deployed.resolver);
      assert.strictEqual(text.value, "v2-updated");
    }),
  );

  it.effect("replaces an inherited resolver with a directly attached resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.v2.inheritedResolver.name;
      const inherited = yield* getResolverCapabilities.effect(devnet.configs.v2, { name });
      const replaced = yield* setResolverAndRecords.effect(devnet.configs.v2, {
        name,
        salt: 12_004n,
        records: [{ type: "text", key: "com.ensforge.lifecycle", value: "replaced" }],
      });
      const attached = yield* getResolverCapabilities.effect(devnet.configs.v2, { name });
      yield* setResolver.effect(devnet.configs.v2, { name, resolver: zeroAddress });

      assert.isTrue(inherited.inherited);
      assert.strictEqual(replaced.resolverSource, "deployed");
      assert.lengthOf(replaced.write.completedStages, 3);
      assert.isFalse(attached.inherited);
      assert.strictEqual(attached.address, replaced.resolver);
    }),
  );
});
