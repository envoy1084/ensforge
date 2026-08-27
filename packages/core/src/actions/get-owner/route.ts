import { Effect, Predicate } from "effect";

import type { EnsV1Deployment, EnsV2Deployment } from "@ensforge/contracts/deployments";
import { ethRegistryV2Abi, ethRenewerV1Abi, universalResolverV2Abi } from "@ensforge/contracts/v2";
import { isAddress, isAddressEqual, zeroAddress } from "viem";

import type { BlockParameters } from "../../action/block.js";
import type { CodecError } from "../../errors/codec-error.js";
import { ContractError } from "../../errors/contract-error.js";
import { viemErrorToEffectError, type ViemError } from "../../errors/viem-error.js";
import { EthereumClient } from "../../internal/client/ethereum-client.js";
import { analyzeName } from "../../names/analyze.js";
import { dnsEncodeName } from "../../names/dns.js";
import { labelhash } from "../../names/hashes.js";
import type { NormalizedName } from "../../schemas/name.js";
import type { OwnerResult } from "./types.js";
import { interpretV1Owner, makeV1OwnerCalls } from "./v1.js";

const routeEthOwner = Effect.fn("routeEthOwner")(function* (
  name: NormalizedName,
  label: string,
  v1: EnsV1Deployment,
  v2: EnsV2Deployment,
  block: BlockParameters,
): Effect.fn.Return<OwnerResult | null, CodecError | ContractError | ViemError, EthereumClient> {
  const ethereum = yield* EthereumClient;
  const dnsName = yield* dnsEncodeName.effect(name);
  const ownerId = BigInt(labelhash(label));
  const v1Calls = makeV1OwnerCalls(name, v1);
  const results = yield* ethereum.multicall({
    contracts: [
      {
        address: v2.contracts.universalResolver,
        abi: universalResolverV2Abi,
        functionName: "findOwner",
        args: [dnsName],
      },
      {
        address: v2.contracts.ethRegistry,
        abi: ethRegistryV2Abi,
        functionName: "getState",
        args: [ownerId],
      },
      {
        address: v2.migration.ethRenewerV1,
        abi: ethRenewerV1Abi,
        functionName: "isRenewable",
        args: [label],
      },
      ...v1Calls,
    ],
    allowFailure: true,
    ...block,
  });

  const ownerResult = results[0];
  if (ownerResult === undefined) {
    return yield* new ContractError({
      code: "DECODE_FAILED",
      message: "Missing ENSv2 owner routing result",
      cause: ownerResult,
    });
  }
  if (ownerResult.status === "failure") {
    return yield* viemErrorToEffectError(ownerResult.error, "multicall");
  }
  if (!Predicate.isString(ownerResult.result) || !isAddress(ownerResult.result)) {
    return yield* new ContractError({
      code: "DECODE_FAILED",
      message: "Invalid ENSv2 owner routing address",
      cause: ownerResult.result,
    });
  }
  if (!isAddressEqual(ownerResult.result, zeroAddress)) {
    return {
      name,
      owner: ownerResult.result,
      registrant: null,
      protocol: "v2",
      ownershipLevel: "registry",
    };
  }

  const stateResult = results[1];
  if (stateResult === undefined) {
    return yield* new ContractError({
      code: "DECODE_FAILED",
      message: "Missing ETH registry state result",
      cause: stateResult,
    });
  }
  if (stateResult.status === "failure") {
    return yield* viemErrorToEffectError(stateResult.error, "multicall");
  }
  const state = stateResult.result;

  const renewableResult = results[2];
  if (renewableResult === undefined) {
    return yield* new ContractError({
      code: "DECODE_FAILED",
      message: "Missing V1 renewal eligibility result",
      cause: renewableResult,
    });
  }
  if (renewableResult.status === "failure") {
    return yield* viemErrorToEffectError(renewableResult.error, "multicall");
  }
  const renewable = renewableResult.result;

  if (
    !Predicate.isObject(state) ||
    !Predicate.hasProperty(state, "status") ||
    !Predicate.hasProperty(state, "latestOwner") ||
    !Predicate.isNumber(state.status) ||
    !Predicate.isString(state.latestOwner) ||
    !isAddress(state.latestOwner) ||
    !Predicate.isBoolean(renewable)
  ) {
    return yield* new ContractError({
      code: "DECODE_FAILED",
      message: "Invalid ENSv2 ETH ownership routing state",
      cause: { state, renewable },
    });
  }

  if (state.status === 2 || !isAddressEqual(state.latestOwner, zeroAddress)) {
    return null;
  }

  if (state.status !== 1 && state.status !== 0) {
    return yield* new ContractError({
      code: "DECODE_FAILED",
      message: "Unknown ENSv2 ETH registry status",
      cause: state,
    });
  }

  if (state.status === 0 && !renewable) return null;

  return yield* interpretV1Owner(name, v1, results.slice(3));
});

const routeOtherOwner = Effect.fn("routeOtherOwner")(function* (
  name: NormalizedName,
  v1: EnsV1Deployment,
  v2: EnsV2Deployment,
  block: BlockParameters,
): Effect.fn.Return<OwnerResult | null, CodecError | ContractError | ViemError, EthereumClient> {
  const ethereum = yield* EthereumClient;
  const dnsName = yield* dnsEncodeName.effect(name);
  const v1Calls = makeV1OwnerCalls(name, v1);
  const results = yield* ethereum.multicall({
    contracts: [
      {
        address: v2.contracts.universalResolver,
        abi: universalResolverV2Abi,
        functionName: "findOwner",
        args: [dnsName],
      },
      {
        address: v2.contracts.universalResolver,
        abi: universalResolverV2Abi,
        functionName: "findParentRegistry",
        args: [dnsName],
      },
      {
        address: v2.contracts.universalResolver,
        abi: universalResolverV2Abi,
        functionName: "findResolver",
        args: [dnsName],
      },
      ...v1Calls,
    ],
    allowFailure: true,
    ...block,
  });

  const ownerResult = results[0];
  if (ownerResult === undefined) {
    return yield* new ContractError({
      code: "DECODE_FAILED",
      message: "Missing ENSv2 owner routing result",
      cause: ownerResult,
    });
  }
  if (ownerResult.status === "failure") {
    return yield* viemErrorToEffectError(ownerResult.error, "multicall");
  }
  if (!Predicate.isString(ownerResult.result) || !isAddress(ownerResult.result)) {
    return yield* new ContractError({
      code: "DECODE_FAILED",
      message: "Invalid ENSv2 owner routing address",
      cause: ownerResult.result,
    });
  }
  if (!isAddressEqual(ownerResult.result, zeroAddress)) {
    return {
      name,
      owner: ownerResult.result,
      registrant: null,
      protocol: "v2",
      ownershipLevel: "registry",
    };
  }

  const parentResult = results[1];
  if (parentResult === undefined) {
    return yield* new ContractError({
      code: "DECODE_FAILED",
      message: "Missing ENSv2 parent registry result",
      cause: parentResult,
    });
  }
  if (parentResult.status === "failure") {
    return yield* viemErrorToEffectError(parentResult.error, "multicall");
  }
  if (!Predicate.isString(parentResult.result) || !isAddress(parentResult.result)) {
    return yield* new ContractError({
      code: "DECODE_FAILED",
      message: "Invalid ENSv2 parent registry address",
      cause: parentResult.result,
    });
  }
  const parentRegistry = parentResult.result;

  const resolverResult = results[2];
  if (resolverResult === undefined) {
    return yield* new ContractError({
      code: "DECODE_FAILED",
      message: "Missing ENSv2 resolver routing result",
      cause: resolverResult,
    });
  }
  if (resolverResult.status === "failure") {
    return yield* viemErrorToEffectError(resolverResult.error, "multicall");
  }

  const resolver = Array.isArray(resolverResult.result)
    ? resolverResult.result[0]
    : Predicate.isObject(resolverResult.result) &&
        Predicate.hasProperty(resolverResult.result, "resolver")
      ? resolverResult.result.resolver
      : undefined;

  if (!Predicate.isString(resolver) || !isAddress(resolver)) {
    return yield* new ContractError({
      code: "DECODE_FAILED",
      message: "Invalid ENSv2 resolver routing address",
      cause: resolverResult.result,
    });
  }

  const usesV1Mirror = isAddressEqual(resolver, v2.migration.ensV1Resolver);
  const hasV2ParentRegistry = !isAddressEqual(parentRegistry, zeroAddress);

  if (!usesV1Mirror && hasV2ParentRegistry) return null;

  return yield* interpretV1Owner(name, v1, results.slice(3));
});

export const routeOwner = Effect.fn("routeOwner")(function* (
  name: NormalizedName,
  v1: EnsV1Deployment,
  v2: EnsV2Deployment,
  block: BlockParameters,
): Effect.fn.Return<OwnerResult | null, CodecError | ContractError | ViemError, EthereumClient> {
  const secondLevelLabel = analyzeName(name).ethSecondLevelLabel;

  return secondLevelLabel === undefined
    ? yield* routeOtherOwner(name, v1, v2, block)
    : yield* routeEthOwner(name, secondLevelLabel, v1, v2, block);
});
