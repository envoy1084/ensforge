import { Schema } from "effect";

import { Hex } from "./hex.js";

export const AddressRecordData = Hex.pipe(Schema.brand("AddressRecordData"));

export type AddressRecordData = typeof AddressRecordData.Type;

export const ContentHash = Hex.pipe(Schema.brand("ContentHash"));

export type ContentHash = typeof ContentHash.Type;

export const ContentHashProtocol = Schema.Literals([
  "ipfs",
  "ipns",
  "swarm",
  "onion",
  "onion3",
  "skynet",
  "arweave",
  "adnl",
]);

export type ContentHashProtocol = typeof ContentHashProtocol.Type;
