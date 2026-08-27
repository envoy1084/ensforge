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

export interface EnsFixtureManifest {
  readonly seededAt: bigint;
  readonly v1: EnsV1FixtureManifest;
}
