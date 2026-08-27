import type { Address } from "viem";

export type FixtureLifecycle = "active" | "grace" | "expired";
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
  readonly activeUnwrapped: EnsNameFixture;
  readonly activeWrapped: EnsNameFixture;
  readonly wrappedSubname: EnsNameFixture;
  readonly noResolver: EnsNameFixture;
  readonly grace: EnsNameFixture;
  readonly expired: EnsNameFixture;
  readonly reverse: {
    readonly address: Address;
    readonly name: string;
  };
}

export interface EnsV2FixtureManifest {
  readonly active: EnsNameFixture;
  readonly nested: EnsNameFixture;
  readonly inheritedResolver: EnsNameFixture;
  readonly noResolver: EnsNameFixture;
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

export interface EnsFixtureManifest {
  readonly seededAt: bigint;
  readonly v1: EnsV1FixtureManifest;
  readonly v2?: EnsV2FixtureManifest;
  readonly migration?: EnsMigrationFixtureManifest;
}
