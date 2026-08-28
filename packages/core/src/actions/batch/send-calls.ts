import { Effect } from "effect";

import { defineAction } from "../../action/action.js";
import type { EnsforgeConfig } from "../../config/config.js";
import { executeNativeBatch } from "../../internal/write/execute-native-batch.js";
import { executeSequential } from "../../internal/write/execute-sequential.js";
import type { SendCallsParameters, SendCallsResult, WriteError } from "../../write/types.js";
import { getWalletCapabilities } from "./get-wallet-capabilities.js";

const sendCallsEffect = Effect.fn("ensforge.sendCalls")(function* (
  config: EnsforgeConfig,
  parameters: SendCallsParameters,
) {
  const mode = parameters.mode ?? "auto";
  if (mode === "sequential") return yield* executeSequential(config, parameters);

  const capabilities = yield* getWalletCapabilities.effect(config, parameters);
  if (mode === "auto" && !capabilities.nativeCalls) {
    return yield* executeSequential(config, parameters);
  }
  return yield* executeNativeBatch(config, parameters, capabilities);
});

export const sendCalls = defineAction<SendCallsParameters, SendCallsResult, WriteError>(
  sendCallsEffect,
);
