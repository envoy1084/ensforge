"use client";

import { useContext } from "react";

import { RegistryContext, useAtomValue } from "@effect/atom-react";
import { Effect, Option } from "effect";
import { AsyncResult, Atom, AtomRegistry } from "effect/unstable/reactivity";

import type { EnsAtomFactory } from "../atoms/query.js";
import { useEnsforgeContext } from "../provider/context.js";
import {
  resolveEnsAtomOptions,
  type EnsAtomOptions,
  type UseEnsAtomParameters,
} from "../query/options.js";
import { errorFromCause, resultUpdatedAt, type EnsAtomResult } from "../query/result.js";

const disabledAtom = Atom.make(AsyncResult.initial<unknown, unknown>());

interface SplitAtomParameters<Parameters, Success, Failure, Mapped> {
  readonly atom: EnsAtomOptions<Failure> | undefined;
  readonly enabled: boolean;
  readonly map: ((value: Success) => Mapped) | undefined;
  readonly parameters: Parameters;
}

const splitAtomParameters = <Parameters extends object, Success, Failure, Mapped>(
  input: UseEnsAtomParameters<Parameters, Success, Failure, Mapped>,
): SplitAtomParameters<Parameters, Success, Failure, Mapped> => {
  const { atom, enabled = true, map, ...parameters } = input;
  return { atom, enabled, map, parameters: parameters as Parameters };
};

export const useQueryAtom = <Parameters extends object, Success, Failure, Mapped = Success>(
  factory: EnsAtomFactory<Parameters, Success, Failure>,
  input: UseEnsAtomParameters<Parameters, Success, Failure, Mapped>,
): EnsAtomResult<Mapped, Failure> => {
  const { defaults, sdk } = useEnsforgeContext();
  const registry = useContext(RegistryContext);
  const { atom: atomOptions, enabled, map, parameters } = splitAtomParameters(input);
  const options = resolveEnsAtomOptions(defaults.atoms, atomOptions);
  const atom = factory(sdk, parameters, options);
  const activeAtom = (enabled ? atom : disabledAtom) as Atom.Atom<
    AsyncResult.AsyncResult<Success, Failure>
  >;
  const rawResult = useAtomValue(activeAtom);
  const result: AsyncResult.AsyncResult<Mapped, Failure> =
    map === undefined
      ? (rawResult as unknown as AsyncResult.AsyncResult<Mapped, Failure>)
      : AsyncResult.map(rawResult, map);

  const refreshEffect = (): Effect.Effect<Mapped, Failure> => {
    const effect = Effect.sync(() => registry.refresh(atom)).pipe(
      Effect.andThen(
        AtomRegistry.getResult(registry, atom, {
          suspendOnWaiting: true,
        }),
      ),
    );
    return map === undefined
      ? (effect as unknown as Effect.Effect<Mapped, Failure>)
      : effect.pipe(Effect.map(map));
  };

  const cause = Option.getOrNull(AsyncResult.cause(result));

  return {
    cause,
    data: Option.getOrUndefined(AsyncResult.value(result)),
    error: cause === null ? null : errorFromCause(cause),
    isFailure: AsyncResult.isFailure(result),
    isInitial: AsyncResult.isInitial(result),
    isSuccess: AsyncResult.isSuccess(result),
    isWaiting: result.waiting,
    refresh: () => Effect.runPromise(refreshEffect()),
    refreshEffect,
    result,
    updatedAt: resultUpdatedAt(result),
  };
};

export const makeQueryHook =
  <Parameters extends object, Success, Failure>(
    factory: EnsAtomFactory<Parameters, Success, Failure>,
  ) =>
  <Mapped = Success>(
    input: UseEnsAtomParameters<Parameters, Success, Failure, Mapped>,
  ): EnsAtomResult<Mapped, Failure> =>
    useQueryAtom(factory, input);

export const prefetchAtom = <Success, Failure>(
  registry: AtomRegistry.AtomRegistry,
  atom: Atom.Atom<AsyncResult.AsyncResult<Success, Failure>>,
  signal?: AbortSignal,
): Promise<Success> =>
  Effect.runPromise(AtomRegistry.getResult(registry, atom, { suspendOnWaiting: true }), {
    signal,
  });
