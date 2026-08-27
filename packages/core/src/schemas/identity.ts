import { Schema } from "effect";

import { Namehash } from "./hash.js";
import { NormalizedName } from "./name.js";

const uint256 = Schema.makeFilter<bigint>((value) =>
  value >= 0n && value < 1n << 256n ? true : "Expected a uint256 registry resource",
);

export const RegistryResource = Schema.BigInt.pipe(
  Schema.check(uint256),
  Schema.brand("RegistryResource"),
);

export type RegistryResource = typeof RegistryResource.Type;

export const CanonicalNameIdentity = Schema.Struct({
  name: NormalizedName,
  namehash: Namehash,
  chainId: Schema.Int.pipe(
    Schema.check(Schema.isGreaterThanOrEqualTo(0, { message: "Expected a non-negative chain ID" })),
  ),
  registry: Schema.String.pipe(
    Schema.check(
      Schema.isPattern(/^0x[0-9a-fA-F]{40}$/, {
        message: "Expected an Ethereum registry address",
      }),
    ),
  ),
  protocol: Schema.Literals(["v1", "v2"]),
  resource: Schema.optional(RegistryResource),
});

export type CanonicalNameIdentity = typeof CanonicalNameIdentity.Type;
