import { Effect, Predicate } from "effect";

import type { EnsV1Deployment } from "@ensforge/contracts/deployments";
import { baseRegistrarV1Abi, ensRegistryV1Abi, nameWrapperV1Abi } from "@ensforge/contracts/v1";
import {
  BaseError,
  ContractFunctionRevertedError,
  isAddress,
  isAddressEqual,
  zeroAddress,
  type Address,
  type ContractFunctionParameters,
} from "viem";

import type { BlockParameters } from "../../action/block.js";
import { ContractError } from "../../errors/contract-error.js";
import { viemErrorToEffectError, type ViemError } from "../../errors/viem-error.js";
import { EthereumClient } from "../../internal/client/ethereum-client.js";
import { analyzeName } from "../../names/analyze.js";
import { labelhash, namehash } from "../../names/hashes.js";
import type { NormalizedName } from "../../schemas/name.js";
import type { OwnerResult } from "./types.js";

type OwnerCallResult =
  | { readonly status: "success"; readonly result: unknown }
  | { readonly status: "failure"; readonly error: Error };

export const makeV1OwnerCalls = (
  name: NormalizedName,
  deployment: EnsV1Deployment,
): readonly ContractFunctionParameters[] => {
  const analysis = analyzeName(name);
  const node = namehash(name);
  const commonCalls = [
    {
      address: deployment.contracts.registry,
      abi: ensRegistryV1Abi,
      functionName: "owner",
      args: [node],
    },
    {
      address: deployment.contracts.nameWrapper,
      abi: nameWrapperV1Abi,
      functionName: "ownerOf",
      args: [BigInt(node)],
    },
  ] as const;

  if (!analysis.isSecondLevelEth || analysis.label === undefined) return commonCalls;

  return [
    ...commonCalls,
    {
      address: deployment.contracts.baseRegistrar,
      abi: baseRegistrarV1Abi,
      functionName: "ownerOf",
      args: [BigInt(labelhash(analysis.label))],
    },
  ] as const;
};

export const interpretV1Owner = Effect.fn("interpretV1Owner")(function* (
  name: NormalizedName,
  deployment: EnsV1Deployment,
  results: readonly OwnerCallResult[],
): Effect.fn.Return<OwnerResult | null, ContractError | ViemError> {
  const registryResult = results[0];
  if (registryResult === undefined) {
    return yield* new ContractError({
      code: "DECODE_FAILED",
      message: "Missing ENS registry ownership result",
      cause: registryResult,
    });
  }
  if (registryResult.status === "failure") {
    return yield* viemErrorToEffectError(registryResult.error, "multicall");
  }
  if (!Predicate.isString(registryResult.result) || !isAddress(registryResult.result)) {
    return yield* new ContractError({
      code: "DECODE_FAILED",
      message: "Invalid ENS registry owner address",
      cause: registryResult.result,
    });
  }
  const registryOwner: Address | null = isAddressEqual(registryResult.result, zeroAddress)
    ? null
    : registryResult.result;

  const wrapperResult = results[1];
  if (wrapperResult === undefined) {
    return yield* new ContractError({
      code: "DECODE_FAILED",
      message: "Missing Name Wrapper ownership result",
      cause: wrapperResult,
    });
  }
  if (wrapperResult.status === "failure") {
    return yield* viemErrorToEffectError(wrapperResult.error, "multicall");
  }
  if (!Predicate.isString(wrapperResult.result) || !isAddress(wrapperResult.result)) {
    return yield* new ContractError({
      code: "DECODE_FAILED",
      message: "Invalid Name Wrapper owner address",
      cause: wrapperResult.result,
    });
  }
  const nameWrapperOwner: Address | null = isAddressEqual(wrapperResult.result, zeroAddress)
    ? null
    : wrapperResult.result;

  const analysis = analyzeName(name);
  let registrarOwner: Address | null = null;

  if (analysis.isSecondLevelEth) {
    const registrarResult = results[2];
    if (registrarResult === undefined) {
      return yield* new ContractError({
        code: "DECODE_FAILED",
        message: "Missing ETH registrar ownership result",
        cause: registrarResult,
      });
    }

    if (registrarResult.status === "failure") {
      const missingToken =
        registrarResult.error instanceof BaseError &&
        registrarResult.error.walk((cause) => cause instanceof ContractFunctionRevertedError) !==
          null;

      if (!missingToken) {
        return yield* viemErrorToEffectError(registrarResult.error, "multicall");
      }
    } else {
      if (!Predicate.isString(registrarResult.result) || !isAddress(registrarResult.result)) {
        return yield* new ContractError({
          code: "DECODE_FAILED",
          message: "Invalid ETH registrar owner address",
          cause: registrarResult.result,
        });
      }
      registrarOwner = isAddressEqual(registrarResult.result, zeroAddress)
        ? null
        : registrarResult.result;
    }
  }

  if (analysis.isEth) {
    if (
      registrarOwner !== null &&
      isAddressEqual(registrarOwner, deployment.contracts.nameWrapper)
    ) {
      return nameWrapperOwner === null
        ? null
        : {
            name,
            owner: nameWrapperOwner,
            registrant: null,
            protocol: "v1",
            ownershipLevel: "nameWrapper",
          };
    }

    if (registrarOwner !== null) {
      return {
        name,
        owner: registryOwner,
        registrant: registrarOwner,
        protocol: "v1",
        ownershipLevel: "registrar",
      };
    }

    if (registryOwner === null) return null;

    if (analysis.isSecondLevelEth) {
      return {
        name,
        owner: registryOwner,
        registrant: null,
        protocol: "v1",
        ownershipLevel: "registrar",
      };
    }

    if (
      isAddressEqual(registryOwner, deployment.contracts.nameWrapper) &&
      nameWrapperOwner !== null
    ) {
      return {
        name,
        owner: nameWrapperOwner,
        registrant: null,
        protocol: "v1",
        ownershipLevel: "nameWrapper",
      };
    }

    return {
      name,
      owner: registryOwner,
      registrant: null,
      protocol: "v1",
      ownershipLevel: "registry",
    };
  }

  if (
    registryOwner !== null &&
    isAddressEqual(registryOwner, deployment.contracts.nameWrapper) &&
    nameWrapperOwner !== null
  ) {
    return {
      name,
      owner: nameWrapperOwner,
      registrant: null,
      protocol: "v1",
      ownershipLevel: "nameWrapper",
    };
  }

  return registryOwner === null
    ? null
    : {
        name,
        owner: registryOwner,
        registrant: null,
        protocol: "v1",
        ownershipLevel: "registry",
      };
});

export const getOwnerV1 = Effect.fn("getOwnerV1")(function* (
  name: NormalizedName,
  deployment: EnsV1Deployment,
  block: BlockParameters,
): Effect.fn.Return<OwnerResult | null, ContractError | ViemError, EthereumClient> {
  const ethereum = yield* EthereumClient;
  const results = yield* ethereum.multicall({
    contracts: makeV1OwnerCalls(name, deployment),
    allowFailure: true,
    ...block,
  });

  return yield* interpretV1Owner(name, deployment, results);
});
