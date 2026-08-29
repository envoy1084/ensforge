import { Effect } from "effect";

import { defaultReverseRegistrarV1Abi, reverseRegistrarV1Abi } from "@ensforge/contracts/v1";
import { defaultReverseRegistrarAdapterV2Abi } from "@ensforge/contracts/v2";

import type { DevnetEnvironment } from "../environment.js";
import { seedTransaction } from "./contract.js";
import type { ReverseFixtureManifest } from "./manifest.js";

export const seedReverseFixtures = Effect.fn("seedReverseFixtures")(function* (
  environment: DevnetEnvironment,
) {
  yield* seedTransaction(
    environment,
    {
      abi: defaultReverseRegistrarV1Abi,
      address: environment.deployments.v1.contracts.defaultReverseRegistrar,
      functionName: "setName",
      args: ["v1-unwrapped.eth"],
    },
    "Unable to seed the verified default EVM reverse record",
    "owner",
  );
  yield* seedTransaction(
    environment,
    {
      abi: defaultReverseRegistrarAdapterV2Abi,
      address: environment.deployments.v2.contracts.defaultReverseRegistrarAdapter,
      functionName: "setName",
      args: [environment.accounts.owner2, "v2-migrated-locked.eth"],
    },
    "Unable to seed the verified ENS v2 reverse record",
    "owner2",
  );
  yield* seedTransaction(
    environment,
    {
      abi: reverseRegistrarV1Abi,
      address: environment.deployments.v1.contracts.reverseRegistrar,
      functionName: "setName",
      args: ["v1-unwrapped.eth"],
    },
    "Unable to seed the unverified ENS reverse record",
    "operator",
  );

  return {
    verifiedV1: {
      address: environment.accounts.owner,
      forwardName: "v1-unwrapped.eth",
      name: "v1-unwrapped.eth",
      verified: true,
    },
    verifiedV2: {
      address: environment.accounts.owner2,
      forwardName: "v2-migrated-locked.eth",
      name: "v2-migrated-locked.eth",
      verified: true,
    },
    verifiedDefaultV1: {
      address: environment.accounts.owner,
      coinType: 0x8000_0000n,
      forwardName: "v1-unwrapped.eth",
      name: "v1-unwrapped.eth",
      verified: true,
    },
    verifiedDefaultV2: {
      address: environment.accounts.owner2,
      coinType: 0x8000_0000n,
      forwardName: "v2-migrated-locked.eth",
      name: "v2-migrated-locked.eth",
      verified: true,
    },
    unverified: {
      address: environment.accounts.operator,
      forwardName: "v1-unwrapped.eth",
      name: "v1-unwrapped.eth",
      verified: false,
    },
    missing: { address: environment.accounts.unauthorized },
    verifiedContract: {
      address: environment.deployments.v2.contracts.publicResolver,
      forwardName: "public.resolver.ens.eth",
      name: "public.resolver.ens.eth",
      verified: true,
    },
  } satisfies ReverseFixtureManifest;
});
