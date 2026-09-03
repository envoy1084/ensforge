"use client";

import {
  getDecodedNameAtom,
  getEventsAtom,
  getIndexedNameAtom,
  getIndexedNameHistoryAtom,
  getIndexedRecordsAtom,
  getIndexedRegistryAtom,
  getIndexedRegistryRolesAtom,
  getIndexedResolverAtom,
  getIndexerStatusAtom,
  getNamesAtom,
  getNamesForAddressAtom,
  getRecordHistoryAtom,
  getRegistrationsAtom,
  getRegistrationsForAddressAtom,
  getRegistrationHistoryAtom,
  getRegistriesForAddressAtom,
  getRegistryLabelsAtom,
  getResolvedNamesForAddressAtom,
  getResolverApprovalsAtom,
  getResolverMetadataAtom,
  getResolversForAddressAtom,
  getSubnamesAtom,
  searchNamesAtom,
} from "../atoms/indexer.js";
import { makeQueryHook } from "./use-query.js";
import { makeSuspenseQueryHook } from "./use-suspense-query.js";

export const useDecodedName = makeQueryHook(getDecodedNameAtom);
export const useDecodedNameSuspense = makeSuspenseQueryHook(getDecodedNameAtom);
export const useEvents = makeQueryHook(getEventsAtom);
export const useEventsSuspense = makeSuspenseQueryHook(getEventsAtom);
export const useIndexedName = makeQueryHook(getIndexedNameAtom);
export const useIndexedNameSuspense = makeSuspenseQueryHook(getIndexedNameAtom);
export const useIndexedRecords = makeQueryHook(getIndexedRecordsAtom);
export const useIndexedRecordsSuspense = makeSuspenseQueryHook(getIndexedRecordsAtom);
export const useIndexedResolver = makeQueryHook(getIndexedResolverAtom);
export const useIndexedResolverSuspense = makeSuspenseQueryHook(getIndexedResolverAtom);
export const useIndexerStatus = makeQueryHook(getIndexerStatusAtom);
export const useIndexerStatusSuspense = makeSuspenseQueryHook(getIndexerStatusAtom);
export const useIndexedNameHistory = makeQueryHook(getIndexedNameHistoryAtom);
export const useIndexedNameHistorySuspense = makeSuspenseQueryHook(getIndexedNameHistoryAtom);
export const useNames = makeQueryHook(getNamesAtom);
export const useNamesSuspense = makeSuspenseQueryHook(getNamesAtom);
export const useNamesForAddress = makeQueryHook(getNamesForAddressAtom);
export const useNamesForAddressSuspense = makeSuspenseQueryHook(getNamesForAddressAtom);
export const useRecordHistory = makeQueryHook(getRecordHistoryAtom);
export const useRecordHistorySuspense = makeSuspenseQueryHook(getRecordHistoryAtom);
export const useRegistrations = makeQueryHook(getRegistrationsAtom);
export const useRegistrationsSuspense = makeSuspenseQueryHook(getRegistrationsAtom);
export const useRegistrationsForAddress = makeQueryHook(getRegistrationsForAddressAtom);
export const useRegistrationsForAddressSuspense = makeSuspenseQueryHook(
  getRegistrationsForAddressAtom,
);
export const useRegistrationHistory = makeQueryHook(getRegistrationHistoryAtom);
export const useRegistrationHistorySuspense = makeSuspenseQueryHook(getRegistrationHistoryAtom);
export const useRegistriesForAddress = makeQueryHook(getRegistriesForAddressAtom);
export const useRegistriesForAddressSuspense = makeSuspenseQueryHook(getRegistriesForAddressAtom);
export const useIndexedRegistry = makeQueryHook(getIndexedRegistryAtom);
export const useIndexedRegistrySuspense = makeSuspenseQueryHook(getIndexedRegistryAtom);
export const useRegistryLabels = makeQueryHook(getRegistryLabelsAtom);
export const useRegistryLabelsSuspense = makeSuspenseQueryHook(getRegistryLabelsAtom);
export const useIndexedRegistryRoles = makeQueryHook(getIndexedRegistryRolesAtom);
export const useIndexedRegistryRolesSuspense = makeSuspenseQueryHook(getIndexedRegistryRolesAtom);
export const useResolvedNamesForAddress = makeQueryHook(getResolvedNamesForAddressAtom);
export const useResolvedNamesForAddressSuspense = makeSuspenseQueryHook(
  getResolvedNamesForAddressAtom,
);
export const useResolverApprovals = makeQueryHook(getResolverApprovalsAtom);
export const useResolverApprovalsSuspense = makeSuspenseQueryHook(getResolverApprovalsAtom);
export const useResolverMetadata = makeQueryHook(getResolverMetadataAtom);
export const useResolverMetadataSuspense = makeSuspenseQueryHook(getResolverMetadataAtom);
export const useResolversForAddress = makeQueryHook(getResolversForAddressAtom);
export const useResolversForAddressSuspense = makeSuspenseQueryHook(getResolversForAddressAtom);
export const useSubnames = makeQueryHook(getSubnamesAtom);
export const useSubnamesSuspense = makeSuspenseQueryHook(getSubnamesAtom);
export const useSearchNames = makeQueryHook(searchNamesAtom);
export const useSearchNamesSuspense = makeSuspenseQueryHook(searchNamesAtom);
