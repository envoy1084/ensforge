import {
  AtomicityNotSupportedError,
  BaseError,
  MethodNotFoundRpcError,
  MethodNotSupportedRpcError,
  UnauthorizedProviderError,
  UnsupportedChainIdError,
  UserRejectedRequestError,
} from "viem";

import { TransactionError } from "../../errors/transaction-error.js";
import { WalletError } from "../../errors/wallet-error.js";
import { findViemErrorCause, viemErrorToEffectError, type ViemError } from "./viem-error.js";

const messageFromCause = (cause: unknown): string =>
  cause instanceof BaseError ? cause.shortMessage : "The wallet request failed";

export const isWalletCallBundleUnsupported = (cause: unknown): boolean =>
  findViemErrorCause(cause, MethodNotFoundRpcError) !== undefined ||
  findViemErrorCause(cause, MethodNotSupportedRpcError) !== undefined;

export function walletRequestError(
  cause: unknown,
  operation: "capabilities" | "sendCalls",
): WalletError;
export function walletRequestError(
  cause: unknown,
  operation: "sendTransaction",
): ViemError | WalletError;
export function walletRequestError(
  cause: unknown,
  operation: "capabilities" | "sendCalls" | "sendTransaction",
): ViemError | WalletError {
  if (findViemErrorCause(cause, UserRejectedRequestError) !== undefined) {
    return new WalletError({
      code: "USER_REJECTED",
      message: "The wallet request was rejected by the user",
      cause,
    });
  }
  if (
    findViemErrorCause(cause, UnauthorizedProviderError) !== undefined ||
    findViemErrorCause(cause, UnsupportedChainIdError) !== undefined
  ) {
    return new WalletError({
      code: "UNAUTHORIZED_ACCOUNT",
      message: messageFromCause(cause),
      cause,
    });
  }
  if (findViemErrorCause(cause, AtomicityNotSupportedError) !== undefined) {
    return new WalletError({
      code: "ATOMICITY_UNAVAILABLE",
      message: "The wallet cannot execute this call group atomically",
      cause,
    });
  }
  if (operation === "capabilities") {
    return new WalletError({
      code: "CAPABILITY_REQUEST_FAILED",
      message: messageFromCause(cause),
      cause,
    });
  }
  if (operation === "sendCalls") {
    return new WalletError({
      code: "BATCH_SUBMISSION_FAILED",
      message: messageFromCause(cause),
      cause,
    });
  }
  return viemErrorToEffectError(cause, "writeContract");
}

export const batchStatusError = (cause: unknown, batchId: string) =>
  new TransactionError({
    code: "BATCH_STATUS_FAILED",
    message: "Unable to read the wallet call-batch status",
    cause,
    batchId,
  });
