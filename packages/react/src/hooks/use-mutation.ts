"use client";

import { useContext, useRef, useState } from "react";

import { RegistryContext, useAtomValue } from "@effect/atom-react";
import { Cause, Effect, Exit, Option, type Schedule } from "effect";
import { AsyncResult, Atom, AtomRegistry } from "effect/unstable/reactivity";

import type { EnsMutationAtomFactory } from "../atoms/mutation.js";
import type { EnsMutationExecutionOptions, EnsMutationOptions } from "../mutation/options.js";
import type { EnsMutationResult } from "../mutation/result.js";
import { useEnsforgeContext } from "../provider/context.js";
import { errorFromCause } from "../query/result.js";

export const makeMutationHook =
  <Parameters, Success, Failure>(factory: EnsMutationAtomFactory<Parameters, Success, Failure>) =>
  (
    options: EnsMutationOptions<Parameters, Success, Failure> = {},
  ): EnsMutationResult<Parameters, Success, Failure> => {
    const { defaults, sdk } = useEnsforgeContext();
    const registry = useContext(RegistryContext);
    const atomRef = useRef<ReturnType<typeof factory> | undefined>(undefined);
    const [parameters, setParameters] = useState<Parameters | undefined>(undefined);
    if (atomRef.current === undefined) atomRef.current = factory(sdk);
    const atom = atomRef.current;
    const result = useAtomValue(atom);
    const retry =
      options.retry ??
      (defaults.mutations?.retry as false | Schedule.Schedule<unknown, Failure> | undefined) ??
      false;

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
      return retry === false ? effect : effect.pipe(Effect.retry(retry));
    };

    const notifyExit = (
      exit: Exit.Exit<Success, Failure>,
      nextParameters: Parameters,
      local: EnsMutationExecutionOptions<Parameters, Success, Failure> | undefined,
    ) => {
      options.onExit?.(exit, nextParameters);
      local?.onExit?.(exit, nextParameters);
    };

    const mutateAsync = async (nextParameters: Parameters): Promise<Success> => {
      const exit = await Effect.runPromiseExit(mutateEffect(nextParameters));
      notifyExit(exit, nextParameters, undefined);
      if (Exit.isSuccess(exit)) return exit.value;
      throw Cause.squash(exit.cause);
    };

    const mutate = (
      nextParameters: Parameters,
      local?: EnsMutationExecutionOptions<Parameters, Success, Failure>,
    ) => {
      void Effect.runPromiseExit(mutateEffect(nextParameters)).then((exit) =>
        notifyExit(exit, nextParameters, local),
      );
    };

    const cause = Option.getOrNull(AsyncResult.cause(result));

    return {
      cause,
      data: Option.getOrUndefined(AsyncResult.value(result)),
      error: cause === null ? null : errorFromCause(cause),
      interrupt: () => registry.set(atom, Atom.Interrupt),
      isFailure: AsyncResult.isFailure(result),
      isInitial: AsyncResult.isInitial(result) && !result.waiting,
      isSuccess: AsyncResult.isSuccess(result) && !result.waiting,
      isWaiting: result.waiting,
      mutate,
      mutateAsync,
      mutateEffect,
      parameters,
      reset: () => {
        setParameters(undefined);
        registry.set(atom, Atom.Reset);
      },
      result,
    };
  };
