import { Schema } from "effect";

const Bytes32 = Schema.String.pipe(
  Schema.check(
    Schema.isPattern(/^0x[0-9a-fA-F]{64}$/, {
      message: "Expected a 32-byte hexadecimal value",
    }),
  ),
);

export const Namehash = Bytes32.pipe(Schema.brand("Namehash"));

export type Namehash = typeof Namehash.Type;

export const Labelhash = Bytes32.pipe(Schema.brand("Labelhash"));

export type Labelhash = typeof Labelhash.Type;
