import {
  claimDnsName,
  getDnsClaimStatus,
  getDnsImportPlan,
  getDnsRecord,
  getDnsRecords,
  getZoneHash,
  hasDnsRecords,
  importDnsName,
  setDnsRecords,
  setZoneHash,
  type EnsforgeConfig,
} from "@ensforge/core";

import { bindAction } from "../internal/bind-action.js";

export const makeDnsActions = (config: EnsforgeConfig) =>
  Object.freeze({
    claimDnsName: bindAction(config, claimDnsName),
    getDnsClaimStatus: bindAction(config, getDnsClaimStatus),
    getDnsImportPlan: bindAction(config, getDnsImportPlan),
    getDnsRecord: bindAction(config, getDnsRecord),
    getDnsRecords: bindAction(config, getDnsRecords),
    getZoneHash: bindAction(config, getZoneHash),
    hasDnsRecords: bindAction(config, hasDnsRecords),
    importDnsName: bindAction(config, importDnsName),
    setDnsRecords: bindAction(config, setDnsRecords),
    setZoneHash: bindAction(config, setZoneHash),
  });

export type DnsActions = ReturnType<typeof makeDnsActions>;
