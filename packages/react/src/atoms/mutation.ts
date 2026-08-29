import { Effect } from "effect";
import { Reactivity, type Atom } from "effect/unstable/reactivity";

import type { Ensforge } from "@ensforge/sdk";

import type { BoundEffectAction } from "../internal/action-types.js";
import { atomRuntime } from "../internal/runtime.js";
import { makeReactivityKeys } from "../query/keys.js";

export type EnsMutationAtom<Parameters, Success, Failure> = Atom.AtomResultFn<
  Parameters,
  Success,
  Failure
>;

export interface EnsMutationAtomFactory<Parameters, Success, Failure> {
  (sdk: Ensforge): EnsMutationAtom<Parameters, Success, Failure>;
}

export const makeMutationAtom =
  <Parameters, Success, Failure>(
    group: string,
    getAction: (sdk: Ensforge) => BoundEffectAction<Parameters, Success, Failure>,
  ): EnsMutationAtomFactory<Parameters, Success, Failure> =>
  (sdk) =>
    atomRuntime.fn(
      (parameters: Parameters) =>
        Effect.suspend(() => getAction(sdk).effect(parameters)).pipe(
          Reactivity.mutation(makeReactivityKeys(sdk, group, parameters)),
        ),
      { concurrent: false },
    );
