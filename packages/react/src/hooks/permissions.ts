"use client";

import {
  createApproveNameMutationAtom,
  createClearNameApprovalMutationAtom,
  createGrantRegistryRolesMutationAtom,
  createGrantResolverRolesMutationAtom,
  createGrantResolverRootRolesMutationAtom,
  createRevokeRegistryRolesMutationAtom,
  createRevokeResolverRolesMutationAtom,
  createRevokeResolverRootRolesMutationAtom,
  createSetOperatorApprovalMutationAtom,
  createSetRecordPermissionsMutationAtom,
  createSetResolverDelegateApprovalMutationAtom,
} from "../atoms/permissions.js";
import { makeMutationHook } from "./use-mutation.js";

export const useApproveName = makeMutationHook(createApproveNameMutationAtom);
export const useClearNameApproval = makeMutationHook(createClearNameApprovalMutationAtom);
export const useGrantRegistryRoles = makeMutationHook(createGrantRegistryRolesMutationAtom);
export const useGrantResolverRoles = makeMutationHook(createGrantResolverRolesMutationAtom);
export const useGrantResolverRootRoles = makeMutationHook(createGrantResolverRootRolesMutationAtom);
export const useRevokeRegistryRoles = makeMutationHook(createRevokeRegistryRolesMutationAtom);
export const useRevokeResolverRoles = makeMutationHook(createRevokeResolverRolesMutationAtom);
export const useRevokeResolverRootRoles = makeMutationHook(
  createRevokeResolverRootRolesMutationAtom,
);
export const useSetOperatorApproval = makeMutationHook(createSetOperatorApprovalMutationAtom);
export const useSetRecordPermissions = makeMutationHook(createSetRecordPermissionsMutationAtom);
export const useSetResolverDelegateApproval = makeMutationHook(
  createSetResolverDelegateApprovalMutationAtom,
);
