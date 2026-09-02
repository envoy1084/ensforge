import { Effect, Result, Schema } from "effect";

import { namehash as makeNamehash, normalize } from "viem/ens";

import { defineAction } from "../../../../action/action.js";
import type { EnsforgeConfig } from "../../../../config/config.js";
import { getIndexerRuntimeConfig } from "../../../../config/indexer-options.js";
import { IndexerConfigError } from "../../../../errors/indexer-config-error.js";
import { IndexerFilterError } from "../../../../errors/indexer-filter-error.js";
import { Namehash } from "../../../../schemas/hash.js";
import { queryIndexedNameSource } from "./source.js";
import type {
  GetIndexedNameError,
  GetIndexedNameParameters,
  GetIndexedNameResult,
} from "./types.js";

const getIndexedNameEffect = Effect.fn("ensforge.getIndexedName")(function* (
  config: EnsforgeConfig,
  parameters: GetIndexedNameParameters,
): Effect.fn.Return<GetIndexedNameResult, GetIndexedNameError> {
  if (!config.indexer.enabled) {
    return yield* new IndexerConfigError({
      code: "INDEXER_DISABLED",
      message: "Indexer actions are disabled for this configuration",
    });
  }

  const lookup = yield* Effect.try({
    try: () => {
      const hasName = typeof parameters.name === "string";
      const hasNamehash = typeof parameters.namehash === "string";
      if (hasName === hasNamehash) throw new Error("Provide exactly one name identity");
      if (hasName) {
        const name = normalize(parameters.name as string);
        return { name, namehash: Schema.decodeUnknownSync(Namehash)(makeNamehash(name)) };
      }
      return {
        name: null,
        namehash: Schema.decodeUnknownSync(Namehash)(parameters.namehash),
      };
    },
    catch: () =>
      new IndexerFilterError({
        code: "INVALID_FILTER",
        message: "Provide one valid ENS name or namehash",
      }),
  });

  const states = getIndexerRuntimeConfig(config.indexer).sourceStates;
  const preferred = states.v2 === "enabled" ? "v2" : states.v1 === "enabled" ? "v1" : null;
  if (preferred === null) return null;

  const first = yield* Effect.result(queryIndexedNameSource(config, preferred, lookup));
  if (Result.isSuccess(first) && first.success !== null) return first.success;
  if (Result.isFailure(first) && config.indexer.failureMode === "strict") {
    return yield* first.failure;
  }

  if (preferred === "v2" && states.v1 === "enabled") {
    return yield* queryIndexedNameSource(config, "v1", lookup).pipe(
      config.indexer.failureMode === "partial"
        ? Effect.orElseSucceed(() => null)
        : (effect) => effect,
    );
  }
  return null;
});

export const getIndexedName = defineAction(getIndexedNameEffect);

export type {
  GetIndexedNameError,
  GetIndexedNameParameters,
  GetIndexedNameResult,
} from "./types.js";
