import { Effect } from "effect";

import { publicResolverV1Abi } from "@ensforge/contracts/v1";
import { encodeFunctionData } from "viem";

import {
  defineWriteAction,
  makeWriteIntent,
  type EnsWriteIntentPreparer,
} from "../../../action/write-intent.js";
import type { EnsforgeConfig } from "../../../config/config.js";
import { AuthorizationError } from "../../../errors/authorization-error.js";
import { ContractError } from "../../../errors/contract-error.js";
import { WritePlanError } from "../../../errors/write-plan-error.js";
import { normalizeName } from "../../../names/normalize.js";
import type { EthereumAddress } from "../../../schemas/identity.js";
import type { WriteError } from "../../../write/types.js";
import { sendCalls } from "../../batch/send-calls.js";
import { getRequiredAuthorization } from "../../capabilities/get-required-authorization/index.js";
import type { SetTextError, SetTextParameters, SetTextResult } from "./types.js";

const prepareSetText: EnsWriteIntentPreparer<SetTextParameters, SetTextError> = Effect.fn(
  "ensforge.setText.prepare",
)(function* (config, parameters, context) {
  const name = yield* normalizeName.effect(parameters.name);
  const account = (
    typeof context.account === "string" ? context.account : context.account.address
  ) as EthereumAddress;
  const authorization = yield* getRequiredAuthorization.effect(config, {
    name,
    account,
    operation: { type: "text", key: parameters.key },
  });
  const target = authorization.target;

  if (!target.available) {
    return yield* new AuthorizationError({
      code: "WRITE_TARGET_UNAVAILABLE",
      message: `No writable resolver is available for ${name}`,
    });
  }

  if (authorization.blockers.includes("OPERATION_UNSUPPORTED")) {
    return yield* new AuthorizationError({
      code: "RECORD_UNSUPPORTED",
      message: `The resolver for ${name} does not support text records`,
    });
  }

  if (authorization.authorization.status === "unauthorized") {
    return yield* new AuthorizationError({
      code: "UNAUTHORIZED",
      message: `${account} is not authorized to set the ${parameters.key} text record for ${name}`,
    });
  }

  const data = yield* Effect.try({
    try: () =>
      encodeFunctionData({
        abi: publicResolverV1Abi,
        functionName: "setText",
        args: [target.node, parameters.key, parameters.value],
      }),
    catch: (cause) =>
      new ContractError({
        code: "ENCODE_FAILED",
        message: `Unable to encode the setText call for ${name}`,
        cause,
      }),
  });

  return {
    to: target.address,
    data,
    value: 0n,
    protocol: target.protocol,
  };
});

const setTextEffect = Effect.fn("ensforge.setText")(function* (
  config: EnsforgeConfig,
  parameters: SetTextParameters,
) {
  const intent = makeWriteIntent<SetTextParameters, SetTextResult, WriteError>(
    "setText",
    parameters,
    prepareSetText,
  );
  const result = yield* sendCalls.effect(config, {
    calls: [intent],
    mode: "sequential",
  });
  const call = result.calls[0];
  if (call === undefined) {
    return yield* new WritePlanError({
      code: "INVALID_CALL_PLAN",
      message: "The setText write did not produce an execution result",
      cause: result,
    });
  }
  return call;
});

export const setText = defineWriteAction<SetTextParameters, SetTextResult, SetTextError>(
  "setText",
  setTextEffect,
  prepareSetText,
);

export type { SetTextError, SetTextParameters, SetTextResult } from "./types.js";
