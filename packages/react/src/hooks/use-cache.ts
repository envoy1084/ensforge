"use client";

import { useContext } from "react";

import { RegistryContext } from "@effect/atom-react";
import { Effect } from "effect";

import { invalidateEnsforgeEffect, type EnsforgeInvalidation } from "../cache/invalidation.js";
import { useEnsforgeContext } from "../provider/context.js";

export interface InvalidateEnsforge {
  (invalidation?: EnsforgeInvalidation, options?: Effect.RunOptions): Promise<void>;
  readonly effect: (invalidation?: EnsforgeInvalidation) => Effect.Effect<void>;
}

export const useInvalidateEnsforge = (): InvalidateEnsforge => {
  const registry = useContext(RegistryContext);
  const { sdk } = useEnsforgeContext();
  const effect = (invalidation: EnsforgeInvalidation = { all: true }) =>
    invalidateEnsforgeEffect(registry, sdk, invalidation);
  const invalidate = (invalidation?: EnsforgeInvalidation, options?: Effect.RunOptions) =>
    Effect.runPromise(effect(invalidation), options);

  return Object.assign(invalidate, { effect });
};
