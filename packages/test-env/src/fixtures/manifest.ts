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
  readonly writeReady: EnsNameFixture;
  readonly grace: EnsNameFixture;
  readonly expired: EnsNameFixture;
}

export interface EnsMigrationFixtureManifest {
  readonly reservedUnwrapped: EnsNameFixture;
  readonly reservedWrapped: EnsNameFixture;
  readonly migratedUnlocked: EnsNameFixture;
  readonly migratedLocked: EnsNameFixture;
  readonly mirroredChild: EnsNameFixture;
}

export interface ResolverRecordsFixture {
  readonly abi: { readonly contentType: bigint; readonly value: Hex };
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
}

export interface EnsFixtureManifest {
  readonly seededAt: bigint;
  readonly v1: EnsV1FixtureManifest;
  readonly v2?: EnsV2FixtureManifest;
  readonly migration?: EnsMigrationFixtureManifest;
  readonly records?: ResolverRecordFixtureManifest;
}
