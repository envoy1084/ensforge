import { Effect, Layer, type Context } from "effect";

import type { EnsforgeServices } from "../services/context.js";
import type { EnsforgeConfig } from "./config.js";

const EnsforgeConfigContextTypeId: unique symbol = Symbol.for(
  "@ensforge/core/EnsforgeConfig/context",
);

export interface InternalEnsforgeConfig extends EnsforgeConfig {
  readonly [EnsforgeConfigContextTypeId]: Context.Context<EnsforgeServices>;
}

export const attachConfigContext = (
  config: Omit<InternalEnsforgeConfig, typeof EnsforgeConfigContextTypeId>,
  context: Context.Context<EnsforgeServices>,
): InternalEnsforgeConfig =>
  Object.defineProperty(config, EnsforgeConfigContextTypeId, {
    value: context,
    enumerable: false,
    configurable: false,
    writable: false,
  }) as InternalEnsforgeConfig;

export const getConfigContext = (config: EnsforgeConfig): Context.Context<EnsforgeServices> =>
  (config as InternalEnsforgeConfig)[EnsforgeConfigContextTypeId];

export const provideConfig = <Success, Failure, Requirements>(
  config: EnsforgeConfig,
  effect: Effect.Effect<Success, Failure, Requirements>,
): Effect.Effect<Success, Failure, Exclude<Requirements, EnsforgeServices>> =>
  Effect.provide(effect, getConfigContext(config));

export const getConfigLayer = (config: EnsforgeConfig): Layer.Layer<EnsforgeServices> =>
  Layer.succeedContext(getConfigContext(config));
