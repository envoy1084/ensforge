import { Schema } from "effect";

const HexBytes = Schema.String.pipe(
  Schema.check(
    Schema.isPattern(/^0x(?:[0-9a-fA-F]{2})*$/, {
      message: "Expected byte-aligned hexadecimal data",
    }),
  ),
);

export const AddressRecordData = HexBytes.pipe(Schema.brand("AddressRecordData"));

export type AddressRecordData = typeof AddressRecordData.Type;

export const ContentHash = HexBytes.pipe(Schema.brand("ContentHash"));

export type ContentHash = typeof ContentHash.Type;

export const ContentHashCodec = Schema.Literals([
  "ipfs",
  "ipns",
  "swarm",
  "onion",
  "onion3",
  "skynet",
  "arweave",
  "adnl",
]);

export type ContentHashCodec = typeof ContentHashCodec.Type;
