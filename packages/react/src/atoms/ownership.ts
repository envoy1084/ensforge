import { makeMutationAtom } from "./mutation.js";
import { makeQueryAtom } from "./query.js";

export const getTtlAtom = makeQueryAtom("ownership", (sdk) => sdk.ownership.getTtl);

export const createReclaimNameMutationAtom = makeMutationAtom(
  "ownership",
  (sdk) => sdk.ownership.reclaimName,
);
export const createSetManagerMutationAtom = makeMutationAtom(
  "ownership",
  (sdk) => sdk.ownership.setManager,
);
export const createSetTtlMutationAtom = makeMutationAtom(
  "ownership",
  (sdk) => sdk.ownership.setTtl,
);
export const createTransferNameMutationAtom = makeMutationAtom(
  "ownership",
  (sdk) => sdk.ownership.transferName,
);
export const createTransferRegistrantMutationAtom = makeMutationAtom(
  "ownership",
  (sdk) => sdk.ownership.transferRegistrant,
);
