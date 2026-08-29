"use client";

import {
  getDnsClaimStatusAtom,
  getDnsImportPlanAtom,
  getDnsRecordAtom,
  getDnsRecordsAtom,
  getZoneHashAtom,
  hasDnsRecordsAtom,
  createClaimDnsNameMutationAtom,
  createImportDnsNameMutationAtom,
  createSetDnsRecordsMutationAtom,
  createSetZoneHashMutationAtom,
} from "../atoms/dns.js";
import { makeMutationHook } from "./use-mutation.js";
import { makeQueryHook } from "./use-query.js";
import { makeSuspenseQueryHook } from "./use-suspense-query.js";

export const useDnsClaimStatus = makeQueryHook(getDnsClaimStatusAtom);
export const useDnsClaimStatusSuspense = makeSuspenseQueryHook(getDnsClaimStatusAtom);
export const useDnsImportPlan = makeQueryHook(getDnsImportPlanAtom);
export const useDnsImportPlanSuspense = makeSuspenseQueryHook(getDnsImportPlanAtom);
export const useDnsRecord = makeQueryHook(getDnsRecordAtom);
export const useDnsRecordSuspense = makeSuspenseQueryHook(getDnsRecordAtom);
export const useDnsRecords = makeQueryHook(getDnsRecordsAtom);
export const useDnsRecordsSuspense = makeSuspenseQueryHook(getDnsRecordsAtom);
export const useZoneHash = makeQueryHook(getZoneHashAtom);
export const useZoneHashSuspense = makeSuspenseQueryHook(getZoneHashAtom);
export const useHasDnsRecords = makeQueryHook(hasDnsRecordsAtom);
export const useHasDnsRecordsSuspense = makeSuspenseQueryHook(hasDnsRecordsAtom);

export const useClaimDnsName = makeMutationHook(createClaimDnsNameMutationAtom);
export const useImportDnsName = makeMutationHook(createImportDnsNameMutationAtom);
export const useSetDnsRecords = makeMutationHook(createSetDnsRecordsMutationAtom);
export const useSetZoneHash = makeMutationHook(createSetZoneHashMutationAtom);
