import { makeQueryAtom } from "./query.js";

export const getNameCapabilitiesAtom = makeQueryAtom(
  "capabilities",
  (sdk) => sdk.capabilities.getNameCapabilities,
);
export const getOperatorApprovalAtom = makeQueryAtom(
  "capabilities",
  (sdk) => sdk.capabilities.getOperatorApproval,
);
export const getRecordPermissionsAtom = makeQueryAtom(
  "capabilities",
  (sdk) => sdk.capabilities.getRecordPermissions,
);
export const getRegistryCapabilitiesAtom = makeQueryAtom(
  "capabilities",
  (sdk) => sdk.capabilities.getRegistryCapabilities,
);
export const getRegistryRolesAtom = makeQueryAtom(
  "capabilities",
  (sdk) => sdk.capabilities.getRegistryRoles,
);
export const getRequiredAuthorizationAtom = makeQueryAtom(
  "capabilities",
  (sdk) => sdk.capabilities.getRequiredAuthorization,
);
export const getResolverCapabilitiesAtom = makeQueryAtom(
  "capabilities",
  (sdk) => sdk.capabilities.getResolverCapabilities,
);
export const getResolverDelegateApprovalAtom = makeQueryAtom(
  "capabilities",
  (sdk) => sdk.capabilities.getResolverDelegateApproval,
);
export const getResolverRolesAtom = makeQueryAtom(
  "capabilities",
  (sdk) => sdk.capabilities.getResolverRoles,
);
export const getTokenApprovalAtom = makeQueryAtom(
  "capabilities",
  (sdk) => sdk.capabilities.getTokenApproval,
);
export const getWrapperPermissionsAtom = makeQueryAtom(
  "capabilities",
  (sdk) => sdk.capabilities.getWrapperPermissions,
);
export const getWriteTargetAtom = makeQueryAtom(
  "capabilities",
  (sdk) => sdk.capabilities.getWriteTarget,
);
export const hasRegistryRolesAtom = makeQueryAtom(
  "capabilities",
  (sdk) => sdk.capabilities.hasRegistryRoles,
);
export const hasResolverRolesAtom = makeQueryAtom(
  "capabilities",
  (sdk) => sdk.capabilities.hasResolverRoles,
);
