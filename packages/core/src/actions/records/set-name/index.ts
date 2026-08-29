import { Effect } from "effect";

import { publicResolverV1SetNameAbi } from "@ensforge/contracts/v1";
import { encodeFunctionData } from "viem";

import { ContractError } from "../../../errors/contract-error.js";
import { makeResolverWriteAction } from "../../../internal/write/resolver-write-action.js";
import { normalizeName } from "../../../names/normalize.js";
import type { SetNameParameters } from "./types.js";

export const setName = makeResolverWriteAction<SetNameParameters>({
  operation: "setName",
  records: () => [{ type: "name" }],
  encode: (parameters, context) =>
    Effect.gen(function* () {
      const value =
        parameters.value.length === 0 ? "" : yield* normalizeName.effect(parameters.value);
      return yield* Effect.try({
        try: () =>
          encodeFunctionData({
            abi: publicResolverV1SetNameAbi,
            functionName: "setName",
            args: [context.node, value],
          }),
        catch: (cause) =>
          new ContractError({
            code: "ENCODE_FAILED",
            message: `Unable to encode the setName call for ${context.name}`,
            cause,
          }),
      });
    }),
});

export type { SetNameError, SetNameParameters, SetNameResult } from "./types.js";
