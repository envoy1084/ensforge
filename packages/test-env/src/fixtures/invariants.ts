import {
  baseRegistrarV1Abi,
  ethRegistrarControllerV1Abi,
  publicResolverV1Abi,
} from "@ensforge/contracts/v1";
import { ethRegistrarV2Abi, ethRegistryV2Abi, publicResolverV2Abi } from "@ensforge/contracts/v2";
import { isAddressEqual, labelhash, namehash } from "viem";

import type { DevnetEnvironment } from "../environment.js";
import type { EnsFixtureManifest } from "./manifest.js";

export const verifyFixtureManifest = async (
  environment: DevnetEnvironment,
  fixtures: EnsFixtureManifest,
): Promise<void> => {
  const [
    v1Owner,
    v2State,
    v1Email,
    v2Email,
    v1Approved,
    v2HasRole,
    v1CommitmentAt,
    v2CommitmentAt,
  ] = await Promise.all([
    environment.clients.publicClient.readContract({
      abi: baseRegistrarV1Abi,
      address: environment.deployments.v1.contracts.baseRegistrar,
      functionName: "ownerOf",
      args: [BigInt(labelhash("v1-unwrapped"))],
    }),
    environment.clients.publicClient.readContract({
      abi: ethRegistryV2Abi,
      address: environment.deployments.v2.contracts.ethRegistry,
      functionName: "getState",
      args: [BigInt(labelhash("v2-active"))],
    }),
    environment.clients.publicClient.readContract({
      abi: publicResolverV1Abi,
      address: fixtures.records.v1.resolver,
      functionName: "text",
      args: [namehash(fixtures.records.v1.name), "email"],
    }),
    environment.clients.publicClient.readContract({
      abi: publicResolverV2Abi,
      address: fixtures.records.v2.resolver,
      functionName: "text",
      args: [namehash(fixtures.records.v2.name), "email"],
    }),
    environment.clients.publicClient.readContract({
      abi: baseRegistrarV1Abi,
      address: environment.deployments.v1.contracts.baseRegistrar,
      functionName: "getApproved",
      args: [fixtures.permissions.v1.tokenApproval.tokenId],
    }),
    environment.clients.publicClient.readContract({
      abi: ethRegistryV2Abi,
      address: environment.deployments.v2.contracts.ethRegistry,
      functionName: "hasRoles",
      args: [
        fixtures.permissions.v2.scopedRole.tokenId,
        fixtures.permissions.v2.scopedRole.role,
        fixtures.permissions.operator,
      ],
    }),
    environment.clients.publicClient.readContract({
      abi: ethRegistrarControllerV1Abi,
      address: fixtures.registration.v1.controller,
      functionName: "commitments",
      args: [fixtures.registration.v1.commitment],
    }),
    environment.clients.publicClient.readContract({
      abi: ethRegistrarV2Abi,
      address: fixtures.registration.v2.controller,
      functionName: "commitmentAt",
      args: [fixtures.registration.v2.commitment],
    }),
  ]);

  const invalid =
    !isAddressEqual(v1Owner, fixtures.v1.activeUnwrapped.owner) ||
    !isAddressEqual(v2State.latestOwner, fixtures.v2.active.owner) ||
    v1Email !== fixtures.records.v1.texts.email ||
    v2Email !== fixtures.records.v2.texts.email ||
    !isAddressEqual(v1Approved, fixtures.permissions.operator) ||
    !v2HasRole ||
    v1CommitmentAt === 0n ||
    v2CommitmentAt === 0n;

  if (invalid) {
    throw new Error("The completed ENS fixture manifest failed invariant verification", {
      cause: {
        v1Approved,
        v1CommitmentAt,
        v1Email,
        v1Owner,
        v2CommitmentAt,
        v2Email,
        v2HasRole,
        v2Owner: v2State.latestOwner,
      },
    });
  }
};
