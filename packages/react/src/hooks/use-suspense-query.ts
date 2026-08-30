"use client";

import { useAtomSuspense } from "@effect/atom-react";

import type { EnsAtomFactory } from "../atoms/query.js";
import { useEnsforgeContext } from "../provider/context.js";
import {
  resolveEnsAtomOptions,
  type EnsAtomOptions,
  type UseEnsAtomParameters,
} from "../query/options.js";

export type UseEnsSuspenseAtomParameters<
  Parameters,
  Success,
  Failure,
  Mapped = Success,
> = Parameters & {
  readonly atom?: EnsAtomOptions<Failure>;
  readonly map?: (value: Success) => Mapped;
};

export interface EnsSuspenseAtomResult<Success> {
  readonly data: Success;
  readonly isWaiting: boolean;
  readonly updatedAt: number;
}

export const makeSuspenseQueryHook =
  <Parameters extends object, Success, Failure>(
    factory: EnsAtomFactory<Parameters, Success, Failure>,
  ) =>
  <Mapped = Success>(
    input: UseEnsSuspenseAtomParameters<Parameters, Success, Failure, Mapped>,
  ): EnsSuspenseAtomResult<Mapped> => {
    const { defaults, sdk } = useEnsforgeContext();
    const {
      atom: atomOptions,
      map,
      ...parameters
    } = input as UseEnsAtomParameters<Parameters, Success, Failure, Mapped>;
    const options = resolveEnsAtomOptions(defaults.atoms, atomOptions);
    const atom = factory(sdk, parameters as Parameters, options);
    const result = useAtomSuspense(atom, { suspendOnWaiting: false });

    return {
      data: map === undefined ? (result.value as unknown as Mapped) : map(result.value),
      isWaiting: result.waiting,
      updatedAt: result.timestamp,
    };
  };
