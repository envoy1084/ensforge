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
  readonly protocol: "v1";
  readonly status: EnsDeploymentStatus;
  readonly contracts: EnsV1ContractAddresses;
  readonly provenance: EnsDeploymentProvenance;
}

export interface EnsV2PublicContractAddresses {
  readonly universalResolver: Address;
  readonly rootRegistry: Address;
  readonly ethRegistry: Address;
  readonly ethRegistrar: Address;
  readonly rentPriceOracle: Address;
  readonly ensV2Resolver: Address;
  readonly publicResolver: Address;
  readonly verifiableFactory: Address;
  readonly labelStore: Address;
  readonly contractNamer: Address;
  readonly reverseRegistrarAdapter: Address;
  readonly defaultReverseRegistrarAdapter: Address;
}

export interface EnsV2ImplementationAddresses {
  readonly universalResolver: Address;
  readonly permissionedResolver: Address;
  readonly userRegistry: Address;
  readonly wrapperRegistry: Address;
  readonly contractNamer: Address;
}

export interface EnsV2MigrationContractAddresses {
  readonly ensV1Resolver: Address;
  readonly ethRenewerV1: Address;
  readonly unlockedMigrationController: Address;
  readonly lockedMigrationController: Address;
  readonly migrationHelper: Address;
  readonly graveyard: Address;
  readonly publicResolverSet: Address;
  readonly registryUpgradeSet: Address;
}

export interface EnsV2InfrastructureContractAddresses {
  readonly managedUniversalResolverProxy?: Address;
  readonly batchRegistrar: Address;
  readonly dnsV1MirrorRootBatchRegistrar: Address;
}

export interface EnsV2ExperimentalHcaContractAddresses {
  readonly ownerAndSessionValidator: Address;
  readonly upgradeGate: Address;
  readonly standaloneFactory: Address;
  readonly standaloneImplementation: Address;
  readonly trustedSet: Address;
}

export interface EnsV2TestTokenAddresses {
  readonly dai: Address;
  readonly usdc: Address;
}

export interface EnsV2Deployment {
  readonly id: string;
  readonly chainId: number;
  readonly protocol: "v2";
  readonly status: EnsDeploymentStatus;
  readonly contracts: EnsV2PublicContractAddresses;
  readonly implementations: EnsV2ImplementationAddresses;
  readonly migration: EnsV2MigrationContractAddresses;
  readonly infrastructure: EnsV2InfrastructureContractAddresses;
  readonly experimental?: {
    readonly hca: EnsV2ExperimentalHcaContractAddresses;
  };
  readonly testTokens?: EnsV2TestTokenAddresses;
  readonly provenance: EnsDeploymentProvenance;
}
