import {
  clearPrimaryName,
  getPrimaryName,
  setContractPrimaryName,
  setPrimaryName,
  setPrimaryNameForAddress,
  type EnsforgeConfig,
} from "@ensforge/core";

import { bindAction } from "../internal/bind-action.js";

export const makeReverseActions = (config: EnsforgeConfig) =>
  Object.freeze({
    clearPrimaryName: bindAction(config, clearPrimaryName),
    getPrimaryName: bindAction(config, getPrimaryName),
    setContractPrimaryName: bindAction(config, setContractPrimaryName),
    setPrimaryName: bindAction(config, setPrimaryName),
    setPrimaryNameForAddress: bindAction(config, setPrimaryNameForAddress),
  });

export type ReverseActions = ReturnType<typeof makeReverseActions>;
