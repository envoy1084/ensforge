import { Effect } from "effect";

import type { EnsV1Deployment, EnsV2Deployment } from "@ensforge/contracts/deployments";
import { nameWrapperV1Abi } from "@ensforge/contracts/v1";
import { permissionedRegistryV2InterfaceAbi } from "@ensforge/contracts/v2";
import { zeroAddress } from "viem";

import type { EnsforgeConfig } from "../../config/config.js";
import { NameError } from "../../errors/name-error.js";
import { EthereumClient } from "../../internal/client/ethereum-client.js";
import { readNameRoute } from "../../internal/name/name-route.js";
import { executeRead } from "../../internal/read/execute-read.js";
import { analyzeName } from "../../names/analyze.js";
import { labelhash, namehash } from "../../names/hashes.js";
import { normalizeName } from "../../names/normalize.js";
import type { EthereumAddress } from "../../schemas/identity.js";
import type { NormalizedName } from "../../schemas/name.js";
import type { WriteError } from "../../write/types.js";

interface SharedRoute {
  readonly name: NormalizedName;
  readonly parent: NormalizedName;
  readonly label: string;
  readonly node: `0x${string}`;
  readonly parentNode: `0x${string}`;
  readonly labelhash: `0x${string}`;
}

export interface V1SubnameRoute extends SharedRoute {
  readonly protocol: "v1";
  readonly deployment: EnsV1Deployment;
  readonly parentWrapped: boolean;
  readonly parentExpiry: bigint;
  readonly childWrapped: boolean;
  readonly childFuses: number;
  readonly childExpiry: bigint;
}

export interface V2SubnameRoute extends SharedRoute {
  readonly protocol: "v2";
  readonly deployment: EnsV2Deployment;
  readonly parentRegistry: EthereumAddress;
  readonly parentTokenId: bigint;
  readonly parentExpiry: bigint;
  readonly subregistry: EthereumAddress | null;
  readonly childState: {
    readonly status: number;
    readonly expiry: bigint;
    readonly latestOwner: EthereumAddress;
    readonly tokenId: bigint;
    readonly resource: bigint;
  } | null;
}

export type SubnameRoute = V1SubnameRoute | V2SubnameRoute;

export const resolveSubnameRoute = Effect.fn("ensforge.resolveSubnameRoute")(function* (
  config: EnsforgeConfig,
  input: string,
): Effect.fn.Return<SubnameRoute, WriteError> {
  const name = yield* normalizeName.effect(input);
  const analysis = analyzeName(name);
  if (
    analysis.kind !== "subname" ||
    analysis.parent === undefined ||
    analysis.label === undefined
  ) {
    return yield* new NameError({
      code: "INVALID_NAME",
      message: `${name} is not a subname`,
    });
  }
  const parent = analysis.parent;
  const label = analysis.label;
  return yield* executeRead(
    config,
    {},
    Effect.gen(function* () {
      const ethereum = yield* EthereumClient;
      const parentRoute = yield* readNameRoute(parent);
      const shared = {
        name,
        parent,
        label,
        node: namehash(name),
        parentNode: namehash(parent),
        labelhash: labelhash(label),
      } as const;
      if (parentRoute.kind === "v1" || parentRoute.kind === "reserved") {
        const deployment =
          parentRoute.kind === "reserved" ? parentRoute.v1 : parentRoute.deployment;
        const [parentWrapped, childWrapped, parentData, childData] = yield* Effect.all(
          [
            ethereum.readContract({
              address: deployment.contracts.nameWrapper,
              abi: nameWrapperV1Abi,
              functionName: "isWrapped",
              args: [shared.parentNode],
            }),
            ethereum.readContract({
              address: deployment.contracts.nameWrapper,
              abi: nameWrapperV1Abi,
              functionName: "isWrapped",
              args: [shared.node],
            }),
            ethereum.readContract({
              address: deployment.contracts.nameWrapper,
              abi: nameWrapperV1Abi,
              functionName: "getData",
              args: [BigInt(shared.parentNode)],
            }),
            ethereum.readContract({
              address: deployment.contracts.nameWrapper,
              abi: nameWrapperV1Abi,
              functionName: "getData",
              args: [BigInt(shared.node)],
            }),
          ] as const,
          { concurrency: "unbounded" },
        );
        return {
          ...shared,
          protocol: "v1",
          deployment,
          parentWrapped,
          parentExpiry: parentData[2],
          childWrapped,
          childFuses: childData[1],
          childExpiry: childData[2],
        } as const;
      }
      if (parentRoute.kind === "available") {
        return yield* new NameError({
          code: "INVALID_NAME",
          message: `Parent ${parent} is not registered`,
        });
      }
      const subregistryAddress = yield* ethereum.readContract({
        address: parentRoute.parentRegistry,
        abi: permissionedRegistryV2InterfaceAbi,
        functionName: "getSubregistry",
        args: [parentRoute.label],
      });
      const subregistry = subregistryAddress === zeroAddress ? null : subregistryAddress;
      const childState =
        subregistry === null
          ? null
          : yield* ethereum.readContract({
              address: subregistry,
              abi: permissionedRegistryV2InterfaceAbi,
              functionName: "getState",
              args: [BigInt(shared.labelhash)],
            });
      return {
        ...shared,
        protocol: "v2",
        deployment: parentRoute.deployment,
        parentRegistry: parentRoute.parentRegistry,
        parentTokenId: parentRoute.state.tokenId,
        parentExpiry: parentRoute.state.expiry,
        subregistry,
        childState,
      } as const;
    }),
  );
});
