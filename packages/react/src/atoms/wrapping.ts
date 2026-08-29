import { makeMutationAtom } from "./mutation.js";
import { makeQueryAtom } from "./query.js";

export const getFusesAtom = makeQueryAtom("wrapping", (sdk) => sdk.wrapping.getFuses);
export const getWrapperExpiryAtom = makeQueryAtom(
  "wrapping",
  (sdk) => sdk.wrapping.getWrapperExpiry,
);

export const createExtendSubnameExpiryMutationAtom = makeMutationAtom(
  "wrapping",
  (sdk) => sdk.wrapping.extendSubnameExpiry,
);
export const createSetChildFusesMutationAtom = makeMutationAtom(
  "wrapping",
  (sdk) => sdk.wrapping.setChildFuses,
);
export const createSetFusesMutationAtom = makeMutationAtom(
  "wrapping",
  (sdk) => sdk.wrapping.setFuses,
);
export const createUnwrapNameMutationAtom = makeMutationAtom(
  "wrapping",
  (sdk) => sdk.wrapping.unwrapName,
);
export const createWrapNameMutationAtom = makeMutationAtom(
  "wrapping",
  (sdk) => sdk.wrapping.wrapName,
);
