import { Effect, Schema } from "effect";

import type { EnsV1Deployment, EnsV2Deployment } from "@ensforge/contracts/deployments";
import type { Address } from "viem";

import {
  ensContractsV2Commit,
  ensContractsV2Repository,
  ensDevnetChainId,
} from "../devnet/source.js";
import { TestEnvironmentError } from "../errors/test-environment-error.js";
import { DevnetDeploymentAddress, type DevnetDeploymentManifest } from "./schema.js";

const DevnetRequiredDeployments = Schema.Struct({
  BaseRegistrarImplementation: DevnetDeploymentAddress,
  BatchRegistrar: DevnetDeploymentAddress,
  BatchGatewayProvider: DevnetDeploymentAddress,
  ContractNamer: DevnetDeploymentAddress,
  ContractNamer_Implementation: DevnetDeploymentAddress,
  DefaultReverseRegistrar: DevnetDeploymentAddress,
  DefaultReverseRegistrarAdapter: DevnetDeploymentAddress,
  DNSRegistrar: DevnetDeploymentAddress,
  DNSAliasResolver: DevnetDeploymentAddress,
  DNSSECGatewayProvider: DevnetDeploymentAddress,
  DNSSECImpl: DevnetDeploymentAddress,
  DNSTLDResolver: DevnetDeploymentAddress,
  DNSTXTResolver: DevnetDeploymentAddress,
  DNSV1MirrorRootBatchRegistrar: DevnetDeploymentAddress,
  ENSRegistry: DevnetDeploymentAddress,
  ENSV1Resolver: DevnetDeploymentAddress,
  ENSV2Resolver: DevnetDeploymentAddress,
  ETHRegistrar: DevnetDeploymentAddress,
  ETHRegistrarController: DevnetDeploymentAddress,
  ETHRegistry: DevnetDeploymentAddress,
  ETHRenewerV1: DevnetDeploymentAddress,
  ExponentialPremiumPriceOracle: DevnetDeploymentAddress,
  Graveyard: DevnetDeploymentAddress,
  LabelStore: DevnetDeploymentAddress,
  LockedMigrationController: DevnetDeploymentAddress,
  MigrationHelper: DevnetDeploymentAddress,
  MockDAI: DevnetDeploymentAddress,
  MockUSDC: DevnetDeploymentAddress,
  Multicall3: DevnetDeploymentAddress,
  NameWrapper: DevnetDeploymentAddress,
  OffchainDNSResolver: DevnetDeploymentAddress,
  PermissionedResolverImpl: DevnetDeploymentAddress,
  PublicResolver: DevnetDeploymentAddress,
  PublicResolverSet: DevnetDeploymentAddress,
  PublicResolverV2: DevnetDeploymentAddress,
  RegistryUpgradeSet: DevnetDeploymentAddress,
  ReverseRegistrar: DevnetDeploymentAddress,
  ReverseRegistrarAdapter: DevnetDeploymentAddress,
  RootRegistry: DevnetDeploymentAddress,
  SimplePublicSuffixList: DevnetDeploymentAddress,
  StandardRentPriceOracle: DevnetDeploymentAddress,
  StaticBulkRenewal: DevnetDeploymentAddress,
  UniversalResolver: DevnetDeploymentAddress,
  UniversalResolverV2: DevnetDeploymentAddress,
  UnlockedMigrationController: DevnetDeploymentAddress,
  UserRegistryImpl: DevnetDeploymentAddress,
  VerifiableFactory: DevnetDeploymentAddress,
  WrappedETHRegistrarController: DevnetDeploymentAddress,
  WrapperRegistryImpl: DevnetDeploymentAddress,
});

export interface DevnetDeployments {
  readonly v1: EnsV1Deployment;
  readonly v2: EnsV2Deployment;
  readonly multicall3: Address;
  readonly requiredAddresses: ReadonlyArray<Address>;
  readonly dns: {
    readonly aliasResolver: Address;
    readonly batchGatewayProvider: Address;
    readonly dnssecGatewayProvider: Address;
    readonly dnssecOracle: Address;
    readonly registrar: Address;
    readonly rootBatchRegistrar: Address;
    readonly publicSuffixList: Address;
    readonly tldResolver: Address;
    readonly txtResolver: Address;
  };
}

export const mapDevnetDeployments = Effect.fn("mapDevnetDeployments")(function* (
  manifest: DevnetDeploymentManifest,
) {
  const source = yield* Schema.decodeUnknownEffect(DevnetRequiredDeployments)(
    manifest.contracts,
  ).pipe(
    Effect.mapError(
      (cause) =>
        new TestEnvironmentError({
          code: "DEPLOYMENTS_INVALID",
          message: "ENS devnet is missing required v1 or v2 deployments",
          cause,
        }),
    ),
  );
  const provenance = {
    repository: ensContractsV2Repository,
    ref: ensContractsV2Commit,
    commit: ensContractsV2Commit,
  } as const;

  const v1 = {
    id: "devnet-v1",
    chainId: ensDevnetChainId,
    protocol: "v1",
    status: "legacy",
    contracts: {
      registry: source.ENSRegistry,
      baseRegistrar: source.BaseRegistrarImplementation,
      ethRegistrarController: source.ETHRegistrarController,
      wrappedEthRegistrarController: source.WrappedETHRegistrarController,
      bulkRenewal: source.StaticBulkRenewal,
      priceOracle: source.ExponentialPremiumPriceOracle,
      nameWrapper: source.NameWrapper,
      publicResolver: source.PublicResolver,
      universalResolver: source.UniversalResolver,
      reverseRegistrar: source.ReverseRegistrar,
      defaultReverseRegistrar: source.DefaultReverseRegistrar,
      dnsRegistrar: source.DNSRegistrar,
      dnssecOracle: source.DNSSECImpl,
      offchainDnsResolver: source.OffchainDNSResolver,
    },
    provenance,
  } as const satisfies EnsV1Deployment;

  const v2 = {
    id: "devnet-v2",
    chainId: ensDevnetChainId,
    protocol: "v2",
    status: "beta",
    contracts: {
      universalResolver: source.UniversalResolver,
      rootRegistry: source.RootRegistry,
      ethRegistry: source.ETHRegistry,
      ethRegistrar: source.ETHRegistrar,
      rentPriceOracle: source.StandardRentPriceOracle,
      ensV2Resolver: source.ENSV2Resolver,
      publicResolver: source.PublicResolverV2,
      verifiableFactory: source.VerifiableFactory,
      labelStore: source.LabelStore,
      contractNamer: source.ContractNamer,
      reverseRegistrarAdapter: source.ReverseRegistrarAdapter,
      defaultReverseRegistrarAdapter: source.DefaultReverseRegistrarAdapter,
    },
    implementations: {
      universalResolver: source.UniversalResolverV2,
      permissionedResolver: source.PermissionedResolverImpl,
      userRegistry: source.UserRegistryImpl,
      wrapperRegistry: source.WrapperRegistryImpl,
      contractNamer: source.ContractNamer_Implementation,
    },
    migration: {
      ensV1Resolver: source.ENSV1Resolver,
      ethRenewerV1: source.ETHRenewerV1,
      unlockedMigrationController: source.UnlockedMigrationController,
      lockedMigrationController: source.LockedMigrationController,
      migrationHelper: source.MigrationHelper,
      graveyard: source.Graveyard,
      publicResolverSet: source.PublicResolverSet,
      registryUpgradeSet: source.RegistryUpgradeSet,
    },
    infrastructure: {
      batchRegistrar: source.BatchRegistrar,
      dnsV1MirrorRootBatchRegistrar: source.DNSV1MirrorRootBatchRegistrar,
    },
    testTokens: {
      dai: source.MockDAI,
      usdc: source.MockUSDC,
    },
    provenance,
  } as const satisfies EnsV2Deployment;

  return {
    v1,
    v2,
    multicall3: source.Multicall3,
    dns: {
      aliasResolver: source.DNSAliasResolver,
      batchGatewayProvider: source.BatchGatewayProvider,
      dnssecGatewayProvider: source.DNSSECGatewayProvider,
      dnssecOracle: source.DNSSECImpl,
      registrar: source.DNSRegistrar,
      rootBatchRegistrar: source.DNSV1MirrorRootBatchRegistrar,
      publicSuffixList: source.SimplePublicSuffixList,
      tldResolver: source.DNSTLDResolver,
      txtResolver: source.DNSTXTResolver,
    },
    requiredAddresses: [...new Set(Object.values(source))],
  } satisfies DevnetDeployments;
});
