import { makeMutationAtom } from "./mutation.js";
import { makeQueryAtom } from "./query.js";

export const getDnsClaimStatusAtom = makeQueryAtom("dns", (sdk) => sdk.dns.getDnsClaimStatus);
export const getDnsImportPlanAtom = makeQueryAtom("dns", (sdk) => sdk.dns.getDnsImportPlan);
export const getDnsRecordAtom = makeQueryAtom("dns", (sdk) => sdk.dns.getDnsRecord);
export const getDnsRecordsAtom = makeQueryAtom("dns", (sdk) => sdk.dns.getDnsRecords);
export const getZoneHashAtom = makeQueryAtom("dns", (sdk) => sdk.dns.getZoneHash);
export const hasDnsRecordsAtom = makeQueryAtom("dns", (sdk) => sdk.dns.hasDnsRecords);

export const createClaimDnsNameMutationAtom = makeMutationAtom(
  "dns",
  (sdk) => sdk.dns.claimDnsName,
);
export const createImportDnsNameMutationAtom = makeMutationAtom(
  "dns",
  (sdk) => sdk.dns.importDnsName,
);
export const createSetDnsRecordsMutationAtom = makeMutationAtom(
  "dns",
  (sdk) => sdk.dns.setDnsRecords,
);
export const createSetZoneHashMutationAtom = makeMutationAtom("dns", (sdk) => sdk.dns.setZoneHash);
