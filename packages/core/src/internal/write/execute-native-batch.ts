import { Effect } from "effect";

import type { EnsforgeConfig } from "../../config/config.js";
import { TransactionError } from "../../errors/transaction-error.js";
import { WalletError } from "../../errors/wallet-error.js";
import type {
  CallExecutionResult,
  ConfirmationPolicy,
  NativeBatchResult,
  PreparedWriteCall,
  SendCallsParameters,
  WalletCapabilitiesResult,
  WriteError,
} from "../../write/types.js";
import { provideConfig } from "../config/context.js";
import { resolveWalletContext } from "../services/wallet-client.js";
import { prepareWriteIntents } from "./prepare-write-intents.js";
import { simulatePreparedCalls } from "./simulate-prepared-calls.js";
import { WriteClient } from "./write-client.js";

const submittedCall = (call: PreparedWriteCall): CallExecutionResult => ({
  id: call.id,
  operation: call.operation,
  status: "submitted",
  hash: null,
  receipt: null,
});

export const executeNativeBatch = Effect.fn("executeNativeBatch")(function* (
  config: EnsforgeConfig,
  parameters: SendCallsParameters,
  capabilities: WalletCapabilitiesResult,
): Effect.fn.Return<NativeBatchResult, WriteError> {
  if (!capabilities.nativeCalls) {
    return yield* new WalletError({
      code: "BATCH_UNSUPPORTED",
      message: `The wallet does not advertise native calls on chain ${config.chainId}`,
      cause: capabilities.raw,
    });
  }

  const atomicity = parameters.atomicity ?? "preferred";
  if (
    atomicity === "required" &&
    capabilities.atomicity !== "supported" &&
    capabilities.atomicity !== "ready"
  ) {
    return yield* new WalletError({
      code: "ATOMICITY_UNAVAILABLE",
      message: `The wallet cannot guarantee atomic calls on chain ${config.chainId}`,
      cause: capabilities.raw,
    });
  }

  const calls = yield* prepareWriteIntents(config, parameters);
  if ((parameters.simulation ?? config.writes.simulation) === "required") {
    yield* provideConfig(config, simulatePreparedCalls(calls, config.reads.concurrency));
  }
  const { walletClient, account } = yield* provideConfig(config, resolveWalletContext(parameters));
  const client = yield* provideConfig(config, WriteClient);
  const forceAtomic =
    atomicity === "required" ||
    (atomicity === "preferred" && capabilities.atomicity === "supported");
  const sendOptions =
    parameters.capabilities === undefined
      ? { forceAtomic }
      : { forceAtomic, capabilities: parameters.capabilities };
  const submission = yield* client.sendCalls(walletClient, account, calls, sendOptions);
  const confirmation: ConfirmationPolicy = parameters.confirmation ?? config.writes.confirmation;

  if (confirmation.type === "submitted") {
    return {
      mode: "batch",
      atomic: forceAtomic,
      status: "submitted",
      id: submission.id,
      calls: calls.map(submittedCall),
      receipts: [],
      capabilities,
    };
  }

  const waitOptions = confirmation.timeout === undefined ? {} : { timeout: confirmation.timeout };
  const status = yield* client
    .waitForCallsStatus(walletClient, submission.id, waitOptions)
    .pipe(Effect.retry({ times: config.writes.statusRetries }));
  if (status.status !== "success") {
    return yield* new TransactionError({
      code: status.status === undefined ? "INVALID_BATCH_STATUS" : "BATCH_STATUS_FAILED",
      message: `Wallet call batch ${submission.id} finished with status ${status.status ?? status.statusCode}`,
      cause: status,
      batchId: submission.id,
    });
  }
  const receipts = status.receipts ?? [];
  const results = calls.map((call, index): CallExecutionResult => {
    const receipt = receipts[index] ?? (status.atomic ? receipts[0] : undefined);
    return {
      id: call.id,
      operation: call.operation,
      status: "confirmed",
      hash: receipt?.transactionHash ?? null,
      receipt: receipt ?? null,
    };
  });
  return {
    mode: "batch",
    atomic: status.atomic,
    status: "confirmed",
    id: submission.id,
    calls: results,
    receipts,
    capabilities,
  };
});
