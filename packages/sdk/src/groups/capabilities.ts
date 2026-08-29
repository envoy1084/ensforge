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
  type EnsforgeConfig,
} from "@ensforge/core";

import { bindAction } from "../internal/bind-action.js";

export const makeCapabilitiesActions = (config: EnsforgeConfig) =>
  Object.freeze({
    getNameCapabilities: bindAction(config, getNameCapabilities),
    getOperatorApproval: bindAction(config, getOperatorApproval),
    getRecordPermissions: bindAction(config, getRecordPermissions),
    getRegistryCapabilities: bindAction(config, getRegistryCapabilities),
    getRegistryRoles: bindAction(config, getRegistryRoles),
    getRequiredAuthorization: bindAction(config, getRequiredAuthorization),
    getResolverCapabilities: bindAction(config, getResolverCapabilities),
    getResolverDelegateApproval: bindAction(config, getResolverDelegateApproval),
    getResolverRoles: bindAction(config, getResolverRoles),
    getTokenApproval: bindAction(config, getTokenApproval),
    getWrapperPermissions: bindAction(config, getWrapperPermissions),
    getWriteTarget: bindAction(config, getWriteTarget),
    hasRegistryRoles: bindAction(config, hasRegistryRoles),
    hasResolverRoles: bindAction(config, hasResolverRoles),
  });

export type CapabilitiesActions = ReturnType<typeof makeCapabilitiesActions>;
