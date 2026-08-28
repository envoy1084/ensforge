import type { Address } from "viem";

import type { DevnetEnvironment } from "../environment.js";
import type { EventFixtureManifest } from "./manifest.js";

export const createEventFixtures = async (
  environment: DevnetEnvironment,
  fromBlock: bigint,
): Promise<EventFixtureManifest> => ({
  contracts: {
    v1Registrar: environment.deployments.v1.contracts.baseRegistrar,
    v1Registry: environment.deployments.v1.contracts.registry,
    v1Resolver: environment.deployments.v1.contracts.publicResolver,
    v1Wrapper: environment.deployments.v1.contracts.nameWrapper,
    v2Registrar: environment.deployments.v2.contracts.ethRegistrar,
    v2Registry: environment.deployments.v2.contracts.ethRegistry,
    v2Resolver: environment.deployments.v2.contracts.publicResolver,
  } satisfies Record<string, Address>,
  fromBlock,
  names: {
    commitment: ["v1-commitment.eth", "v2-commitment.eth"],
    migration: ["v2-migrated-unlocked.eth", "v2-migrated-locked.eth"],
    records: ["v1-unwrapped.eth", "v2-migrated-locked.eth"],
    registration: ["v1-unwrapped.eth", "v2-active.eth"],
    subnames: ["sub.v1-unwrapped.eth", "sub.v1-wrapped.eth", "native.ens.eth"],
  },
  toBlock: await environment.clients.publicClient.getBlockNumber(),
});
