"use client";

import { useContext } from "react";

import { RegistryContext } from "@effect/atom-react";
import { Effect } from "effect";

import { invalidateEffect, type Invalidation } from "../cache/invalidation.js";
import { useEnsforgeContext } from "../provider/context.js";

export interface Invalidate {
  (invalidation?: Invalidation, options?: Effect.RunOptions): Promise<void>;
  readonly effect: (invalidation?: Invalidation) => Effect.Effect<void>;
}

export const useInvalidate = (): Invalidate => {
  const registry = useContext(RegistryContext);
  const { sdk } = useEnsforgeContext();
  const effect = (invalidation: Invalidation = { all: true }) =>
    invalidateEffect(registry, sdk, invalidation);
  const invalidate = (invalidation?: Invalidation, options?: Effect.RunOptions) =>
    Effect.runPromise(effect(invalidation), options);

  return Object.assign(invalidate, { effect });
};
