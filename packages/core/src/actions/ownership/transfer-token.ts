import { Effect } from "effect";

import { nameWrapperV1SafeTransferFromAbi } from "@ensforge/contracts/v1";
import { tokenizedRegistryV2InterfaceSafeTransferFromAbi } from "@ensforge/contracts/v2";
import { encodeFunctionData } from "viem";

import type { EnsWriteIntentPreparer } from "../../action/write-intent.js";
import { ContractError } from "../../errors/contract-error.js";
import { makeSingleWriteAction } from "../../internal/write/single-write-action.js";
import type { EthereumAddress } from "../../schemas/identity.js";
import type { EnsProtocol } from "../../schemas/protocol.js";
import type { WriteError } from "../../write/types.js";
import { requireOwnershipAuthorization } from "./authorization.js";

interface TransferTokenParameters {
  readonly name: string;
  readonly protocol: EnsProtocol;
  readonly contract: EthereumAddress;
  readonly tokenId: bigint;
  readonly from: EthereumAddress;
  readonly to: EthereumAddress;
}

const prepare: EnsWriteIntentPreparer<TransferTokenParameters, WriteError> = Effect.fn(
  "ensforge.transferName.prepareTokenTransfer",
)(function* (config, parameters, context) {
  yield* requireOwnershipAuthorization(config, parameters.name, context.account, {
    type: "transfer",
  });
  const data = yield* Effect.try({
    try: () =>
      parameters.protocol === "v1"
        ? encodeFunctionData({
            abi: nameWrapperV1SafeTransferFromAbi,
            functionName: "safeTransferFrom",
            args: [parameters.from, parameters.to, parameters.tokenId, 1n, "0x"],
          })
        : encodeFunctionData({
            abi: tokenizedRegistryV2InterfaceSafeTransferFromAbi,
            functionName: "safeTransferFrom",
            args: [parameters.from, parameters.to, parameters.tokenId, 1n, "0x"],
          }),
    catch: (cause) =>
      new ContractError({
        code: "ENCODE_FAILED",
        message: "Unable to encode the ownership token transfer",
        cause,
      }),
  });
  return {
    to: parameters.contract,
    data,
    value: 0n,
    protocol: parameters.protocol,
  };
});

export const transferOwnershipToken = makeSingleWriteAction("transferOwnershipToken", prepare);
