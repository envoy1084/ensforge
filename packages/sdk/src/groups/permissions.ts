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
  type EnsforgeConfig,
} from "@ensforge/core";

import { bindAction } from "../internal/bind-action.js";

export const makePermissionsActions = (config: EnsforgeConfig) =>
  Object.freeze({
    approveName: bindAction(config, approveName),
    clearNameApproval: bindAction(config, clearNameApproval),
    grantRegistryRoles: bindAction(config, grantRegistryRoles),
    grantResolverRoles: bindAction(config, grantResolverRoles),
    grantResolverRootRoles: bindAction(config, grantResolverRootRoles),
    revokeRegistryRoles: bindAction(config, revokeRegistryRoles),
    revokeResolverRoles: bindAction(config, revokeResolverRoles),
    revokeResolverRootRoles: bindAction(config, revokeResolverRootRoles),
    setOperatorApproval: bindAction(config, setOperatorApproval),
    setRecordPermissions: bindAction(config, setRecordPermissions),
    setResolverDelegateApproval: bindAction(config, setResolverDelegateApproval),
  });

export type PermissionsActions = ReturnType<typeof makePermissionsActions>;
