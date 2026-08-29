import { makeMutationAtom } from "./mutation.js";

export const createApproveNameMutationAtom = makeMutationAtom(
  "permissions",
  (sdk) => sdk.permissions.approveName,
);
export const createClearNameApprovalMutationAtom = makeMutationAtom(
  "permissions",
  (sdk) => sdk.permissions.clearNameApproval,
);
export const createGrantRegistryRolesMutationAtom = makeMutationAtom(
  "permissions",
  (sdk) => sdk.permissions.grantRegistryRoles,
);
export const createGrantResolverRolesMutationAtom = makeMutationAtom(
  "permissions",
  (sdk) => sdk.permissions.grantResolverRoles,
);
export const createGrantResolverRootRolesMutationAtom = makeMutationAtom(
  "permissions",
  (sdk) => sdk.permissions.grantResolverRootRoles,
);
export const createRevokeRegistryRolesMutationAtom = makeMutationAtom(
  "permissions",
  (sdk) => sdk.permissions.revokeRegistryRoles,
);
export const createRevokeResolverRolesMutationAtom = makeMutationAtom(
  "permissions",
  (sdk) => sdk.permissions.revokeResolverRoles,
);
export const createRevokeResolverRootRolesMutationAtom = makeMutationAtom(
  "permissions",
  (sdk) => sdk.permissions.revokeResolverRootRoles,
);
export const createSetOperatorApprovalMutationAtom = makeMutationAtom(
  "permissions",
  (sdk) => sdk.permissions.setOperatorApproval,
);
export const createSetRecordPermissionsMutationAtom = makeMutationAtom(
  "permissions",
  (sdk) => sdk.permissions.setRecordPermissions,
);
export const createSetResolverDelegateApprovalMutationAtom = makeMutationAtom(
  "permissions",
  (sdk) => sdk.permissions.setResolverDelegateApproval,
);
