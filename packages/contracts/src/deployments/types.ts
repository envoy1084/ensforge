import type { Address } from "viem";

export type EnsDeploymentStatus = "active" | "beta" | "legacy";

export interface EnsDeploymentProvenance {
  readonly repository: string;
  readonly ref: string;
  readonly commit: string;
  readonly documentation?: string;
}

export interface EnsV1ContractAddresses {
  readonly registry: Address;
  readonly baseRegistrar: Address;
  readonly ethRegistrarController: Address;
  readonly wrappedEthRegistrarController?: Address;
  readonly bulkRenewal: Address;
  readonly priceOracle: Address;
  readonly nameWrapper: Address;
  readonly publicResolver: Address;
  readonly universalResolver: Address;
  readonly reverseRegistrar: Address;
  readonly defaultReverseRegistrar: Address;
  readonly dnsRegistrar: Address;
  readonly dnssecOracle: Address;
  readonly offchainDnsResolver: Address;
}

export interface EnsV1Deployment {
  readonly id: string;
  readonly chainId: number;
  readonly phase: "v1";
  readonly status: EnsDeploymentStatus;
  readonly contracts: EnsV1ContractAddresses;
  readonly provenance: EnsDeploymentProvenance;
}
