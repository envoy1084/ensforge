import { Effect } from "effect";

import type { EnsforgeConfig } from "../config/index.js";

export type EnsActionEffect<Parameters, Success, Failure> = (
  config: EnsforgeConfig,
  parameters: Parameters,
) => Effect.Effect<Success, Failure>;

export interface EnsAction<Parameters, Success, Failure> {
  (config: EnsforgeConfig, parameters: Parameters, options?: Effect.RunOptions): Promise<Success>;

  readonly effect: EnsActionEffect<Parameters, Success, Failure>;
}

const makeAction = <Parameters, Success, Failure>(
  implementation: EnsActionEffect<Parameters, Success, Failure>,
): EnsAction<Parameters, Success, Failure> => {
  const action = (
    config: EnsforgeConfig,
    parameters: Parameters,
    options?: Effect.RunOptions,
  ): Promise<Success> => Effect.runPromise(implementation(config, parameters), options);

  return Object.defineProperty(action, "effect", {
    value: implementation,
    enumerable: true,
    configurable: false,
    writable: false,
  }) as EnsAction<Parameters, Success, Failure>;
};

export const defineAction = <Parameters, Success, Failure>(
  implementation: EnsActionEffect<Parameters, Success, Failure>,
): EnsAction<Parameters, Success, Failure> => Object.freeze(makeAction(implementation));

export const defineExtendedAction = <Parameters, Success, Failure>(
  implementation: EnsActionEffect<Parameters, Success, Failure>,
): EnsAction<Parameters, Success, Failure> => makeAction(implementation);
