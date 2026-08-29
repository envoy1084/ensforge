"use client";

import { useContext, useRef, useState } from "react";

import { RegistryContext, useAtomValue } from "@effect/atom-react";
import { Cause, Effect, Exit, Option } from "effect";
import { AsyncResult, Atom, AtomRegistry } from "effect/unstable/reactivity";

import type { EnsMutationAtomFactory } from "../atoms/mutation.js";
import type { EnsMutationCallbacks, EnsMutationOptions } from "../mutation/options.js";
import type { EnsMutationResult } from "../mutation/result.js";
import { useEnsforgeContext } from "../provider/context.js";
import { errorFromCause } from "../query/result.js";

export const makeMutationHook =
  <Parameters, Success, Failure>(factory: EnsMutationAtomFactory<Parameters, Success, Failure>) =>
  (
    options: EnsMutationOptions<Parameters, Success, Failure> = {},
  ): EnsMutationResult<Parameters, Success, Failure> => {
    const { sdk } = useEnsforgeContext();
    const registry = useContext(RegistryContext);
    const atomRef = useRef<ReturnType<typeof factory> | undefined>(undefined);
    const [parameters, setParameters] = useState<Parameters | undefined>(undefined);
    if (atomRef.current === undefined) atomRef.current = factory(sdk);
    const atom = atomRef.current;
    const result = useAtomValue(atom);

    const mutateEffect = (nextParameters: Parameters): Effect.Effect<Success, Failure> => {
      const effect = Effect.sync(() => {
        setParameters(nextParameters);
        registry.set(atom, nextParameters);
      }).pipe(
        Effect.andThen(
          AtomRegistry.getResult(registry, atom, {
            suspendOnWaiting: true,
          }),
        ),
      );
      return options.retry === undefined || options.retry === false
        ? effect
        : effect.pipe(Effect.retry({ times: options.retry }));
    };

    const runCallbacks = (
      exit: Exit.Exit<Success, Failure>,
      nextParameters: Parameters,
      local: EnsMutationCallbacks<Parameters, Success, Failure> | undefined,
    ) => {
      if (Exit.isSuccess(exit)) {
        options.onSuccess?.(exit.value, nextParameters);
        local?.onSuccess?.(exit.value, nextParameters);
        options.onSettled?.(exit.value, null, nextParameters);
        local?.onSettled?.(exit.value, null, nextParameters);
        return;
      }

      const error = errorFromCause(exit.cause);
      options.onError?.(error, nextParameters);
      local?.onError?.(error, nextParameters);
      options.onSettled?.(undefined, error, nextParameters);
      local?.onSettled?.(undefined, error, nextParameters);
    };

    const mutate = (
      nextParameters: Parameters,
      callbacks?: EnsMutationCallbacks<Parameters, Success, Failure>,
    ) => {
      void Effect.runPromiseExit(mutateEffect(nextParameters)).then((exit) =>
        runCallbacks(exit, nextParameters, callbacks),
      );
    };

    const mutateAsync = async (nextParameters: Parameters): Promise<Success> => {
      const exit = await Effect.runPromiseExit(mutateEffect(nextParameters));
      runCallbacks(exit, nextParameters, undefined);
      if (Exit.isSuccess(exit)) return exit.value;
      throw Cause.squash(exit.cause);
    };

    const cause = Option.getOrNull(AsyncResult.cause(result));
    const data = Option.getOrUndefined(AsyncResult.value(result));
    const isIdle = AsyncResult.isInitial(result) && !result.waiting;
    const isPending = result.waiting;
    const isError = AsyncResult.isFailure(result);
    const isSuccess = AsyncResult.isSuccess(result) && !result.waiting;

    return {
      cause,
      data,
      error: cause === null ? null : errorFromCause(cause),
      interrupt: () => registry.set(atom, Atom.Interrupt),
      isError,
      isIdle,
      isPending,
      isSuccess,
      mutate,
      mutateAsync,
      mutateEffect,
      parameters,
      reset: () => {
        setParameters(undefined);
        registry.set(atom, Atom.Reset);
      },
      result,
      status: isPending ? "pending" : isError ? "error" : isSuccess ? "success" : "idle",
    };
  };
