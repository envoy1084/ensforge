import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { registryRoles, resolverRoles } from "@ensforge/contracts/v2";

import {
  getNameCapabilities,
  getOperatorApproval,
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
} from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

describe("capability integration", () => {
  it.effect("discovers V1 and V2 registry capabilities", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [v1, wrapped, v2] = yield* Effect.all(
        [
          getRegistryCapabilities.effect(devnet.configs.v1, {
            name: devnet.fixtures.v1.activeUnwrapped.name,
          }),
          getRegistryCapabilities.effect(devnet.configs.v1, {
            name: devnet.fixtures.v1.activeWrapped.name,
          }),
          getRegistryCapabilities.effect(devnet.configs.v2, {
            name: devnet.fixtures.v2.active.name,
          }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.strictEqual(v1.kind, "registry");
      assert.isFalse(v1.permissioned);
      assert.strictEqual(wrapped.kind, "name-wrapper");
      assert.isTrue(wrapped.wrapped);
      assert.strictEqual(v2.protocol, "v2");
      assert.isTrue(v2.permissioned);
      assert.isTrue(v2.tokenized);
      assert.isTrue(v2.temporal);
    }),
  );

  it.effect("discovers resolver profiles, inheritance, absence, and permissions", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const permissionedFixture = devnet.fixtures.permissions.v2.permissionedResolver;
      const [publicResolver, inherited, missing, permissioned] = yield* Effect.all(
        [
          getResolverCapabilities.effect(devnet.configs.v1, {
            name: devnet.fixtures.v1.activeUnwrapped.name,
          }),
          getResolverCapabilities.effect(devnet.configs.v2, {
            name: devnet.fixtures.v2.inheritedResolver.name,
          }),
          getResolverCapabilities.effect(devnet.configs.v2, {
            name: devnet.fixtures.v2.noResolver.name,
          }),
          getResolverCapabilities.effect(devnet.configs.v2, { name: permissionedFixture.name }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.isTrue(publicResolver.profiles.address);
      assert.isTrue(publicResolver.profiles.text);
      assert.isFalse(publicResolver.permissioned);
      assert.isTrue(inherited.inherited);
      assert.isNull(missing.address);
      assert.strictEqual(permissioned.address, permissionedFixture.resolver);
      assert.isTrue(permissioned.permissioned);
      assert.isTrue(permissioned.profiles.data);
    }),
  );

  it.effect("returns discriminated role support and checks V2 registry roles", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.permissions.v2.scopedRole;
      const [v1, roles, allowed, denied] = yield* Effect.all(
        [
          getRegistryRoles.effect(devnet.configs.v1, {
            name: devnet.fixtures.v1.activeUnwrapped.name,
            account: devnet.fixtures.permissions.operator,
          }),
          getRegistryRoles.effect(devnet.configs.v2, {
            name: fixture.name,
            account: devnet.fixtures.permissions.operator,
          }),
          hasRegistryRoles.effect(devnet.configs.v2, {
            name: fixture.name,
            account: devnet.fixtures.permissions.operator,
            roles: registryRoles.setResolver,
          }),
          hasRegistryRoles.effect(devnet.configs.v2, {
            name: fixture.name,
            account: devnet.fixtures.permissions.unauthorized,
            roles: registryRoles.setResolver,
          }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.isFalse(v1.supported);
      assert.strictEqual(v1.reason, "ROLE_BASED_PERMISSIONS_UNSUPPORTED");
      assert.isTrue(roles.supported);
      if (roles.supported) assert.strictEqual(roles.roles & fixture.role, fixture.role);
      assert.isTrue(allowed.supported && allowed.authorized);
      assert.isTrue(denied.supported && !denied.authorized);
    }),
  );

  it.effect("reads exact scoped ENSv2 resolver roles", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.permissions.v2.permissionedResolver;
      const record = { type: "text", key: fixture.textKey } as const;
      const [roles, allowed, denied, unsupported] = yield* Effect.all(
        [
          getResolverRoles.effect(devnet.configs.v2, {
            name: fixture.name,
            account: devnet.fixtures.permissions.operator,
            record,
          }),
          hasResolverRoles.effect(devnet.configs.v2, {
            name: fixture.name,
            account: devnet.fixtures.permissions.operator,
            roles: resolverRoles.setText,
            record,
          }),
          hasResolverRoles.effect(devnet.configs.v2, {
            name: fixture.name,
            account: devnet.fixtures.permissions.unauthorized,
            roles: resolverRoles.setText,
            record,
          }),
          getResolverRoles.effect(devnet.configs.v1, {
            name: devnet.fixtures.v1.activeUnwrapped.name,
            account: devnet.fixtures.permissions.operator,
            record,
          }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.isTrue(roles.supported);
      if (roles.supported) {
        assert.strictEqual(roles.resource, fixture.resource);
        assert.strictEqual(roles.roles & fixture.role, fixture.role);
      }
      assert.isTrue(allowed.supported && allowed.authorized);
      assert.isTrue(denied.supported && !denied.authorized);
      assert.isFalse(unsupported.supported);
    }),
  );

  it.effect("reads V1 and V2 approvals without inventing V2 token approvals", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const operator = devnet.fixtures.permissions.operator;
      const owner = devnet.fixtures.v1.activeUnwrapped.owner;
      const [v1Token, v2Token, v1Operator, v2Operator] = yield* Effect.all(
        [
          getTokenApproval.effect(devnet.configs.v1, {
            name: devnet.fixtures.permissions.v1.tokenApproval.name,
          }),
          getTokenApproval.effect(devnet.configs.v2, { name: devnet.fixtures.v2.active.name }),
          getOperatorApproval.effect(devnet.configs.v1, {
            name: devnet.fixtures.v1.activeWrapped.name,
            owner,
            operator,
          }),
          getOperatorApproval.effect(devnet.configs.v2, {
            name: devnet.fixtures.v2.active.name,
            owner: devnet.fixtures.v2.active.owner,
            operator,
          }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.isTrue(v1Token.supported);
      if (v1Token.supported) assert.strictEqual(v1Token.approved, operator);
      assert.isFalse(v2Token.supported);
      assert.isTrue(
        v1Operator.targets.some((target) => target.kind === "wrapper" && target.approved),
      );
      assert.isTrue(
        v2Operator.targets.some((target) => target.kind === "registry" && target.approved),
      );
    }),
  );

  it.effect("reads resolver delegates and wrapper restrictions", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const operator = devnet.fixtures.permissions.operator;
      const [delegate, wrapper, locked] = yield* Effect.all(
        [
          getResolverDelegateApproval.effect(devnet.configs.v1, {
            name: devnet.fixtures.permissions.v1.resolverDelegate.name,
            owner: devnet.fixtures.v1.activeUnwrapped.owner,
            delegate: operator,
          }),
          getWrapperPermissions.effect(devnet.configs.v1, {
            name: devnet.fixtures.v1.activeWrapped.name,
            account: operator,
          }),
          getWrapperPermissions.effect(devnet.configs.v2, {
            name: devnet.fixtures.migration.migratedLocked.name,
            account: operator,
          }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.isTrue(delegate.supported && delegate.approved);
      assert.isTrue(wrapper.supported);
      if (wrapper.supported && wrapper.protocol === "v1") {
        assert.isTrue(wrapper.operatorApproved);
        assert.isTrue(wrapper.canModify);
      }
      assert.isTrue(locked.supported);
      if (locked.supported) assert.strictEqual(locked.protocol, "v2");
    }),
  );

  it.effect("evaluates semantic record permissions for delegates and scoped roles", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const permissioned = devnet.fixtures.permissions.v2.permissionedResolver;
      const record = { type: "text", key: "avatar" } as const;
      const [v1, v2, denied] = yield* Effect.all(
        [
          getRecordPermissions.effect(devnet.configs.v1, {
            name: devnet.fixtures.permissions.v1.resolverDelegate.name,
            account: devnet.fixtures.permissions.operator,
            records: [record],
          }),
          getRecordPermissions.effect(devnet.configs.v2, {
            name: permissioned.name,
            account: devnet.fixtures.permissions.operator,
            records: [record],
          }),
          getRecordPermissions.effect(devnet.configs.v2, {
            name: permissioned.name,
            account: devnet.fixtures.permissions.unauthorized,
            records: [record],
          }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.strictEqual(v1.records[0]?.source, "resolver-delegate");
      assert.isTrue(v1.records[0]?.authorized);
      assert.strictEqual(v2.records[0]?.source, "resolver-role");
      assert.isTrue(v2.records[0]?.authorized);
      assert.isFalse(denied.records[0]?.authorized);
    }),
  );

  it.effect("routes writes and explains their required authorization", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const operator = devnet.fixtures.permissions.operator;
      const [recordTarget, transferTarget, recordAuthorization, registryAuthorization] =
        yield* Effect.all(
          [
            getWriteTarget.effect(devnet.configs.v2, {
              name: devnet.fixtures.permissions.v2.permissionedResolver.name,
              operation: { type: "text", key: "avatar" },
            }),
            getWriteTarget.effect(devnet.configs.v1, {
              name: devnet.fixtures.v1.activeUnwrapped.name,
              operation: { type: "transfer" },
            }),
            getRequiredAuthorization.effect(devnet.configs.v2, {
              name: devnet.fixtures.permissions.v2.permissionedResolver.name,
              account: operator,
              operation: { type: "text", key: "avatar" },
            }),
            getRequiredAuthorization.effect(devnet.configs.v2, {
              name: devnet.fixtures.permissions.v2.scopedRole.name,
              account: operator,
              operation: { type: "setResolver" },
            }),
          ] as const,
          { concurrency: "unbounded" },
        );

      assert.isTrue(recordTarget.available);
      if (recordTarget.available) assert.strictEqual(recordTarget.kind, "resolver");
      assert.isTrue(transferTarget.available);
      if (transferTarget.available) assert.strictEqual(transferTarget.kind, "registrar");
      assert.isTrue(recordAuthorization.authorized);
      assert.isTrue(registryAuthorization.authorized);
    }),
  );

  it.effect("composes application-oriented name capabilities", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* getNameCapabilities.effect(devnet.configs.v2, {
        name: devnet.fixtures.permissions.v2.permissionedResolver.name,
        account: devnet.fixtures.permissions.operator,
        records: [{ type: "text", key: "avatar" }],
      });

      assert.strictEqual(result.name, devnet.fixtures.permissions.v2.permissionedResolver.name);
      assert.isTrue(result.registry.permissioned);
      assert.isTrue(result.resolver.permissioned);
      assert.isTrue(result.records[0]?.authorized);
    }),
  );
});
