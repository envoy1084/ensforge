import { makeMutationAtom } from "./mutation.js";
import { makeQueryAtom } from "./query.js";

export const getPrimaryNameAtom = makeQueryAtom("reverse", (sdk) => sdk.reverse.getPrimaryName);

export const createClearPrimaryNameMutationAtom = makeMutationAtom(
  "reverse",
  (sdk) => sdk.reverse.clearPrimaryName,
);
export const createSetContractPrimaryNameMutationAtom = makeMutationAtom(
  "reverse",
  (sdk) => sdk.reverse.setContractPrimaryName,
);
export const createSetPrimaryNameMutationAtom = makeMutationAtom(
  "reverse",
  (sdk) => sdk.reverse.setPrimaryName,
);
export const createSetPrimaryNameForAddressMutationAtom = makeMutationAtom(
  "reverse",
  (sdk) => sdk.reverse.setPrimaryNameForAddress,
);
