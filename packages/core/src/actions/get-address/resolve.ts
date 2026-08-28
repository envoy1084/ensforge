import { Effect, Schema } from "effect";

import {
  addressResolverAbi,
  addrResolverAbi,
  multicallResolverAbi,
} from "@ensforge/contracts/resolver-profiles";
import { decodeFunctionResult, encodeFunctionData, zeroAddress, type Hex } from "viem";

import { CodecError } from "../../errors/codec-error.js";
import { ContractError } from "../../errors/contract-error.js";
import { isContractRevert } from "../../errors/viem-error.js";
import { resolveName } from "../../internal/resolver/resolve-name.js";
import { decodeAddressRecord } from "../../names/address-record.js";
import { parseCoinType } from "../../names/coin-type.js";
import { dnsEncodeName } from "../../names/dns.js";
import { namehash } from "../../names/hashes.js";
import type { CoinType } from "../../schemas/coin-type.js";
import type { NormalizedName } from "../../schemas/name.js";
import { AddressRecordData } from "../../schemas/records.js";
import { DeploymentService } from "../../services/deployment.js";

const decodeRecord = Effect.fn("decodeAddressResult")(function* (
  coinType: CoinType,
  encodedResult: Hex,
) {
  const raw = yield* Effect.try({
    try: () =>
      Schema.decodeSync(AddressRecordData)(
        coinType === 60n
          ? decodeFunctionResult({
              abi: addrResolverAbi,
              functionName: "addr",
              data: encodedResult,
            })
          : decodeFunctionResult({
              abi: addressResolverAbi,
              functionName: "addr",
              data: encodedResult,
            }),
      ),
    catch: (cause) =>
      new ContractError({
        code: "DECODE_FAILED",
        message: `Unable to decode the address record for coin type ${coinType}`,
        cause,
      }),
  });
  const address = yield* Effect.try({
    try: () => decodeAddressRecord({ coinType, data: raw }),
    catch: (cause) =>
      cause instanceof CodecError
        ? cause
        : new CodecError({
            code: "INVALID_ADDRESS_RECORD",
            message: `Invalid encoded address for coin type ${coinType}`,
          }),
  });

  return address === null || (coinType === 60n && address.toLowerCase() === zeroAddress)
    ? ({ coinType, address: null, raw: null } as const)
    : ({ coinType, address, raw } as const);
});

const encodeAddressCall = (node: Hex, coinType: bigint): Hex => {
  return coinType === 60n
    ? encodeFunctionData({ abi: addrResolverAbi, functionName: "addr", args: [node] })
    : encodeFunctionData({
        abi: addressResolverAbi,
        functionName: "addr",
        args: [node, coinType],
      });
};

export const resolveAddresses = Effect.fn("resolveAddresses")(function* (
  name: NormalizedName,
  coinTypes: ReadonlyArray<bigint>,
) {
  const deployment = yield* DeploymentService;
  const normalizedCoinTypes = yield* Effect.forEach(coinTypes, (coinType) =>
    Effect.try({
      try: () => parseCoinType(coinType),
      catch: (cause) =>
        cause instanceof CodecError
          ? cause
          : new CodecError({
              code: "INVALID_COIN_TYPE",
              message: `Invalid ENS coin type: ${coinType}`,
            }),
    }),
  );

  if (normalizedCoinTypes.length === 0) return [];
  const uniqueCoinTypes = Array.from(
    new Map(normalizedCoinTypes.map((coinType) => [coinType.toString(), coinType])).values(),
  );

  const node = namehash(name);
  const dnsName = yield* dnsEncodeName.effect(name);
  const calls = yield* Effect.try({
    try: () => uniqueCoinTypes.map((coinType) => encodeAddressCall(node, coinType)),
    catch: (cause) =>
      cause instanceof CodecError
        ? cause
        : new ContractError({
            code: "ENCODE_FAILED",
            message: "Unable to encode ENS address resolver calls",
            cause,
          }),
  });
  const firstCall = calls[0];
  if (firstCall === undefined) return [];

  const data =
    calls.length === 1
      ? firstCall
      : yield* Effect.try({
          try: () =>
            encodeFunctionData({
              abi: multicallResolverAbi,
              functionName: "multicall",
              args: [calls],
            }),
          catch: (cause) =>
            new ContractError({
              code: "ENCODE_FAILED",
              message: "Unable to encode the resolver address multicall",
              cause,
            }),
        });
  const protocol = deployment.profile.protocol;
  const universalResolver =
    protocol === "v1"
      ? deployment.profile.v1.contracts.universalResolver
      : deployment.profile.v2.contracts.universalResolver;
  const resolved = yield* resolveName({ universalResolver, protocol, name: dnsName, data }).pipe(
    Effect.catchIf(
      (error) => isContractRevert(error.cause, "ResolverNotFound"),
      () => Effect.succeed(null),
    ),
  );

  if (resolved === null) {
    return normalizedCoinTypes.map((coinType) => ({ coinType, address: null, raw: null }));
  }

  const [encodedResults] = resolved;
  const results = yield* Effect.try({
    try: () =>
      calls.length === 1
        ? [encodedResults]
        : decodeFunctionResult({
            abi: multicallResolverAbi,
            functionName: "multicall",
            data: encodedResults,
          }),
    catch: (cause) =>
      new ContractError({
        code: "DECODE_FAILED",
        message: "Unable to decode ENS address resolver results",
        cause,
      }),
  });

  if (results.length !== uniqueCoinTypes.length) {
    return yield* new ContractError({
      code: "DECODE_FAILED",
      message: "Resolver returned fewer address records than requested",
      cause: { expected: uniqueCoinTypes.length, actual: results.length },
    });
  }

  const uniqueResults = yield* Effect.forEach(uniqueCoinTypes, (coinType, index) => {
    const result = results[index];
    return result === undefined
      ? new ContractError({
          code: "DECODE_FAILED",
          message: "Resolver returned fewer address records than requested",
          cause: { index },
        })
      : decodeRecord(coinType, result);
  });
  const resultsByCoinType = new Map(
    uniqueResults.map((result) => [result.coinType.toString(), result]),
  );

  return yield* Effect.forEach(normalizedCoinTypes, (coinType) => {
    const result = resultsByCoinType.get(coinType.toString());
    return result === undefined
      ? new ContractError({
          code: "DECODE_FAILED",
          message: "Resolver result could not be matched to its requested coin type",
          cause: { coinType },
        })
      : Effect.succeed(result);
  });
});
