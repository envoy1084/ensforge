import {
  createSubname,
  deleteSubname,
  setSubnameExpiry,
  setSubnameManager,
  setSubnameRecord,
  setSubnameResolver,
  transferSubname,
  type EnsforgeConfig,
} from "@ensforge/core";

import { bindAction } from "../internal/bind-action.js";

export const makeSubnameActions = (config: EnsforgeConfig) =>
  Object.freeze({
    createSubname: bindAction(config, createSubname),
    deleteSubname: bindAction(config, deleteSubname),
    setSubnameExpiry: bindAction(config, setSubnameExpiry),
    setSubnameManager: bindAction(config, setSubnameManager),
    setSubnameRecord: bindAction(config, setSubnameRecord),
    setSubnameResolver: bindAction(config, setSubnameResolver),
    transferSubname: bindAction(config, transferSubname),
  });

export type SubnameActions = ReturnType<typeof makeSubnameActions>;
