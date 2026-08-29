"use client";

import { useAtomSuspense } from "@effect/atom-react";

import type { EnsQueryAtomFactory } from "../atoms/query.js";
import { useEnsforgeContext } from "../provider/context.js";
import {
  resolveEnsQueryOptions,
  type EnsQueryOptions,
  type UseEnsQueryParameters,
} from "../query/options.js";

export type UseEnsSuspenseQueryParameters<Parameters, Success, Selected = Success> = Parameters & {
  readonly query?: Omit<EnsQueryOptions<Success, Selected>, "enabled">;
};

export interface EnsSuspenseQueryResult<Success> {
  readonly data: Success;
  readonly isFetching: boolean;
  readonly updatedAt: number;
}

export const makeSuspenseQueryHook =
  <Parameters extends object, Success, Failure>(
    factory: EnsQueryAtomFactory<Parameters, Success, Failure>,
  ) =>
  <Selected = Success>(
    input: UseEnsSuspenseQueryParameters<Parameters, Success, Selected>,
  ): EnsSuspenseQueryResult<Selected> => {
    const { defaults, sdk } = useEnsforgeContext();
    const { query, ...parameters } = input as UseEnsQueryParameters<Parameters, Success, Selected>;
    const options = resolveEnsQueryOptions(defaults.queries, query);
    const atom = factory(sdk, parameters as Parameters, options);
    const result = useAtomSuspense(atom, { suspendOnWaiting: false });

    return {
      data:
        query?.select === undefined
          ? (result.value as unknown as Selected)
          : query.select(result.value),
      isFetching: result.waiting,
      updatedAt: result.timestamp,
    };
  };
