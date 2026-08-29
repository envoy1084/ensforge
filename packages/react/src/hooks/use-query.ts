"use client";

import { useContext, useEffect, useRef } from "react";

import { useAtomValue, RegistryContext } from "@effect/atom-react";
import { Effect, Option } from "effect";
import { AsyncResult, Atom, AtomRegistry } from "effect/unstable/reactivity";

import type { EnsQueryAtomFactory } from "../atoms/query.js";
import { useEnsforgeContext } from "../provider/context.js";
import {
  resolveEnsQueryOptions,
  type EnsQueryOptions,
  type UseEnsQueryParameters,
} from "../query/options.js";
import { errorFromCause, resultUpdatedAt, type EnsQueryResult } from "../query/result.js";

const disabledAtom = Atom.make(AsyncResult.initial<unknown, unknown>());

const splitQueryParameters = <Parameters extends object, Success, Selected>(
  input: UseEnsQueryParameters<Parameters, Success, Selected>,
): readonly [Parameters, EnsQueryOptions<Success, Selected> | undefined] => {
  const { query, ...parameters } = input;
  return [parameters as Parameters, query];
};

export const useQueryAtom = <Parameters extends object, Success, Failure, Selected = Success>(
  factory: EnsQueryAtomFactory<Parameters, Success, Failure>,
  input: UseEnsQueryParameters<Parameters, Success, Selected>,
): EnsQueryResult<Selected, Failure> => {
  const { defaults, sdk } = useEnsforgeContext();
  const registry = useContext(RegistryContext);
  const [parameters, query] = splitQueryParameters(input);
  const options = resolveEnsQueryOptions(defaults.queries, query);
  const enabled = query?.enabled ?? true;
  const atom = factory(sdk, parameters, options);
  const activeAtom = (enabled ? atom : disabledAtom) as Atom.Atom<
    AsyncResult.AsyncResult<Success, Failure>
  >;
  const rawResult = useAtomValue(activeAtom);
  const result: AsyncResult.AsyncResult<Selected, Failure> =
    query?.select === undefined
      ? (rawResult as unknown as AsyncResult.AsyncResult<Selected, Failure>)
      : AsyncResult.map(rawResult, query.select);
  const staleCheckedAtom = useRef<Atom.Atom<unknown> | undefined>(undefined);

  useEffect(() => {
    if (staleCheckedAtom.current === atom) return;
    staleCheckedAtom.current = atom;
    if (!enabled || !AsyncResult.isSuccess(rawResult)) return;
    if (Date.now() - rawResult.timestamp >= options.staleTime) registry.refresh(atom);
  }, [atom, enabled, options.staleTime, rawResult, registry]);

  useEffect(() => {
    if (!enabled || options.refetchInterval === false) return;
    const interval = globalThis.setInterval(() => registry.refresh(atom), options.refetchInterval);
    return () => globalThis.clearInterval(interval);
  }, [atom, enabled, options.refetchInterval, registry]);

  const refetchEffect = (): Effect.Effect<Selected, Failure> => {
    const effect = Effect.sync(() => registry.refresh(atom)).pipe(
      Effect.andThen(
        AtomRegistry.getResult(registry, atom, {
          suspendOnWaiting: true,
        }),
      ),
    );
    return query?.select === undefined
      ? (effect as unknown as Effect.Effect<Selected, Failure>)
      : effect.pipe(Effect.map(query.select));
  };

  const cause = Option.getOrNull(AsyncResult.cause(result));
  const data = Option.getOrUndefined(AsyncResult.value(result));
  const isPending = AsyncResult.isInitial(result);
  const isError = AsyncResult.isFailure(result);
  const isSuccess = AsyncResult.isSuccess(result);

  return {
    cause,
    data,
    error: cause === null ? null : errorFromCause(cause),
    fetchStatus: result.waiting ? "fetching" : "idle",
    isError,
    isFetching: result.waiting,
    isLoading: isPending && result.waiting,
    isPending,
    isRefetching: !isPending && result.waiting,
    isSuccess,
    refetch: () => Effect.runPromise(refetchEffect()),
    refetchEffect,
    result,
    status: isPending ? "pending" : isError ? "error" : "success",
    updatedAt: resultUpdatedAt(result),
  };
};

export const makeQueryHook =
  <Parameters extends object, Success, Failure>(
    factory: EnsQueryAtomFactory<Parameters, Success, Failure>,
  ) =>
  <Selected = Success>(
    input: UseEnsQueryParameters<Parameters, Success, Selected>,
  ): EnsQueryResult<Selected, Failure> =>
    useQueryAtom(factory, input);

export const prefetchQueryAtom = <Success, Failure>(
  registry: AtomRegistry.AtomRegistry,
  atom: Atom.Atom<AsyncResult.AsyncResult<Success, Failure>>,
  signal?: AbortSignal,
): Promise<Success> =>
  Effect.runPromise(AtomRegistry.getResult(registry, atom, { suspendOnWaiting: true }), {
    signal,
  });
