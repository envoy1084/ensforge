import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { registryRoles, resolverRoles } from "@ensforge/contracts/v2";

import {
  approveName,
  AuthorizationError,
  clearNameApproval,
  getResolverDelegateApproval,
  grantRegistryRoles,
  grantResolverRoles,
  grantResolverRootRoles,
  hasRegistryRoles,
  hasResolverRoles,
  revokeRegistryRoles,
  revokeResolverRoles,
  revokeResolverRootRoles,
  RpcError,
  setOperatorApproval,
  setRecordPermissions,
  setResolverDelegateApproval,
  simulateCalls,
} from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

describe("permission writes integration", () => {
  it.effect("prepares explicit operator and V1 token approval targets", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const simulations = yield* Effect.all(
        [
          simulateCalls.effect(devnet.configs.v1, {
            calls: [
              setOperatorApproval.call({
                name: devnet.fixtures.v1.activeUnwrapped.name,
                target: "registry",
                operator: devnet.accounts.owner2,
                approved: true,
              }),
              setOperatorApproval.call({
                name: devnet.fixtures.v1.activeUnwrapped.name,
                target: "registrar",
                operator: devnet.accounts.owner2,
                approved: true,
              }),
              setOperatorApproval.call({
                name: devnet.fixtures.v1.activeWrapped.name,
                target: "wrapper",
                operator: devnet.accounts.owner2,
                approved: true,
              }),
              setOperatorApproval.call({
                name: devnet.fixtures.v1.activeUnwrapped.name,
                target: "resolver",
                operator: devnet.accounts.owner2,
                approved: true,
              }),
            ],
          }),
          simulateCalls.effect(devnet.configs.v1, {
            calls: [
              approveName.call({
                name: devnet.fixtures.v1.activeUnwrapped.name,
                approved: devnet.accounts.owner2,
              }),
              clearNameApproval.call({ name: devnet.fixtures.v1.activeUnwrapped.name }),
              approveName.call({
                name: devnet.fixtures.v1.activeWrapped.name,
                approved: devnet.accounts.owner2,
              }),
            ],
          }),
          simulateCalls.effect(devnet.configs.v2, {
            calls: [
              setOperatorApproval.call({
                name: devnet.fixtures.v2.active.name,
                target: "registry",
                operator: devnet.accounts.owner2,
                approved: true,
              }),
            ],
          }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.lengthOf(simulations[0], 4);
      assert.lengthOf(simulations[1], 3);
      assert.lengthOf(simulations[2], 1);
    }),
  );

  it.effect("grants and revokes node-level Public Resolver delegation", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.permissions.v1.resolverDelegate.name;
      yield* setResolverDelegateApproval.effect(devnet.configs.v1, {
        name,
        delegate: devnet.accounts.owner2,
        approved: true,
      });
      const granted = yield* getResolverDelegateApproval.effect(devnet.configs.v1, {
        name,
        owner: devnet.accounts.owner,
        delegate: devnet.accounts.owner2,
      });
      yield* setResolverDelegateApproval.effect(devnet.configs.v1, {
        name,
        delegate: devnet.accounts.owner2,
        approved: false,
      });
      const revoked = yield* getResolverDelegateApproval.effect(devnet.configs.v1, {
        name,
        owner: devnet.accounts.owner,
        delegate: devnet.accounts.owner2,
      });
      const v2Name = devnet.fixtures.permissions.v2.resolverDelegate.name;
      yield* setResolverDelegateApproval.effect(devnet.configs.v2, {
        name: v2Name,
        delegate: devnet.accounts.owner2,
        approved: true,
      });
      const v2Granted = yield* getResolverDelegateApproval.effect(devnet.configs.v2, {
        name: v2Name,
        owner: devnet.accounts.owner,
        delegate: devnet.accounts.owner2,
      });
      yield* setResolverDelegateApproval.effect(devnet.configs.v2, {
        name: v2Name,
        delegate: devnet.accounts.owner2,
        approved: false,
      });

      assert.isTrue(granted.supported && granted.approved);
      assert.isTrue(revoked.supported && !revoked.approved);
      assert.isTrue(v2Granted.supported && v2Granted.approved);
    }),
  );

  it.effect("grants and revokes ENSv2 registry roles including admin roles", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.v2.active.name;
      const roles = registryRoles.setUri;
      yield* grantRegistryRoles.effect(devnet.configs.v2, {
        name,
        account: devnet.accounts.owner2,
        roles,
      });
      const granted = yield* hasRegistryRoles.effect(devnet.configs.v2, {
        name,
        account: devnet.accounts.owner2,
        roles,
      });
      yield* revokeRegistryRoles.effect(devnet.configs.v2, {
        name,
        account: devnet.accounts.owner2,
        roles,
      });
      const revoked = yield* hasRegistryRoles.effect(devnet.configs.v2, {
        name,
        account: devnet.accounts.owner2,
        roles,
      });
      const adminDenied = yield* simulateCalls
        .effect(devnet.configs.v2, {
          calls: [
            grantRegistryRoles.call({
              name,
              account: devnet.accounts.owner2,
              roles: registryRoles.setUriAdmin,
            }),
          ],
        })
        .pipe(Effect.flip);

      assert.isTrue(granted.supported && granted.authorized);
      assert.isTrue(revoked.supported && !revoked.authorized);
      assert.isDefined(adminDenied);
    }),
  );

  it.effect("grants exact resolver resources and observes root-role fallback", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.permissions.v2.permissionedResolver.name;
      const record = { type: "text" as const, key: "com.ensforge.phase13.exact" };
      yield* grantResolverRoles.effect(devnet.configs.v2, {
        name,
        account: devnet.accounts.owner2,
        record,
      });
      const exact = yield* hasResolverRoles.effect(devnet.configs.v2, {
        name,
        account: devnet.accounts.owner2,
        roles: resolverRoles.setText,
        record,
      });
      yield* revokeResolverRoles.effect(devnet.configs.v2, {
        name,
        account: devnet.accounts.owner2,
        record,
      });
      const exactRevoked = yield* hasResolverRoles.effect(devnet.configs.v2, {
        name,
        account: devnet.accounts.owner2,
        roles: resolverRoles.setText,
        record,
      });
      yield* grantResolverRootRoles.effect(devnet.configs.v2, {
        name,
        account: devnet.accounts.owner2,
        roles: resolverRoles.setAbi,
      });
      const root = yield* hasResolverRoles.effect(devnet.configs.v2, {
        name,
        account: devnet.accounts.owner2,
        roles: resolverRoles.setAbi,
        record: { type: "abi", contentType: 1n },
      });
      yield* revokeResolverRootRoles.effect(devnet.configs.v2, {
        name,
        account: devnet.accounts.owner2,
        roles: resolverRoles.setAbi,
      });
      const rootRevoked = yield* hasResolverRoles.effect(devnet.configs.v2, {
        name,
        account: devnet.accounts.owner2,
        roles: resolverRoles.setAbi,
        record: { type: "abi", contentType: 1n },
      });

      assert.isTrue(exact.supported && exact.authorized);
      assert.isTrue(exactRevoked.supported && !exactRevoked.authorized);
      assert.isTrue(root.supported && root.authorized);
      assert.isTrue(rootRevoked.supported && !rootRevoked.authorized);
    }),
  );

  it.effect("routes version-neutral record permissions without silent widening", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const publicName = devnet.fixtures.permissions.v1.resolverDelegate.name;
      const permissionedName = devnet.fixtures.permissions.v2.permissionedResolver.name;
      const denied = yield* setRecordPermissions
        .effect(devnet.configs.v1, {
          name: publicName,
          account: devnet.accounts.owner2,
          records: [{ type: "text", key: "url" }],
          approved: true,
        })
        .pipe(Effect.flip);
      const publicResult = yield* setRecordPermissions.effect(devnet.configs.v1, {
        name: publicName,
        account: devnet.accounts.owner2,
        records: [{ type: "text", key: "url" }],
        approved: true,
        allowScopeWidening: true,
      });
      const exactResult = yield* setRecordPermissions.effect(devnet.configs.v2, {
        name: permissionedName,
        account: devnet.accounts.owner2,
        records: [
          { type: "text", key: "com.ensforge.phase13.workflow" },
          { type: "address", coinType: 60n },
        ],
        approved: true,
        mode: "sequential",
      });
      const [text, address] = yield* Effect.all(
        [
          hasResolverRoles.effect(devnet.configs.v2, {
            name: permissionedName,
            account: devnet.accounts.owner2,
            roles: resolverRoles.setText,
            record: { type: "text", key: "com.ensforge.phase13.workflow" },
          }),
          hasResolverRoles.effect(devnet.configs.v2, {
            name: permissionedName,
            account: devnet.accounts.owner2,
            roles: resolverRoles.setAddr,
            record: { type: "address", coinType: 60n },
          }),
        ] as const,
        { concurrency: "unbounded" },
      );
      yield* setRecordPermissions.effect(devnet.configs.v2, {
        name: permissionedName,
        account: devnet.accounts.owner2,
        records: [
          { type: "text", key: "com.ensforge.phase13.workflow" },
          { type: "address", coinType: 60n },
        ],
        approved: false,
        mode: "sequential",
      });
      yield* setRecordPermissions.effect(devnet.configs.v1, {
        name: publicName,
        account: devnet.accounts.owner2,
        records: [{ type: "text", key: "url" }],
        approved: false,
        allowScopeWidening: true,
      });

      assert.instanceOf(denied, AuthorizationError);
      assert.strictEqual(denied.code, "SCOPE_WIDENING_REQUIRED");
      assert.strictEqual(publicResult.model, "public-resolver-delegate");
      assert.isTrue(publicResult.widened);
      assert.strictEqual(exactResult.model, "permissioned-resolver-roles");
      if (exactResult.model === "permissioned-resolver-roles") {
        assert.lengthOf(exactResult.permissions, 2);
      }
      assert.isTrue(text.supported && text.authorized);
      assert.isTrue(address.supported && address.authorized);
    }),
  );

  it.effect("rejects unauthorized permission administration", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const denied = yield* simulateCalls
        .effect(devnet.configs.v2, {
          calls: [
            grantResolverRoles.call({
              name: devnet.fixtures.permissions.v2.permissionedResolver.name,
              account: devnet.accounts.unauthorized,
              record: { type: "text", key: "com.ensforge.phase13.denied" },
            }),
          ],
          account: devnet.accounts.owner2,
        })
        .pipe(Effect.flip);

      assert.instanceOf(denied, RpcError);
    }),
  );
});
