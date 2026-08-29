"use client";

import {
  getNameCapabilitiesAtom,
  getOperatorApprovalAtom,
  getRecordPermissionsAtom,
  getRegistryCapabilitiesAtom,
  getRegistryRolesAtom,
  getRequiredAuthorizationAtom,
  getResolverCapabilitiesAtom,
  getResolverDelegateApprovalAtom,
  getResolverRolesAtom,
  getTokenApprovalAtom,
  getWrapperPermissionsAtom,
  getWriteTargetAtom,
  hasRegistryRolesAtom,
  hasResolverRolesAtom,
} from "../atoms/capabilities.js";
import { makeQueryHook } from "./use-query.js";
import { makeSuspenseQueryHook } from "./use-suspense-query.js";

export const useNameCapabilities = makeQueryHook(getNameCapabilitiesAtom);
export const useNameCapabilitiesSuspense = makeSuspenseQueryHook(getNameCapabilitiesAtom);
export const useOperatorApproval = makeQueryHook(getOperatorApprovalAtom);
export const useOperatorApprovalSuspense = makeSuspenseQueryHook(getOperatorApprovalAtom);
export const useRecordPermissions = makeQueryHook(getRecordPermissionsAtom);
export const useRecordPermissionsSuspense = makeSuspenseQueryHook(getRecordPermissionsAtom);
export const useRegistryCapabilities = makeQueryHook(getRegistryCapabilitiesAtom);
export const useRegistryCapabilitiesSuspense = makeSuspenseQueryHook(getRegistryCapabilitiesAtom);
export const useRegistryRoles = makeQueryHook(getRegistryRolesAtom);
export const useRegistryRolesSuspense = makeSuspenseQueryHook(getRegistryRolesAtom);
export const useRequiredAuthorization = makeQueryHook(getRequiredAuthorizationAtom);
export const useRequiredAuthorizationSuspense = makeSuspenseQueryHook(getRequiredAuthorizationAtom);
export const useResolverCapabilities = makeQueryHook(getResolverCapabilitiesAtom);
export const useResolverCapabilitiesSuspense = makeSuspenseQueryHook(getResolverCapabilitiesAtom);
export const useResolverDelegateApproval = makeQueryHook(getResolverDelegateApprovalAtom);
export const useResolverDelegateApprovalSuspense = makeSuspenseQueryHook(
  getResolverDelegateApprovalAtom,
);
export const useResolverRoles = makeQueryHook(getResolverRolesAtom);
export const useResolverRolesSuspense = makeSuspenseQueryHook(getResolverRolesAtom);
export const useTokenApproval = makeQueryHook(getTokenApprovalAtom);
export const useTokenApprovalSuspense = makeSuspenseQueryHook(getTokenApprovalAtom);
export const useWrapperPermissions = makeQueryHook(getWrapperPermissionsAtom);
export const useWrapperPermissionsSuspense = makeSuspenseQueryHook(getWrapperPermissionsAtom);
export const useWriteTarget = makeQueryHook(getWriteTargetAtom);
export const useWriteTargetSuspense = makeSuspenseQueryHook(getWriteTargetAtom);
export const useHasRegistryRoles = makeQueryHook(hasRegistryRolesAtom);
export const useHasRegistryRolesSuspense = makeSuspenseQueryHook(hasRegistryRolesAtom);
export const useHasResolverRoles = makeQueryHook(hasResolverRolesAtom);
export const useHasResolverRolesSuspense = makeSuspenseQueryHook(hasResolverRolesAtom);
