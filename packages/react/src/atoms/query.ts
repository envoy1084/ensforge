import { Data, Effect } from "effect";
import { Atom } from "effect/unstable/reactivity";
import type { AsyncResult } from "effect/unstable/reactivity";

import type { Ensforge } from "@ensforge/sdk";

import type { BoundEffectAction } from "../internal/action-types.js";
import { atomRuntime } from "../internal/runtime.js";
import { makeReactivityKeys } from "../query/keys.js";

export interface QueryAtomOptions {
  readonly gcTime: number;
  readonly refetchOnWindowFocus: boolean;
  readonly retry: false | number;
}

class QueryAtomInput<Parameters> extends Data.Class<{
  readonly options: QueryAtomOptions;
  readonly parameters: Parameters;
  readonly sdk: Ensforge;
}> {}

export type EnsQueryAtom<Success, Failure> = Atom.Atom<AsyncResult.AsyncResult<Success, Failure>>;

export interface EnsQueryAtomFactory<Parameters, Success, Failure> {
  (
    sdk: Ensforge,
    parameters: Parameters,
    options: QueryAtomOptions,
  ): EnsQueryAtom<Success, Failure>;
}

export const defaultQueryAtomOptions: QueryAtomOptions = Object.freeze({
  gcTime: 5 * 60_000,
  refetchOnWindowFocus: false,
  retry: false,
});

export const makeQueryAtom = <Parameters, Success, Failure>(
  group: string,
  getAction: (sdk: Ensforge) => BoundEffectAction<Parameters, Success, Failure>,
): EnsQueryAtomFactory<Parameters, Success, Failure> => {
  const family = Atom.family((input: QueryAtomInput<Parameters>) => {
    const actionEffect = Effect.suspend(() => getAction(input.sdk).effect(input.parameters));
    const effect =
      input.options.retry === false
        ? actionEffect
        : actionEffect.pipe(Effect.retry({ times: input.options.retry }));
    let atom = atomRuntime
      .atom(effect)
      .pipe(
        Atom.withReactivity(makeReactivityKeys(input.sdk, group, input.parameters)),
        Atom.setIdleTTL(input.options.gcTime),
      );

    if (input.options.refetchOnWindowFocus) {
      atom = atom.pipe(Atom.refreshOnWindowFocus);
    }

    return atom;
  });

  return (sdk, parameters, options) =>
    family(
      new QueryAtomInput({
        options,
        parameters,
        sdk,
      }),
    );
};
