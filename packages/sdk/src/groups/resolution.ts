import {
  createResolver,
  getAlias,
  getOrCreateResolver,
  getResolver,
  getResolverVersion,
  predictResolverAddress,
  resolve,
  resolveBatch,
  resolveWithResolver,
  setResolver,
  setResolverAndRecords,
  upgradeResolver,
  type EnsforgeConfig,
} from "@ensforge/core";

import { bindAction } from "../internal/bind-action.js";

export const makeResolutionActions = (config: EnsforgeConfig) =>
  Object.freeze({
    createResolver: bindAction(config, createResolver),
    getAlias: bindAction(config, getAlias),
    getOrCreateResolver: bindAction(config, getOrCreateResolver),
    getResolver: bindAction(config, getResolver),
    getResolverVersion: bindAction(config, getResolverVersion),
    predictResolverAddress: bindAction(config, predictResolverAddress),
    resolve: bindAction(config, resolve),
    resolveBatch: bindAction(config, resolveBatch),
    resolveWithResolver: bindAction(config, resolveWithResolver),
    setResolver: bindAction(config, setResolver),
    setResolverAndRecords: bindAction(config, setResolverAndRecords),
    upgradeResolver: bindAction(config, upgradeResolver),
  });

export type ResolutionActions = ReturnType<typeof makeResolutionActions>;
