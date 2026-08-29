import { Effect } from "effect";

import { publicResolverV1Abi } from "@ensforge/contracts/v1";
import { encodeFunctionData } from "viem";

import { ContractError } from "../../../errors/contract-error.js";
import { makeResolverWriteAction } from "../../../internal/write/resolver-write-action.js";
import type { ClearAvatarParameters, SetAvatarParameters } from "./types.js";

const encodeAvatar = (node: `0x${string}`, value: string, name: string) =>
  Effect.try({
    try: () =>
      encodeFunctionData({
        abi: publicResolverV1Abi,
        functionName: "setText",
        args: [node, "avatar", value],
      }),
    catch: (cause) =>
      new ContractError({
        code: "ENCODE_FAILED",
        message: `Unable to encode the avatar write for ${name}`,
        cause,
      }),
  });

export const setAvatar = makeResolverWriteAction<SetAvatarParameters>({
  operation: "setAvatar",
  records: () => [{ type: "text", key: "avatar" }],
  encode: (parameters, context) => encodeAvatar(context.node, parameters.value, context.name),
});

export const clearAvatar = makeResolverWriteAction<ClearAvatarParameters>({
  operation: "clearAvatar",
  records: () => [{ type: "text", key: "avatar" }],
  encode: (_parameters, context) => encodeAvatar(context.node, "", context.name),
});

export type {
  ClearAvatarError,
  ClearAvatarParameters,
  ClearAvatarResult,
  SetAvatarError,
  SetAvatarParameters,
  SetAvatarResult,
} from "./types.js";
