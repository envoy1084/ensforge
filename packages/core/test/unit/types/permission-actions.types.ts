import type { Effect } from "effect";

import { expectTypeOf } from "vitest";

import {
  approveName,
  clearNameApproval,
  grantRegistryRoles,
  grantResolverRoles,
  grantResolverRootRoles,
  revokeRegistryRoles,
  revokeResolverRoles,
  revokeResolverRootRoles,
  setOperatorApproval,
  setRecordPermissions,
  setResolverDelegateApproval,
  type CallExecutionResult,
  type EnsWriteIntent,
  type EnsforgeConfig,
  type SetRecordPermissionsResult,
  type WriteError,
} from "../../../src/index.js";

const config = {} as EnsforgeConfig;
const account = "0x0000000000000000000000000000000000000001";
const name = "example.eth";

expectTypeOf(
  setOperatorApproval.call({ name, target: "registry", operator: account, approved: true }),
).toEqualTypeOf<EnsWriteIntent<CallExecutionResult, WriteError>>();
expectTypeOf(approveName.call({ name, approved: account })).toEqualTypeOf<
  EnsWriteIntent<CallExecutionResult, WriteError>
>();
expectTypeOf(clearNameApproval.call({ name })).toEqualTypeOf<
  EnsWriteIntent<CallExecutionResult, WriteError>
>();
expectTypeOf(
  setResolverDelegateApproval.call({ name, delegate: account, approved: true }),
).toEqualTypeOf<EnsWriteIntent<CallExecutionResult, WriteError>>();
expectTypeOf(grantRegistryRoles.call({ name, account, roles: 1n })).toEqualTypeOf<
  EnsWriteIntent<CallExecutionResult, WriteError>
>();
expectTypeOf(revokeRegistryRoles.call({ name, account, roles: 1n })).toEqualTypeOf<
  EnsWriteIntent<CallExecutionResult, WriteError>
>();
expectTypeOf(
  grantResolverRoles.call({ name, account, record: { type: "text", key: "url" } }),
).toEqualTypeOf<EnsWriteIntent<CallExecutionResult, WriteError>>();
expectTypeOf(
  revokeResolverRoles.call({ name, account, record: { type: "address", coinType: 60n } }),
).toEqualTypeOf<EnsWriteIntent<CallExecutionResult, WriteError>>();
expectTypeOf(grantResolverRootRoles.call({ name, account, roles: 1n })).toEqualTypeOf<
  EnsWriteIntent<CallExecutionResult, WriteError>
>();
expectTypeOf(revokeResolverRootRoles.call({ name, account, roles: 1n })).toEqualTypeOf<
  EnsWriteIntent<CallExecutionResult, WriteError>
>();

const permissions = {
  name,
  account,
  approved: true,
  records: [{ type: "text" as const, key: "url" }],
};
expectTypeOf(setRecordPermissions(config, permissions)).toEqualTypeOf<
  Promise<SetRecordPermissionsResult>
>();
expectTypeOf(setRecordPermissions.effect(config, permissions)).toEqualTypeOf<
  Effect.Effect<SetRecordPermissionsResult, WriteError>
>();
