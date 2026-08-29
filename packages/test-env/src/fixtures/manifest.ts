import type { Address, Hex } from "viem";

export type FixtureLifecycle = "active" | "available" | "grace" | "expired";
export type FixtureResolverState = "own" | "inherited" | "missing";

export interface EnsNameFixture {
  readonly name: string;
  readonly owner: Address;
  readonly protocol: "v1" | "v2";
  readonly lifecycle: FixtureLifecycle;
  readonly resolver: Address;
  readonly resolverState: FixtureResolverState;
  readonly expiry?: bigint;
}

export interface EnsV1FixtureManifest {
  readonly available: EnsNameFixture;
  readonly activeUnwrapped: EnsNameFixture;
  readonly activeWrapped: EnsNameFixture;
  readonly differentOwner: EnsNameFixture;
  readonly unwrappedSubname: EnsNameFixture;
  readonly wrappedSubname: EnsNameFixture;
  readonly noResolver: EnsNameFixture;
  readonly recordWrites: EnsNameFixture;
  readonly resolverLifecycle: EnsNameFixture;
  readonly writeReady: EnsNameFixture;
  readonly grace: EnsNameFixture;
  readonly expired: EnsNameFixture;
  readonly reverse: {
    readonly address: Address;
    readonly name: string;
  };
}

export interface EnsV2FixtureManifest {
  readonly available: EnsNameFixture;
  readonly active: EnsNameFixture;
  readonly differentOwner: EnsNameFixture;
  readonly expiringSoon: EnsNameFixture;
  readonly nested: EnsNameFixture;
  readonly nestedOwnResolver: EnsNameFixture;
  readonly inheritedResolver: EnsNameFixture;
  readonly noResolver: EnsNameFixture;
  readonly resolverLifecycle: EnsNameFixture;
  readonly writeReady: EnsNameFixture;
  readonly grace: EnsNameFixture;
  readonly expired: EnsNameFixture;
}

export interface EnsMigrationFixtureManifest {
  readonly reservedUnwrapped: EnsNameFixture;
  readonly reservedUnwrappedApproved: EnsNameFixture;
  readonly reservedWrapped: EnsNameFixture;
  readonly reservedWrappedLocked: EnsNameFixture;
  readonly migratedUnlocked: EnsNameFixture;
  readonly migratedLocked: EnsNameFixture;
  readonly mirroredChild: EnsNameFixture;
}

export interface ResolverRecordsFixture {
  readonly abi: {
    readonly value: ReadonlyArray<Record<string, unknown>>;
    readonly json: { readonly contentType: 1n; readonly raw: Hex };
    readonly zlibJson: { readonly contentType: 2n; readonly raw: Hex };
    readonly cbor: { readonly contentType: 4n; readonly raw: Hex };
    readonly uri: { readonly contentType: 8n; readonly raw: Hex; readonly value: string };
  };
  readonly addresses: {
    readonly eth: Address;
    readonly bitcoin: { readonly coinType: bigint; readonly value: Hex };
  };
  readonly contenthash: Hex;
  readonly data: { readonly key: string; readonly value: Hex };
  readonly dns: { readonly name: string; readonly resource: number; readonly value: string };
  readonly interface: { readonly id: Hex; readonly implementer: Address };
  readonly name: string;
  readonly node: Hex;
  readonly primaryName: string;
  readonly pubkey: { readonly x: Hex; readonly y: Hex };
  readonly resolver: Address;
  readonly texts: Readonly<Record<"avatar" | "description" | "email" | "url", string>>;
  readonly zonehash: Hex;
}

export interface ResolverRecordFixtureManifest {
  readonly v1: ResolverRecordsFixture;
  readonly v2: ResolverRecordsFixture;
  readonly reserved: ResolverRecordsFixture;
}

export interface PermissionFixtureManifest {
  readonly operator: Address;
  readonly unauthorized: Address;
  readonly v1: {
    readonly resolverDelegate: { readonly name: string; readonly node: Hex };
    readonly tokenApproval: { readonly name: string; readonly tokenId: bigint };
    readonly wrapperOperator: true;
  };
  readonly v2: {
    readonly registryOperator: true;
    readonly resolverDelegate: { readonly name: string; readonly node: Hex };
    readonly scopedRole: { readonly name: string; readonly role: bigint; readonly tokenId: bigint };
    readonly permissionedResolver: {
      readonly name: string;
      readonly resolver: Address;
      readonly resource: bigint;
      readonly role: bigint;
      readonly textKey: string;
    };
  };
}

export interface ReverseFixture {
  readonly address: Address;
  readonly name?: string;
  readonly forwardName?: string;
  readonly verified?: boolean;
}

export interface ReverseFixtureManifest {
  readonly verifiedV1: ReverseFixture;
  readonly verifiedV2: ReverseFixture;
  readonly unverified: ReverseFixture;
  readonly missing: ReverseFixture;
  readonly verifiedContract: ReverseFixture;
}

export interface RegistrationCommitmentFixture {
  readonly commitment: Hex;
  readonly controller: Address;
  readonly label: string;
  readonly maxCommitmentAge: bigint;
  readonly minCommitmentAge: bigint;
  readonly secret: Hex;
}

export interface RegistrationFixtureManifest {
  readonly paymentTokens: Readonly<
    Record<
      "dai" | "usdc",
      { readonly address: Address; readonly balance: bigint; readonly decimals: number }
    >
  >;
  readonly v1: RegistrationCommitmentFixture;
  readonly v2: RegistrationCommitmentFixture;
}

export interface DnsFixtureManifest {
  readonly contracts: {
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
  readonly localRecord: ResolverRecordsFixture["dns"];
  readonly routedTlds: ReadonlyArray<string>;
  readonly externalProofs: {
    readonly deterministic: false;
    readonly exampleNames: ReadonlyArray<string>;
    readonly reason: string;
  };
}

export interface EventFixtureManifest {
  readonly contracts: Readonly<Record<string, Address>>;
  readonly fromBlock: bigint;
  readonly names: Readonly<
    Record<
      "commitment" | "migration" | "records" | "registration" | "subnames",
      ReadonlyArray<string>
    >
  >;
  readonly toBlock: bigint;
}

export interface EnsFixtureManifest {
  readonly seededAt: bigint;
  readonly v1: EnsV1FixtureManifest;
  readonly v2: EnsV2FixtureManifest;
  readonly migration: EnsMigrationFixtureManifest;
  readonly records: ResolverRecordFixtureManifest;
  readonly permissions: PermissionFixtureManifest;
  readonly reverse: ReverseFixtureManifest;
  readonly registration: RegistrationFixtureManifest;
  readonly dns: DnsFixtureManifest;
  readonly events: EventFixtureManifest;
}
