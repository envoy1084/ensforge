import { Effect, Schema } from "effect";

import { defineReadAction } from "../../action/read-request.js";
import type { EnsforgeConfig } from "../../config/config.js";
import { CodecError } from "../../errors/codec-error.js";
import { isContractRevert } from "../../errors/viem-error.js";
import { executeRead } from "../../internal/read/execute-read.js";
import { reverseAddress } from "../../internal/resolver/reverse-address.js";
import { normalizeName } from "../../names/normalize.js";
import { EthereumAddress } from "../../schemas/identity.js";
import type { GetPrimaryNameError, GetPrimaryNameParameters, PrimaryNameResult } from "./types.js";

const getPrimaryNameEffect = Effect.fn("ensforge.getPrimaryName")(function* (
  config: EnsforgeConfig,
  parameters: GetPrimaryNameParameters,
) {
  const address = yield* Effect.try({
    try: () => Schema.decodeUnknownSync(EthereumAddress)(parameters.address),
    catch: () =>
      new CodecError({
        code: "INVALID_ADDRESS",
        message: `Invalid Ethereum address: ${parameters.address}`,
      }),
  });
  const resolved = yield* executeRead(config, parameters, reverseAddress(address)).pipe(
    Effect.catchIf(
      (error) =>
        isContractRevert(error.cause, "ResolverNotFound") ||
        isContractRevert(error.cause, "ReverseAddressMismatch"),
      () => Effect.succeed(null),
    ),
  );

  if (resolved === null || resolved[0].length === 0) return null;

  const name = yield* normalizeName.effect(resolved[0]);
  return { name, match: true } as const;
});

export const getPrimaryName = defineReadAction<
  GetPrimaryNameParameters,
  PrimaryNameResult,
  GetPrimaryNameError
>(getPrimaryNameEffect);

export {
  type GetPrimaryNameError,
  type GetPrimaryNameParameters,
  PrimaryNameResult,
} from "./types.js";
