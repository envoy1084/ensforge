import {
  getCanonicalResource,
  getExpiry,
  getManager,
  getNameState,
  getNameStatus,
  getOwner,
  getProtocol,
  getRegistrant,
  getRegistry,
  getTokenId,
  isAvailable,
  isMigrated,
  isRenewable,
  isReserved,
  isWrapped,
  type EnsforgeConfig,
} from "@ensforge/core";

import { bindAction } from "../internal/bind-action.js";

export const makeNameActions = (config: EnsforgeConfig) =>
  Object.freeze({
    getCanonicalResource: bindAction(config, getCanonicalResource),
    getExpiry: bindAction(config, getExpiry),
    getManager: bindAction(config, getManager),
    getNameState: bindAction(config, getNameState),
    getNameStatus: bindAction(config, getNameStatus),
    getOwner: bindAction(config, getOwner),
    getProtocol: bindAction(config, getProtocol),
    getRegistrant: bindAction(config, getRegistrant),
    getRegistry: bindAction(config, getRegistry),
    getTokenId: bindAction(config, getTokenId),
    isAvailable: bindAction(config, isAvailable),
    isMigrated: bindAction(config, isMigrated),
    isRenewable: bindAction(config, isRenewable),
    isReserved: bindAction(config, isReserved),
    isWrapped: bindAction(config, isWrapped),
  });

export type NameActions = ReturnType<typeof makeNameActions>;
