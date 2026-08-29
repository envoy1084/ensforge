import { Effect, Schema } from "effect";

import { verifiableFactoryV2DeployProxyAbi } from "@ensforge/contracts/v2";
import { decodeFunctionResult } from "viem";

import { defineAction, defineExtendedAction } from "../../../action/action.js";
import type { EnsforgeConfig } from "../../../config/config.js";
import { ContractError } from "../../../errors/contract-error.js";
import { WritePlanError } from "../../../errors/write-plan-error.js";
import { executeSequential } from "../../../internal/write/execute-sequential.js";
import { EthereumAddress } from "../../../schemas/identity.js";
import { simulateCalls } from "../../batch/simulate-calls.js";
import { createResolverIntent } from "./prepare.js";
import type {
  CreateResolverError,
  CreateResolverParameters,
  CreateResolverResult,
} from "./types.js";

export const predictResolverAddressEffect = Effect.fn("ensforge.predictResolverAddress")(function* (
  config: EnsforgeConfig,
  parameters: CreateResolverParameters,
) {
  const simulation = yield* simulateCalls.effect(config, {
    calls: [createResolverIntent(parameters)],
    ...(parameters.walletClient === undefined ? {} : { walletClient: parameters.walletClient }),
    ...(parameters.account === undefined ? {} : { account: parameters.account }),
  });
  const raw = simulation[0]?.result;
  if (raw === undefined) {
    return yield* new ContractError({
      code: "DECODE_FAILED",
      message: "Resolver deployment simulation returned no address",
      cause: simulation,
    });
  }
  return yield* Effect.try({
    try: () =>
      Schema.decodeUnknownSync(EthereumAddress)(
        decodeFunctionResult({
          abi: verifiableFactoryV2DeployProxyAbi,
          functionName: "deployProxy",
          data: raw,
        }),
      ),
    catch: (cause) =>
      new ContractError({
        code: "DECODE_FAILED",
        message: "Unable to decode the predicted Permissioned Resolver address",
        cause,
      }),
  });
});

export const predictResolverAddress = defineAction<
  CreateResolverParameters,
  typeof EthereumAddress.Type,
  CreateResolverError
>(predictResolverAddressEffect);

const implementation = Effect.fn("ensforge.createResolver")(function* (
  config: EnsforgeConfig,
  parameters: CreateResolverParameters,
) {
  const resolver = yield* predictResolverAddressEffect(config, parameters);
  const result = yield* executeSequential(config, {
    calls: [createResolverIntent(parameters)],
    ...(parameters.walletClient === undefined ? {} : { walletClient: parameters.walletClient }),
    ...(parameters.account === undefined ? {} : { account: parameters.account }),
    ...(parameters.confirmation === undefined ? {} : { confirmation: parameters.confirmation }),
  });
  const call = result.calls[0];
  if (call === undefined) {
    return yield* new WritePlanError({
      code: "INVALID_CALL_PLAN",
      message: "createResolver did not produce an execution result",
      cause: result,
    });
  }
  const deployment = config.deployments;
  if (deployment.protocol !== "v2") {
    return yield* new WritePlanError({
      code: "INVALID_CALL_PLAN",
      message: "Permissioned Resolver creation requires an ENSv2 deployment",
      cause: deployment,
    });
  }
  return {
    status: "deployed",
    resolver,
    implementation: deployment.v2.implementations.permissionedResolver,
    factory: deployment.v2.contracts.verifiableFactory,
    call,
  } satisfies CreateResolverResult;
});

const action = defineExtendedAction<
  CreateResolverParameters,
  CreateResolverResult,
  CreateResolverError
>(implementation);

export const createResolver = Object.freeze(
  Object.defineProperty(action, "call", {
    value: createResolverIntent,
    enumerable: true,
    configurable: false,
    writable: false,
  }),
) as typeof action & { readonly call: typeof createResolverIntent };

export { prepareCreateResolver } from "./prepare.js";
export type {
  CreateResolverError,
  CreateResolverIntent,
  CreateResolverParameters,
  CreateResolverResult,
} from "./types.js";
