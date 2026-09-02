import { Schema } from "effect";

import { Labelhash, Namehash } from "../../../schemas/hash.js";
import { EthereumAddress } from "../../../schemas/identity.js";
import { NormalizedName } from "../../../schemas/name.js";
import { IndexedEntitySource } from "./source.js";

const NonNegativeInt = Schema.Int.pipe(Schema.check(Schema.isGreaterThanOrEqualTo(0)));

export const IndexedNameValue = Schema.Union([
  Schema.Struct({ kind: Schema.Literal("normalized"), value: NormalizedName }),
  Schema.Struct({ kind: Schema.Literal("encoded"), value: Schema.String }),
  Schema.Struct({ kind: Schema.Literal("unknown"), value: Schema.Null }),
]);
export type IndexedNameValue = typeof IndexedNameValue.Type;

export const NameRelation = Schema.Literals([
  "owner",
  "registry-owner",
  "registrant",
  "wrapped-owner",
  "resolved-address",
]);
export type NameRelation = typeof NameRelation.Type;

export const IndexedToken = Schema.Struct({
  standard: Schema.Literals(["erc721", "erc1155"]),
  contract: EthereumAddress,
  tokenId: Schema.BigInt,
  owner: Schema.NullOr(EthereumAddress),
});
export type IndexedToken = typeof IndexedToken.Type;

export const IndexedNameRegistration = Schema.Struct({
  registrant: EthereumAddress,
  registeredAt: Schema.BigInt,
  expiry: Schema.BigInt,
});
export type IndexedNameRegistration = typeof IndexedNameRegistration.Type;

export const IndexedWrappedName = Schema.Struct({
  owner: EthereumAddress,
  fuses: Schema.BigInt,
  expiry: Schema.NullOr(Schema.BigInt),
});
export type IndexedWrappedName = typeof IndexedWrappedName.Type;

const commonNameFields = {
  namehash: Namehash,
  name: IndexedNameValue,
  label: Schema.NullOr(Schema.String),
  labelhash: Schema.NullOr(Labelhash),
  parentNamehash: Schema.NullOr(Namehash),
  owner: EthereumAddress,
  resolver: Schema.NullOr(EthereumAddress),
  resolvedAddress: Schema.NullOr(EthereumAddress),
  createdAt: Schema.BigInt,
  expiry: Schema.NullOr(Schema.BigInt),
  subnameCount: NonNegativeInt,
  isMigrated: Schema.Boolean,
  source: IndexedEntitySource,
};

export const IndexedNameV1 = Schema.Struct({
  ...commonNameFields,
  protocol: Schema.Literal("v1"),
  registryOwner: Schema.NullOr(EthereumAddress),
  registrant: Schema.NullOr(EthereumAddress),
  ttl: Schema.NullOr(Schema.BigInt),
  registration: Schema.NullOr(IndexedNameRegistration),
  wrapped: Schema.NullOr(IndexedWrappedName),
});
export type IndexedNameV1 = typeof IndexedNameV1.Type;

export const IndexedNameV2 = Schema.Struct({
  ...commonNameFields,
  protocol: Schema.Literal("v2"),
  registry: Schema.NullOr(EthereumAddress),
  subregistry: Schema.NullOr(EthereumAddress),
  canonicalId: Schema.NullOr(Schema.BigInt),
  token: Schema.NullOr(IndexedToken),
  tokenVersion: Schema.NullOr(NonNegativeInt),
  registeredAt: Schema.NullOr(Schema.BigInt),
  gracePeriodEnd: Schema.NullOr(Schema.BigInt),
  unreachableSince: Schema.NullOr(Schema.BigInt),
  isNormalized: Schema.Boolean,
  isReachable: Schema.Boolean,
  isWrapped: Schema.Boolean,
  roleHolderCount: NonNegativeInt,
});
export type IndexedNameV2 = typeof IndexedNameV2.Type;

export const IndexedName = Schema.Union([IndexedNameV1, IndexedNameV2]);
export type IndexedName = typeof IndexedName.Type;
