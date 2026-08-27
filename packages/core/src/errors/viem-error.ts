import { Predicate } from "effect";

import {
  AbiDecodingDataSizeInvalidError,
  AbiDecodingDataSizeTooSmallError,
  AbiDecodingZeroDataError,
  BaseError,
  ContractFunctionRevertedError,
  ContractFunctionZeroDataError,
  HttpRequestError,
  RpcRequestError,
  SocketClosedError,
  TimeoutError,
  WebSocketRequestError,
} from "viem";

import { ContractError, type ContractErrorCode } from "./contract-error.js";
import { RpcError } from "./rpc-error.js";

export type ViemOperation = "readContract" | "multicall" | "simulateContract" | "writeContract";

export type ViemError = ContractError | RpcError;

const fallbackCodes = {
  readContract: "READ_FAILED",
  multicall: "MULTICALL_FAILED",
  simulateContract: "SIMULATION_FAILED",
  writeContract: "WRITE_FAILED",
} as const satisfies Record<ViemOperation, ContractErrorCode>;

const findCause = <ErrorClass extends Error>(
  cause: unknown,
  errorClass: abstract new (...args: never[]) => ErrorClass,
): ErrorClass | undefined => {
  if (cause instanceof errorClass) {
    return cause;
  }

  if (!(cause instanceof BaseError)) {
    return undefined;
  }

  return (
    (cause.walk((error) => error instanceof errorClass) as ErrorClass | null | undefined) ??
    undefined
  );
};

const messageFromCause = (cause: unknown): string => {
  if (cause instanceof BaseError) {
    return cause.shortMessage;
  }

  if (Predicate.isError(cause)) {
    return cause.message;
  }

  return "An unknown Ethereum client error occurred";
};

const isDecodeError = (cause: unknown): boolean =>
  findCause(cause, ContractFunctionZeroDataError) !== undefined ||
  findCause(cause, AbiDecodingDataSizeInvalidError) !== undefined ||
  findCause(cause, AbiDecodingDataSizeTooSmallError) !== undefined ||
  findCause(cause, AbiDecodingZeroDataError) !== undefined;

export const viemErrorToEffectError = (cause: unknown, operation: ViemOperation): ViemError => {
  const reverted = findCause(cause, ContractFunctionRevertedError);

  if (reverted !== undefined) {
    return new ContractError({
      code: "REVERTED",
      message: reverted.shortMessage,
      cause,
    });
  }

  if (isDecodeError(cause)) {
    return new ContractError({
      code: "DECODE_FAILED",
      message: messageFromCause(cause),
      cause,
    });
  }

  const timeout = findCause(cause, TimeoutError);

  if (timeout !== undefined) {
    return new RpcError({
      code: "REQUEST_TIMEOUT",
      message: timeout.shortMessage,
      cause,
    });
  }

  const request = findCause(cause, RpcRequestError) ?? findCause(cause, HttpRequestError);

  if (request !== undefined) {
    return new RpcError({
      code: "REQUEST_FAILED",
      message: request.shortMessage,
      cause,
    });
  }

  const transport = findCause(cause, WebSocketRequestError) ?? findCause(cause, SocketClosedError);

  if (transport !== undefined) {
    return new RpcError({
      code: "TRANSPORT_FAILED",
      message: transport.shortMessage,
      cause,
    });
  }

  return new ContractError({
    code: fallbackCodes[operation],
    message: messageFromCause(cause),
    cause,
  });
};
