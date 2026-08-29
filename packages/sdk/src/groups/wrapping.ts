import {
  extendSubnameExpiry,
  getFuses,
  getWrapperExpiry,
  setChildFuses,
  setFuses,
  unwrapName,
  wrapName,
  type EnsforgeConfig,
} from "@ensforge/core";

import { bindAction } from "../internal/bind-action.js";

export const makeWrappingActions = (config: EnsforgeConfig) =>
  Object.freeze({
    extendSubnameExpiry: bindAction(config, extendSubnameExpiry),
    getFuses: bindAction(config, getFuses),
    getWrapperExpiry: bindAction(config, getWrapperExpiry),
    setChildFuses: bindAction(config, setChildFuses),
    setFuses: bindAction(config, setFuses),
    unwrapName: bindAction(config, unwrapName),
    wrapName: bindAction(config, wrapName),
  });

export type WrappingActions = ReturnType<typeof makeWrappingActions>;
