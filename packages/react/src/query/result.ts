import { Cause, Option, type Effect } from "effect";
import { AsyncResult } from "effect/unstable/reactivity";

export type EnsQueryStatus = "pending" | "success" | "error";
export type EnsFetchStatus = "idle" | "fetching";

export interface EnsQueryResult<Success, Failure> {
  readonly cause: Cause.Cause<Failure> | null;
  readonly data: Success | undefined;
  readonly error: Failure | Error | null;
  readonly fetchStatus: EnsFetchStatus;
  readonly isError: boolean;
  readonly isFetching: boolean;
  readonly isLoading: boolean;
  readonly isPending: boolean;
  readonly isRefetching: boolean;
  readonly isSuccess: boolean;
  readonly refetch: () => Promise<Success>;
  readonly refetchEffect: () => Effect.Effect<Success, Failure>;
  readonly result: AsyncResult.AsyncResult<Success, Failure>;
  readonly status: EnsQueryStatus;
  readonly updatedAt: number | undefined;
}

export const errorFromCause = <Failure>(cause: Cause.Cause<Failure>): Failure | Error => {
  const typedError = Cause.findErrorOption(cause);
  if (Option.isSome(typedError)) return typedError.value;

  const squashed = Cause.squash(cause);
  return squashed instanceof Error
    ? squashed
    : new Error("An unexpected Effect failure occurred", { cause: squashed });
};

export const resultUpdatedAt = <Success, Failure>(
  result: AsyncResult.AsyncResult<Success, Failure>,
): number | undefined => {
  if (AsyncResult.isSuccess(result)) return result.timestamp;
  if (!AsyncResult.isFailure(result)) return undefined;
  return Option.getOrUndefined(result.previousSuccess)?.timestamp;
};
