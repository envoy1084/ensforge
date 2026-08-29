import { Effect } from "effect";
import { AtomRegistry, Reactivity } from "effect/unstable/reactivity";

import type { Ensforge } from "@ensforge/sdk";

import { atomRuntime } from "../internal/runtime.js";
import { queryKeys, type EnsforgeReactivityKeys } from "../query/keys.js";

export interface EnsforgeInvalidation {
  readonly address?: string;
  readonly all?: boolean;
  readonly group?: string;
  readonly name?: string;
  readonly names?: ReadonlyArray<string>;
}

const invalidateAtom = atomRuntime.fn((keys: EnsforgeReactivityKeys) =>
  Reactivity.invalidate(keys),
);

export const makeInvalidationKeys = (
  sdk: Ensforge,
  invalidation: EnsforgeInvalidation,
): EnsforgeReactivityKeys => {
  const keys: Record<string, ReadonlyArray<unknown>> = {};
  const network = sdk.config.network;

  if (invalidation.all === true) keys[queryKeys.all] = [network];
  if (invalidation.group !== undefined) {
    keys[queryKeys.group(invalidation.group)] = [network];
  }
  if (invalidation.name !== undefined) {
    keys[queryKeys.name] = [`${network}:${invalidation.name}`];
  }
  if (invalidation.names !== undefined) {
    keys[queryKeys.name] = invalidation.names.map((name) => `${network}:${name}`);
  }
  if (invalidation.address !== undefined) {
    keys[queryKeys.address] = [`${network}:${invalidation.address.toLowerCase()}`];
  }

  return Object.keys(keys).length === 0 ? { [queryKeys.all]: [network] } : keys;
};

export const invalidateEnsforgeEffect = (
  registry: AtomRegistry.AtomRegistry,
  sdk: Ensforge,
  invalidation: EnsforgeInvalidation = { all: true },
): Effect.Effect<void> =>
  Effect.sync(() => registry.set(invalidateAtom, makeInvalidationKeys(sdk, invalidation))).pipe(
    Effect.andThen(
      AtomRegistry.getResult(registry, invalidateAtom, {
        suspendOnWaiting: true,
      }),
    ),
  );

export const invalidateEnsforge = (
  registry: AtomRegistry.AtomRegistry,
  sdk: Ensforge,
  invalidation: EnsforgeInvalidation = { all: true },
  options?: Effect.RunOptions,
): Promise<void> =>
  Effect.runPromise(invalidateEnsforgeEffect(registry, sdk, invalidation), options);
