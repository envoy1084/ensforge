import { Schema } from "effect";

import type { BlockParameters } from "../../action/block.js";
import type { CodecError } from "../../errors/codec-error.js";
import type { ContractError } from "../../errors/contract-error.js";
import type { NameError } from "../../errors/name-error.js";
import type { RpcError } from "../../errors/rpc-error.js";
import { DnsEncodedName } from "../../schemas/dns.js";
import { Hex } from "../../schemas/hex.js";
import { EthereumAddress } from "../../schemas/identity.js";
import { NormalizedName } from "../../schemas/name.js";

export type DnsReadError = CodecError | ContractError | NameError | RpcError;

export const DnsResource = Schema.Int.pipe(
  Schema.check(
    Schema.isBetween(
      { minimum: 0, maximum: 65_535 },
      { message: "Expected a uint16 DNS resource" },
    ),
  ),
);
export type DnsResource = typeof DnsResource.Type;

export type DnsRecordQuery = { readonly recordName: string; readonly resource: DnsResource };

export type GetDnsRecordParameters = {
  readonly name: string;
  readonly recordName: string;
  readonly resource: DnsResource;
} & BlockParameters;

export const DnsRecordResult = Schema.Struct({
  name: NormalizedName,
  recordName: NormalizedName,
  resource: DnsResource,
  resolver: Schema.NullOr(EthereumAddress),
  value: Schema.NullOr(Hex),
});
export type DnsRecordResult = typeof DnsRecordResult.Type;

export type GetDnsRecordsParameters = {
  readonly name: string;
  readonly records: ReadonlyArray<DnsRecordQuery>;
} & BlockParameters;

export const DnsRecordsResult = Schema.Struct({
  name: NormalizedName,
  resolver: Schema.NullOr(EthereumAddress),
  records: Schema.Array(DnsRecordResult),
});
export type DnsRecordsResult = typeof DnsRecordsResult.Type;

export const DnsRecordsExistence = Schema.Struct({
  name: NormalizedName,
  recordName: NormalizedName,
  resolver: Schema.NullOr(EthereumAddress),
  exists: Schema.Boolean,
});
export type DnsRecordsExistence = typeof DnsRecordsExistence.Type;

export const ZoneHashResult = Schema.Struct({
  name: NormalizedName,
  resolver: Schema.NullOr(EthereumAddress),
  value: Schema.NullOr(Hex),
});
export type ZoneHashResult = typeof ZoneHashResult.Type;

export const DnsClaimStatus = Schema.Union([
  Schema.Struct({
    status: Schema.Literal("unsupported"),
    name: NormalizedName,
    reason: Schema.Literal("DNS_REGISTRAR_UNAVAILABLE"),
  }),
  Schema.Struct({
    status: Schema.Literal("claimed"),
    name: NormalizedName,
    owner: EthereumAddress,
    resolver: Schema.NullOr(EthereumAddress),
    previousInception: Schema.BigInt,
  }),
  Schema.Struct({
    status: Schema.Literal("proof-required"),
    name: NormalizedName,
    previousInception: Schema.BigInt,
  }),
]);
export type DnsClaimStatus = typeof DnsClaimStatus.Type;

export const DnsImportPlan = Schema.Union([
  Schema.Struct({
    status: Schema.Literal("unsupported"),
    name: NormalizedName,
    reason: Schema.Literal("DNS_REGISTRAR_UNAVAILABLE"),
  }),
  Schema.Struct({
    status: Schema.Literal("already-claimed"),
    name: NormalizedName,
    registrar: EthereumAddress,
    oracle: EthereumAddress,
    owner: EthereumAddress,
    resolver: Schema.NullOr(EthereumAddress),
  }),
  Schema.Struct({
    status: Schema.Literal("proof-required"),
    name: NormalizedName,
    registrar: EthereumAddress,
    oracle: EthereumAddress,
    proofRequest: Schema.Struct({
      name: DnsEncodedName,
      previousInception: Schema.BigInt,
    }),
  }),
]);
export type DnsImportPlan = typeof DnsImportPlan.Type;
