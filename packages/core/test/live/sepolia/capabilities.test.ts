import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { registryRoles, resolverRoles } from "@ensforge/contracts/v2";

import {
  getNameCapabilities,
  getOperatorApproval,
  getOwner,
  getRecordPermissions,
  getRegistryCapabilities,
  getRegistryRoles,
  getRequiredAuthorization,
  getResolverCapabilities,
  getResolverDelegateApproval,
  getResolverRoles,
  getTokenApproval,
  getWrapperPermissions,
  getWriteTarget,
  hasRegistryRoles,
  hasResolverRoles,
} from "../../../src/index.js";
import { sepoliaConfig, sepoliaFixtureAccounts, sepoliaNames } from "../setup/sepolia.js";

describe("Sepolia V1 and V2 capabilities", () => {
  it.effect("discovers registry and resolver capabilities across both protocols", () =>
    Effect.gen(function* () {
      const [v1Registry, v1Resolver, v2Registry, v2Resolver, inherited, bare] = yield* Effect.all(
        [
          getRegistryCapabilities.effect(sepoliaConfig, { name: sepoliaNames.v1.reserved }),
          getResolverCapabilities.effect(sepoliaConfig, { name: sepoliaNames.v1.resolverProfile }),
          getRegistryCapabilities.effect(sepoliaConfig, { name: sepoliaNames.v2.profile }),
          getResolverCapabilities.effect(sepoliaConfig, { name: sepoliaNames.v2.permissioned }),
          getResolverCapabilities.effect(sepoliaConfig, { name: sepoliaNames.v2.inherited }),
          getResolverCapabilities.effect(sepoliaConfig, { name: sepoliaNames.v2.bareRoot }),
        ] as const,
        { concurrency: 3 },
      );

      assert.strictEqual(v1Registry.protocol, "v1");
      assert.isFalse(v1Registry.permissioned);
      assert.isNotNull(v1Resolver.address);
      assert.isFalse(v1Resolver.permissioned);
      assert.strictEqual(v2Registry.protocol, "v2");
      assert.isTrue(v2Registry.permissioned);
      assert.isTrue(v2Registry.temporal);
      assert.isTrue(v2Resolver.permissioned);
      assert.isTrue(v2Resolver.profiles.data);
      assert.isTrue(inherited.inherited);
      assert.isNull(bare.address);
    }),
  );

  it.effect("reads seeded registry and resolver roles", () =>
    Effect.gen(function* () {
      const operator = sepoliaFixtureAccounts.operator;
      const record = { type: "text", key: "description" } as const;
      const [registry, registryAllowed, resolver, resolverAllowed, v1] = yield* Effect.all(
        [
          getRegistryRoles.effect(sepoliaConfig, {
            name: sepoliaNames.v2.profile,
            account: operator,
          }),
          hasRegistryRoles.effect(sepoliaConfig, {
            name: sepoliaNames.v2.profile,
            account: operator,
            roles: registryRoles.setResolver,
          }),
          getResolverRoles.effect(sepoliaConfig, {
            name: sepoliaNames.v2.permissioned,
            account: operator,
            record,
          }),
          hasResolverRoles.effect(sepoliaConfig, {
            name: sepoliaNames.v2.permissioned,
            account: operator,
            roles: resolverRoles.setText,
            record,
          }),
          getRegistryRoles.effect(sepoliaConfig, {
            name: sepoliaNames.v1.reserved,
            account: operator,
          }),
        ] as const,
        { concurrency: 3 },
      );

      assert.isTrue(registry.supported);
      if (registry.supported)
        assert.strictEqual(registry.roles & registryRoles.setResolver, registryRoles.setResolver);
      assert.isTrue(registryAllowed.supported && registryAllowed.authorized);
      assert.isTrue(resolver.supported);
      if (resolver.supported)
        assert.strictEqual(resolver.roles & resolverRoles.setText, resolverRoles.setText);
      assert.isTrue(resolverAllowed.supported && resolverAllowed.authorized);
      assert.isFalse(v1.supported);
    }),
  );

  it.effect("reads seeded approvals and semantic record permissions", () =>
    Effect.gen(function* () {
      const operator = sepoliaFixtureAccounts.operator;
      const owner = yield* getOwner.effect(sepoliaConfig, { name: sepoliaNames.v2.profile });
      if (owner?.owner === null || owner === null) {
        return yield* Effect.die(new Error("Sepolia profile has no owner"));
      }

      const [operatorApproval, delegate, permissions, denied, v1Token, v2Token] = yield* Effect.all(
        [
          getOperatorApproval.effect(sepoliaConfig, {
            name: sepoliaNames.v2.profile,
            owner: owner.owner,
            operator,
          }),
          getResolverDelegateApproval.effect(sepoliaConfig, {
            name: sepoliaNames.v2.dns,
            owner: owner.owner,
            delegate: operator,
          }),
          getRecordPermissions.effect(sepoliaConfig, {
            name: sepoliaNames.v2.permissioned,
            account: operator,
            records: [
              { type: "text", key: "description" },
              { type: "address", coinType: 60n },
            ],
          }),
          getRecordPermissions.effect(sepoliaConfig, {
            name: sepoliaNames.v2.permissioned,
            account: sepoliaFixtureAccounts.secondary,
            records: [{ type: "text", key: "description" }],
          }),
          getTokenApproval.effect(sepoliaConfig, { name: sepoliaNames.v1.wrapped }),
          getTokenApproval.effect(sepoliaConfig, { name: sepoliaNames.v2.profile }),
        ] as const,
        { concurrency: 3 },
      );

      assert.isTrue(
        operatorApproval.targets.some(
          ({ kind, supported, approved }) => kind === "registry" && supported && approved,
        ),
      );
      assert.isTrue(delegate.supported && delegate.approved);
      assert.isTrue(
        permissions.records.every(({ authorization }) => authorization.status === "authorized"),
      );
      assert.strictEqual(denied.records[0]?.authorization.status, "unauthorized");
      assert.isTrue(v1Token.supported);
      assert.isFalse(v2Token.supported);
    }),
  );

  it.effect("explains write targets and authorization without submitting transactions", () =>
    Effect.gen(function* () {
      const operator = sepoliaFixtureAccounts.operator;
      const [recordTarget, registryTarget, recordAuthorization, registryAuthorization, summary] =
        yield* Effect.all(
          [
            getWriteTarget.effect(sepoliaConfig, {
              name: sepoliaNames.v2.permissioned,
              operation: { type: "text", key: "description" },
            }),
            getWriteTarget.effect(sepoliaConfig, {
              name: sepoliaNames.v2.profile,
              operation: { type: "setResolver" },
            }),
            getRequiredAuthorization.effect(sepoliaConfig, {
              name: sepoliaNames.v2.permissioned,
              account: operator,
              operation: { type: "text", key: "description" },
            }),
            getRequiredAuthorization.effect(sepoliaConfig, {
              name: sepoliaNames.v2.profile,
              account: operator,
              operation: { type: "setResolver" },
            }),
            getNameCapabilities.effect(sepoliaConfig, {
              name: sepoliaNames.v2.permissioned,
              account: operator,
              records: [{ type: "text", key: "description" }],
            }),
          ] as const,
          { concurrency: 3 },
        );

      assert.isTrue(recordTarget.available);
      if (recordTarget.available) assert.strictEqual(recordTarget.kind, "resolver");
      assert.isTrue(registryTarget.available);
      assert.strictEqual(recordAuthorization.authorization.status, "authorized");
      assert.strictEqual(registryAuthorization.authorization.status, "authorized");
      assert.strictEqual(summary.records[0]?.authorization.status, "authorized");
      assert.isTrue(summary.registry.permissioned);
      assert.isTrue(summary.resolver.permissioned);
    }),
  );

  it.effect("reports wrapper permissions for a V1 wrapped name and a V2 registry", () =>
    Effect.gen(function* () {
      const account = sepoliaFixtureAccounts.operator;
      const [v1, v2] = yield* Effect.all(
        [
          getWrapperPermissions.effect(sepoliaConfig, { name: sepoliaNames.v1.wrapped, account }),
          getWrapperPermissions.effect(sepoliaConfig, { name: sepoliaNames.v2.profile, account }),
        ] as const,
        { concurrency: 2 },
      );

      assert.isTrue(v1.supported);
      if (v1.supported) assert.strictEqual(v1.protocol, "v1");
      assert.isFalse(v2.supported);
      if (!v2.supported) {
        assert.strictEqual(v2.protocol, "v2");
        assert.strictEqual(v2.reason, "NAME_NOT_WRAPPED");
      }
    }),
  );
});
