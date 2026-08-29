import { Effect } from "effect";

import { publicResolverV1Abi } from "@ensforge/contracts/v1";
import { encodeFunctionData } from "viem";

import { CodecError } from "../../../errors/codec-error.js";
import { ContractError } from "../../../errors/contract-error.js";
import { makeResolverWriteAction } from "../../../internal/write/resolver-write-action.js";
import { encodeAddressRecord } from "../../../names/address-record.js";
import type { AddressRecordInput, SetAddressParameters, SetAddressesParameters } from "./types.js";

const ethereumCoinType = 60n;

const encodeAddressCall = (node: `0x${string}`, record: AddressRecordInput) =>
  encodeFunctionData({
    abi: publicResolverV1Abi,
    functionName: "setAddr",
    args: [
      node,
      record.coinType,
      encodeAddressRecord({ coinType: record.coinType, address: record.address }),
    ],
  });

const encodeError = (cause: unknown, message: string) =>
  cause instanceof CodecError
    ? cause
    : new ContractError({ code: "ENCODE_FAILED", message, cause });

export const setAddress = makeResolverWriteAction<SetAddressParameters>({
  operation: "setAddress",
  records: (parameters) => [{ type: "address", coinType: parameters.coinType ?? ethereumCoinType }],
  encode: (parameters, context) =>
    Effect.try({
      try: () =>
        encodeAddressCall(context.node, {
          coinType: parameters.coinType ?? ethereumCoinType,
          address: parameters.address,
        }),
      catch: (cause) =>
        encodeError(cause, `Unable to encode the setAddress call for ${context.name}`),
    }),
});

export const setAddresses = makeResolverWriteAction<SetAddressesParameters>({
  operation: "setAddresses",
  records: (parameters) =>
    parameters.addresses.map((record) => ({
      type: "address" as const,
      coinType: record.coinType,
    })),
  encode: (parameters, context) =>
    Effect.try({
      try: () => {
        const calls = parameters.addresses.map((record) => encodeAddressCall(context.node, record));
        return encodeFunctionData({
          abi: publicResolverV1Abi,
          functionName: "multicall",
          args: [calls],
        });
      },
      catch: (cause) =>
        encodeError(cause, `Unable to encode the setAddresses call for ${context.name}`),
    }),
});

export type {
  AddressRecordInput,
  SetAddressError,
  SetAddressesError,
  SetAddressesParameters,
  SetAddressesResult,
  SetAddressParameters,
  SetAddressResult,
} from "./types.js";
