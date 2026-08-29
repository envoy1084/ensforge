import { makeMutationAtom } from "./mutation.js";

export const createCreateSubnameMutationAtom = makeMutationAtom(
  "subnames",
  (sdk) => sdk.subnames.createSubname,
);
export const createDeleteSubnameMutationAtom = makeMutationAtom(
  "subnames",
  (sdk) => sdk.subnames.deleteSubname,
);
export const createSetSubnameExpiryMutationAtom = makeMutationAtom(
  "subnames",
  (sdk) => sdk.subnames.setSubnameExpiry,
);
export const createSetSubnameManagerMutationAtom = makeMutationAtom(
  "subnames",
  (sdk) => sdk.subnames.setSubnameManager,
);
export const createSetSubnameRecordMutationAtom = makeMutationAtom(
  "subnames",
  (sdk) => sdk.subnames.setSubnameRecord,
);
export const createSetSubnameResolverMutationAtom = makeMutationAtom(
  "subnames",
  (sdk) => sdk.subnames.setSubnameResolver,
);
export const createTransferSubnameMutationAtom = makeMutationAtom(
  "subnames",
  (sdk) => sdk.subnames.transferSubname,
);
