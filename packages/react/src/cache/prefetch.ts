import { Effect } from "effect";
import { AtomRegistry } from "effect/unstable/reactivity";

import type { Ensforge } from "@ensforge/sdk";

import type { EnsQueryAtomFactory, QueryAtomOptions } from "../atoms/query.js";

export const prefetchEnsforgeEffect = <Parameters, Success, Failure>(
  registry: AtomRegistry.AtomRegistry,
  sdk: Ensforge,
  factory: EnsQueryAtomFactory<Parameters, Success, Failure>,
  parameters: Parameters,
  options: QueryAtomOptions,
): Effect.Effect<Success, Failure> =>
  AtomRegistry.getResult(registry, factory(sdk, parameters, options), {
    suspendOnWaiting: true,
  });

export const prefetchEnsforge = <Parameters, Success, Failure>(
  registry: AtomRegistry.AtomRegistry,
  sdk: Ensforge,
  factory: EnsQueryAtomFactory<Parameters, Success, Failure>,
  parameters: Parameters,
  options: QueryAtomOptions,
  runOptions?: Effect.RunOptions,
): Promise<Success> =>
  Effect.runPromise(
    prefetchEnsforgeEffect(registry, sdk, factory, parameters, options),
    runOptions,
  );
