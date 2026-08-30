import { Cause, Option, type Effect } from "effect";
import { AsyncResult } from "effect/unstable/reactivity";

export interface EnsAtomResult<Success, Failure> {
  readonly cause: Cause.Cause<Failure> | null;
  readonly data: Success | undefined;
  readonly error: Failure | Error | null;
  readonly isFailure: boolean;
  readonly isInitial: boolean;
  readonly isSuccess: boolean;
  readonly isWaiting: boolean;
  readonly refresh: () => Promise<Success>;
  readonly refreshEffect: () => Effect.Effect<Success, Failure>;
  readonly result: AsyncResult.AsyncResult<Success, Failure>;
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
