import {
  estimateCalls,
  executeWritePlan,
  getCallsStatus,
  getWalletCapabilities,
  prepareCalls,
  readBatch,
  readBatchSettled,
  resumeCalls,
  sendCalls,
  simulateCalls,
  type EnsforgeConfig,
} from "@ensforge/core";

import { bindAction } from "../internal/bind-action.js";

export const makeBatchActions = (config: EnsforgeConfig) =>
  Object.freeze({
    estimateCalls: bindAction(config, estimateCalls),
    executeWritePlan: bindAction(config, executeWritePlan),
    getCallsStatus: bindAction(config, getCallsStatus),
    getWalletCapabilities: bindAction(config, getWalletCapabilities),
    prepareCalls: bindAction(config, prepareCalls),
    readBatch: bindAction(config, readBatch),
    readBatchSettled: bindAction(config, readBatchSettled),
    resumeCalls: bindAction(config, resumeCalls),
    sendCalls: bindAction(config, sendCalls),
    simulateCalls: bindAction(config, simulateCalls),
  });

export type BatchActions = ReturnType<typeof makeBatchActions>;
