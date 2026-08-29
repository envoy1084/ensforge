import { Schema } from "effect";

import type { BlockParameters } from "../../../action/block.js";
import type { CodecError } from "../../../errors/codec-error.js";
import { Hex } from "../../../schemas/hex.js";
import { EthereumAddress } from "../../../schemas/identity.js";
import { NormalizedName } from "../../../schemas/name.js";
import type { GetResolverError } from "../get-resolver/types.js";

export type GetAliasParameters = { readonly name: string } & BlockParameters;

export const AliasResult = Schema.Union([
  Schema.Struct({
    supported: Schema.Literal(false),
    name: NormalizedName,
    resolver: Schema.NullOr(EthereumAddress),
    reason: Schema.Literals(["RESOLVER_NOT_FOUND", "ALIASING_UNSUPPORTED"]),
  }),
  Schema.Struct({
    supported: Schema.Literal(true),
    name: NormalizedName,
    resolver: EthereumAddress,
    target: Schema.NullOr(NormalizedName),
    raw: Hex,
  }),
]);
export type AliasResult = typeof AliasResult.Type;

export type GetAliasError = GetResolverError | CodecError;
