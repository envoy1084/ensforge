import type { DevnetEnvironment } from "../environment.js";
import type { DnsFixtureManifest, ResolverRecordFixtureManifest } from "./manifest.js";

export const createDnsFixtures = (
  environment: DevnetEnvironment,
  records: ResolverRecordFixtureManifest,
): DnsFixtureManifest => ({
  contracts: environment.deployments.dns,
  localRecord: records.v1.dns,
  routedTlds: ["com", "net", "org", "xyz"],
  externalProofs: {
    deterministic: false,
    exampleNames: ["ens.domains", "ens.xyz"],
    reason: "DNSSEC and CCIP proofs are served by external gateways in the pinned ENS devnet",
  },
});
