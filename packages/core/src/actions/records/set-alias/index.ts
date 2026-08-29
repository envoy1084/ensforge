import { Effect } from "effect";

import { permissionedResolverV2InterfaceSetAliasAbi } from "@ensforge/contracts/v2";
import { encodeFunctionData } from "viem";

import { ContractError } from "../../../errors/contract-error.js";
import { makeResolverWriteAction } from "../../../internal/write/resolver-write-action.js";
import { dnsEncodeName } from "../../../names/dns.js";
import type { SetAliasParameters } from "./types.js";

export const setAlias = makeResolverWriteAction<SetAliasParameters>({
  operation: "setAlias",
  records: () => [{ type: "alias" }],
  encode: (parameters, context) =>
    Effect.gen(function* () {
      const fromName = yield* dnsEncodeName.effect(context.name);
      const toName =
        parameters.target === null ? "0x" : yield* dnsEncodeName.effect(parameters.target);
      return yield* Effect.try({
        try: () =>
          encodeFunctionData({
            abi: permissionedResolverV2InterfaceSetAliasAbi,
            functionName: "setAlias",
            args: [fromName, toName],
          }),
        catch: (cause) =>
          new ContractError({
            code: "ENCODE_FAILED",
            message: `Unable to encode the setAlias call for ${context.name}`,
            cause,
          }),
      });
    }),
});

export type { SetAliasError, SetAliasParameters, SetAliasResult } from "./types.js";
