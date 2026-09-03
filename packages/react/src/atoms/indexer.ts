import { makeQueryAtom } from "./query.js";

export const getDecodedNameAtom = makeQueryAtom("indexer", (sdk) => sdk.indexer.getDecodedName);
export const getEventsAtom = makeQueryAtom("indexer", (sdk) => sdk.indexer.getEvents);
export const getIndexedNameAtom = makeQueryAtom("indexer", (sdk) => sdk.indexer.getIndexedName);
export const getIndexedRecordsAtom = makeQueryAtom(
  "indexer",
  (sdk) => sdk.indexer.getIndexedRecords,
);
export const getIndexedResolverAtom = makeQueryAtom(
  "indexer",
  (sdk) => sdk.indexer.getIndexedResolver,
);
export const getIndexerStatusAtom = makeQueryAtom("indexer", (sdk) => sdk.indexer.getIndexerStatus);
export const getIndexedNameHistoryAtom = makeQueryAtom(
  "indexer",
  (sdk) => sdk.indexer.getNameHistory,
);
export const getNamesAtom = makeQueryAtom("indexer", (sdk) => sdk.indexer.getNames);
export const getNamesForAddressAtom = makeQueryAtom(
  "indexer",
  (sdk) => sdk.indexer.getNamesForAddress,
);
export const getRecordHistoryAtom = makeQueryAtom("indexer", (sdk) => sdk.indexer.getRecordHistory);
export const getRegistrationsAtom = makeQueryAtom("indexer", (sdk) => sdk.indexer.getRegistrations);
export const getRegistrationsForAddressAtom = makeQueryAtom(
  "indexer",
  (sdk) => sdk.indexer.getRegistrationsForAddress,
);
export const getRegistrationHistoryAtom = makeQueryAtom(
  "indexer",
  (sdk) => sdk.indexer.getRegistrationHistory,
);
export const getRegistriesForAddressAtom = makeQueryAtom(
  "indexer",
  (sdk) => sdk.indexer.getRegistriesForAddress,
);
export const getIndexedRegistryAtom = makeQueryAtom("indexer", (sdk) => sdk.indexer.getRegistry);
export const getRegistryLabelsAtom = makeQueryAtom(
  "indexer",
  (sdk) => sdk.indexer.getRegistryLabels,
);
export const getIndexedRegistryRolesAtom = makeQueryAtom(
  "indexer",
  (sdk) => sdk.indexer.getRegistryRoles,
);
export const getResolvedNamesForAddressAtom = makeQueryAtom(
  "indexer",
  (sdk) => sdk.indexer.getResolvedNamesForAddress,
);
export const getResolverApprovalsAtom = makeQueryAtom(
  "indexer",
  (sdk) => sdk.indexer.getResolverApprovals,
);
export const getResolverMetadataAtom = makeQueryAtom(
  "indexer",
  (sdk) => sdk.indexer.getResolverMetadata,
);
export const getResolversForAddressAtom = makeQueryAtom(
  "indexer",
  (sdk) => sdk.indexer.getResolversForAddress,
);
export const getSubnamesAtom = makeQueryAtom("indexer", (sdk) => sdk.indexer.getSubnames);
export const searchNamesAtom = makeQueryAtom("indexer", (sdk) => sdk.indexer.searchNames);
