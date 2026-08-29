import { Effect } from "effect";

import { publicResolverV1Abi } from "@ensforge/contracts/v1";
import { encodeFunctionData } from "viem";

import { ContractError } from "../../../errors/contract-error.js";
import { makeResolverWriteAction } from "../../../internal/write/resolver-write-action.js";
import type { SetTextsParameters } from "./types.js";

export const setTexts = makeResolverWriteAction<SetTextsParameters>({
  operation: "setTexts",
  records: (parameters) =>
    parameters.texts.map((text) => ({ type: "text", key: text.key }) as const),
  encode: (parameters, context) =>
    Effect.try({
      try: () => {
        const calls = parameters.texts.map((text) =>
          encodeFunctionData({
            abi: publicResolverV1Abi,
            functionName: "setText",
            args: [context.node, text.key, text.value],
          }),
        );
        return encodeFunctionData({
          abi: publicResolverV1Abi,
          functionName: "multicall",
          args: [calls],
        });
      },
      catch: (cause) =>
        new ContractError({
          code: "ENCODE_FAILED",
          message: `Unable to encode the setTexts call for ${context.name}`,
          cause,
        }),
    }),
});

export type {
  SetTextsError,
  SetTextsParameters,
  SetTextsResult,
  TextRecordInput,
} from "./types.js";
