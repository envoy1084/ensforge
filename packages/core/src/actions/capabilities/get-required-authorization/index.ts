import { Effect } from "effect";

import { registryRoles } from "@ensforge/contracts/v2";

import { defineReadAction } from "../../../action/read-request.js";
import type { EnsforgeConfig } from "../../../config/config.js";
import { isResolverRecord } from "../../../internal/capabilities/resolver-resource.js";
import { executeRead } from "../../../internal/read/execute-read.js";
import type { EthereumAddress } from "../../../schemas/identity.js";
import { getManager } from "../../name/get-manager/index.js";
import { getOperatorApproval } from "../get-operator-approval/index.js";
import { getRecordPermissions } from "../get-record-permissions/index.js";
import { getTokenApproval } from "../get-token-approval/index.js";
import { getWrapperPermissions } from "../get-wrapper-permissions/index.js";
import { getWriteTarget } from "../get-write-target/index.js";
import { hasRegistryRoles } from "../has-registry-roles/index.js";
import type {
  AuthorizationRequirement,
  CapabilityError,
  NameCapabilityParameters,
  RequiredAuthorizationResult,
  WriteOperation,
} from "../types.js";

export type GetRequiredAuthorizationParameters = NameCapabilityParameters & {
  readonly account: EthereumAddress;
  readonly operation: WriteOperation;
};

const registryRoleFor = (operation: WriteOperation): bigint | null => {
  switch (operation.type) {
    case "setResolver":
      return registryRoles.setResolver;
    case "createSubname":
      return registryRoles.registrar;
    case "setExpiry":
      return registryRoles.renew;
    default:
      return null;
  }
};

const requirementFromRecordSource = (
  source: "owner" | "operator-approval" | "resolver-delegate" | "resolver-role" | "none",
  roles: bigint,
  resource: bigint | null,
): AuthorizationRequirement => {
  switch (source) {
    case "owner":
      return { kind: "owner" };
    case "operator-approval":
      return { kind: "operator-approval" };
    case "resolver-delegate":
      return { kind: "resolver-delegate" };
    case "resolver-role":
      return { kind: "resolver-role", roles, resource: resource ?? 0n };
    case "none":
      return resource === null
        ? { kind: "resolver-delegate" }
        : { kind: "resolver-role", roles, resource };
  }
};

const getRequiredAuthorizationEffect = Effect.fn("ensforge.getRequiredAuthorization")(function* (
  config: EnsforgeConfig,
  parameters: GetRequiredAuthorizationParameters,
) {
  return yield* executeRead(
    config,
    parameters,
    Effect.gen(function* () {
      const target = yield* getWriteTarget.effect(config, parameters);
      if (!target.available) {
        return {
          account: parameters.account,
          operation: parameters.operation,
          target,
          authorized: false,
          requirement: { kind: "unsupported" },
          blockers: [target.reason],
        } as const satisfies RequiredAuthorizationResult;
      }

      if (target.kind === "resolver") {
        if (!isResolverRecord(parameters.operation)) {
          return {
            account: parameters.account,
            operation: parameters.operation,
            target,
            authorized: false,
            requirement: { kind: "unsupported" },
            blockers: ["OPERATION_UNSUPPORTED"],
          } as const satisfies RequiredAuthorizationResult;
        }
        const permissions = yield* getRecordPermissions.effect(config, {
          ...parameters,
          records: [parameters.operation],
        });
        const permission = permissions.records[0];
        if (permission === undefined) {
          return {
            account: parameters.account,
            operation: parameters.operation,
            target,
            authorized: false,
            requirement: { kind: "unsupported" },
            blockers: ["OPERATION_UNSUPPORTED"],
          } as const satisfies RequiredAuthorizationResult;
        }
        return {
          account: parameters.account,
          operation: parameters.operation,
          target,
          authorized: permission.authorized,
          requirement: permission.supported
            ? requirementFromRecordSource(
                permission.source,
                permission.requiredRole,
                permission.resource,
              )
            : { kind: "unsupported" },
          blockers: permission.supported ? [] : ["OPERATION_UNSUPPORTED"],
        } as const satisfies RequiredAuthorizationResult;
      }

      if (target.kind === "name-wrapper") {
        const wrapper = yield* getWrapperPermissions.effect(config, parameters);
        if (!wrapper.supported || wrapper.protocol !== "v1") {
          return {
            account: parameters.account,
            operation: parameters.operation,
            target,
            authorized: false,
            requirement: { kind: "wrapper-permission" },
            blockers: ["OPERATION_UNSUPPORTED"],
          } as const satisfies RequiredAuthorizationResult;
        }
        const fuseAllows =
          parameters.operation.type === "setResolver"
            ? wrapper.canSetResolver
            : parameters.operation.type === "createSubname"
              ? wrapper.canCreateSubname
              : parameters.operation.type === "transfer"
                ? wrapper.canTransfer
                : true;
        return {
          account: parameters.account,
          operation: parameters.operation,
          target,
          authorized: wrapper.canModify && fuseAllows,
          requirement: { kind: "wrapper-permission" },
          blockers: fuseAllows ? [] : ["WRAPPER_FUSE"],
        } as const satisfies RequiredAuthorizationResult;
      }

      const manager = yield* getManager.effect(config, parameters);
      const ownerAuthorized = manager?.toLowerCase() === parameters.account.toLowerCase();
      const approvals =
        manager === null
          ? null
          : yield* getOperatorApproval.effect(config, {
              ...parameters,
              owner: manager,
              operator: parameters.account,
            });
      const targetKind = target.kind === "registrar" ? "registrar" : "registry";
      const operatorAuthorized =
        approvals?.targets.some((approval) => approval.kind === targetKind && approval.approved) ??
        false;
      const tokenApproval =
        target.kind === "registrar" ? yield* getTokenApproval.effect(config, parameters) : null;
      const tokenAuthorized =
        tokenApproval?.supported === true &&
        tokenApproval.approved?.toLowerCase() === parameters.account.toLowerCase();
      const role = target.protocol === "v2" ? registryRoleFor(parameters.operation) : null;
      const roleResult =
        role === null
          ? null
          : yield* hasRegistryRoles.effect(config, { ...parameters, roles: role });
      const roleAuthorized = roleResult?.supported === true && roleResult.authorized;
      const authorized = ownerAuthorized || operatorAuthorized || tokenAuthorized || roleAuthorized;
      const requirement: AuthorizationRequirement = ownerAuthorized
        ? { kind: "owner" }
        : operatorAuthorized
          ? { kind: "operator-approval" }
          : tokenAuthorized
            ? { kind: "token-approval" }
            : roleResult?.supported === true
              ? {
                  kind: "registry-role",
                  roles: roleResult.roles,
                  resource: roleResult.resource,
                }
              : { kind: "owner" };
      return {
        account: parameters.account,
        operation: parameters.operation,
        target,
        authorized,
        requirement,
        blockers: [],
      } satisfies RequiredAuthorizationResult;
    }),
  );
});

export const getRequiredAuthorization = defineReadAction<
  GetRequiredAuthorizationParameters,
  RequiredAuthorizationResult,
  CapabilityError
>(getRequiredAuthorizationEffect);

export type {
  AuthorizationRequirement,
  CapabilityError as GetRequiredAuthorizationError,
  RequiredAuthorizationResult,
} from "../types.js";
