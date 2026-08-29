import { makeQueryAtom } from "./query.js";

export const getCanonicalResourceAtom = makeQueryAtom(
  "name",
  (sdk) => sdk.name.getCanonicalResource,
);
export const getExpiryAtom = makeQueryAtom("name", (sdk) => sdk.name.getExpiry);
export const getManagerAtom = makeQueryAtom("name", (sdk) => sdk.name.getManager);
export const getNameStateAtom = makeQueryAtom("name", (sdk) => sdk.name.getNameState);
export const getNameStatusAtom = makeQueryAtom("name", (sdk) => sdk.name.getNameStatus);
export const getOwnerAtom = makeQueryAtom("name", (sdk) => sdk.name.getOwner);
export const getProtocolAtom = makeQueryAtom("name", (sdk) => sdk.name.getProtocol);
export const getRegistrantAtom = makeQueryAtom("name", (sdk) => sdk.name.getRegistrant);
export const getRegistryAtom = makeQueryAtom("name", (sdk) => sdk.name.getRegistry);
export const getTokenIdAtom = makeQueryAtom("name", (sdk) => sdk.name.getTokenId);
export const isAvailableAtom = makeQueryAtom("name", (sdk) => sdk.name.isAvailable);
export const isMigratedAtom = makeQueryAtom("name", (sdk) => sdk.name.isMigrated);
export const isRenewableAtom = makeQueryAtom("name", (sdk) => sdk.name.isRenewable);
export const isReservedAtom = makeQueryAtom("name", (sdk) => sdk.name.isReserved);
export const isWrappedAtom = makeQueryAtom("name", (sdk) => sdk.name.isWrapped);
