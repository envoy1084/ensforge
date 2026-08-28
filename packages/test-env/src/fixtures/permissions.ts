import { Effect } from "effect";

import { baseRegistrarV1Abi, nameWrapperV1Abi, publicResolverV1Abi } from "@ensforge/contracts/v1";
import {
  enhancedAccessControlRoles,
  ethRegistryV2Abi,
  permissionedResolverInitializableV2InterfaceAbi,
  permissionedResolverV2Abi,
  publicResolverV2Abi,
  registryRoles,
  resolverRoles,
  verifiableFactoryV2Abi,
} from "@ensforge/contracts/v2";
import {
  encodeFunctionData,
  encodePacked,
  bytesToHex,
  keccak256,
  labelhash,
  namehash,
  stringToHex,
} from "viem";
import { packetToBytes } from "viem/ens";

import type { DevnetEnvironment } from "../environment.js";
import { seedTransaction } from "./contract.js";
import { seedRead } from "./contract.js";
import type { PermissionFixtureManifest } from "./manifest.js";

export const seedPermissionFixtures = Effect.fn("seedPermissionFixtures")(function* (
  environment: DevnetEnvironment,
) {
  const v1Node = namehash("v1-unwrapped.eth");
  const v2Node = namehash("v2-migrated-locked.eth");
  const v1TokenId = BigInt(labelhash("v1-unwrapped"));
  const v2TokenId = BigInt(labelhash("v2-active"));
  const permissionedName = "v2-write-ready.eth";
  const permissionedNode = namehash(permissionedName);
  const permissionedTextKey = "avatar";
  const permissionedResource = BigInt(
    keccak256(
      encodePacked(
        ["bytes32", "bytes32"],
        [permissionedNode, keccak256(stringToHex(permissionedTextKey))],
      ),
    ),
  );

  yield* seedTransaction(
    environment,
    {
      abi: baseRegistrarV1Abi,
      address: environment.deployments.v1.contracts.baseRegistrar,
      functionName: "approve",
      args: [environment.accounts.operator, v1TokenId],
    },
    "Unable to approve the ENS v1 token operator",
    "owner",
  );

  const initialization = encodeFunctionData({
    abi: permissionedResolverInitializableV2InterfaceAbi,
    functionName: "initialize",
    args: [
      [
        {
          account: environment.accounts.owner,
          roleBitmap: enhancedAccessControlRoles.allRoles,
        },
      ],
      [],
    ],
  });
  const permissionedResolver = yield* seedRead(
    () =>
      environment.clients.publicClient
        .simulateContract({
          account: environment.accounts.owner,
          abi: verifiableFactoryV2Abi,
          address: environment.deployments.v2.contracts.verifiableFactory,
          functionName: "deployProxy",
          args: [
            environment.deployments.v2.implementations.permissionedResolver,
            9_001n,
            initialization,
          ],
        })
        .then(({ result }) => result),
    "Unable to predict the permissioned resolver fixture",
  );
  yield* seedTransaction(
    environment,
    {
      abi: verifiableFactoryV2Abi,
      address: environment.deployments.v2.contracts.verifiableFactory,
      functionName: "deployProxy",
      args: [
        environment.deployments.v2.implementations.permissionedResolver,
        9_001n,
        initialization,
      ],
    },
    "Unable to deploy the permissioned resolver fixture",
    "owner",
  );
  yield* seedTransaction(
    environment,
    {
      abi: ethRegistryV2Abi,
      address: environment.deployments.v2.contracts.ethRegistry,
      functionName: "setResolver",
      args: [BigInt(labelhash("v2-write-ready")), permissionedResolver],
    },
    "Unable to attach the permissioned resolver fixture",
    "owner",
  );
  yield* seedTransaction(
    environment,
    {
      abi: permissionedResolverV2Abi,
      address: permissionedResolver,
      functionName: "authorizeTextRoles",
      args: [
        bytesToHex(packetToBytes(permissionedName)),
        permissionedTextKey,
        environment.accounts.operator,
        true,
      ],
    },
    "Unable to grant the scoped permissioned resolver role",
    "owner",
  );
  yield* seedTransaction(
    environment,
    {
      abi: nameWrapperV1Abi,
      address: environment.deployments.v1.contracts.nameWrapper,
      functionName: "setApprovalForAll",
      args: [environment.accounts.operator, true],
    },
    "Unable to approve the ENS v1 wrapper operator",
    "owner",
  );
  yield* seedTransaction(
    environment,
    {
      abi: publicResolverV1Abi,
      address: environment.deployments.v1.contracts.publicResolver,
      functionName: "approve",
      args: [v1Node, environment.accounts.operator, true],
    },
    "Unable to approve the ENS v1 resolver delegate",
    "owner",
  );
  yield* seedTransaction(
    environment,
    {
      abi: ethRegistryV2Abi,
      address: environment.deployments.v2.contracts.ethRegistry,
      functionName: "setApprovalForAll",
      args: [environment.accounts.operator, true],
    },
    "Unable to approve the ENS v2 registry operator",
    "owner",
  );
  yield* seedTransaction(
    environment,
    {
      abi: ethRegistryV2Abi,
      address: environment.deployments.v2.contracts.ethRegistry,
      functionName: "grantRoles",
      args: [v2TokenId, registryRoles.setResolver, environment.accounts.operator],
    },
    "Unable to grant the scoped ENS v2 resolver role",
    "owner",
  );
  yield* seedTransaction(
    environment,
    {
      abi: publicResolverV2Abi,
      address: environment.deployments.v2.contracts.publicResolver,
      functionName: "approve",
      args: [v2Node, environment.accounts.operator, true],
    },
    "Unable to approve the ENS v2 resolver delegate",
    "owner",
  );

  return {
    operator: environment.accounts.operator,
    unauthorized: environment.accounts.unauthorized,
    v1: {
      resolverDelegate: { name: "v1-unwrapped.eth", node: v1Node },
      tokenApproval: { name: "v1-unwrapped.eth", tokenId: v1TokenId },
      wrapperOperator: true,
    },
    v2: {
      registryOperator: true,
      resolverDelegate: { name: "v2-migrated-locked.eth", node: v2Node },
      scopedRole: {
        name: "v2-active.eth",
        role: registryRoles.setResolver,
        tokenId: v2TokenId,
      },
      permissionedResolver: {
        name: permissionedName,
        resolver: permissionedResolver,
        resource: permissionedResource,
        role: resolverRoles.setText,
        textKey: permissionedTextKey,
      },
    },
  } satisfies PermissionFixtureManifest;
});
