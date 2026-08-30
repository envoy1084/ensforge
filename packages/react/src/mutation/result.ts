import type { Cause, Effect } from "effect";
import type { AsyncResult } from "effect/unstable/reactivity";

import type { EnsMutationExecutionOptions } from "./options.js";

export interface EnsMutationResult<Parameters, Success, Failure> {
  readonly cause: Cause.Cause<Failure> | null;
  readonly data: Success | undefined;
  readonly error: Failure | Error | null;
  readonly mutate: (
    parameters: Parameters,
    options?: EnsMutationExecutionOptions<Parameters, Success, Failure>,
  ) => void;
  readonly mutateAsync: (parameters: Parameters) => Promise<Success>;
  readonly mutateEffect: (parameters: Parameters) => Effect.Effect<Success, Failure>;
  readonly interrupt: () => void;
  readonly isFailure: boolean;
  readonly isInitial: boolean;
  readonly isSuccess: boolean;
  readonly isWaiting: boolean;
  readonly parameters: Parameters | undefined;
  readonly reset: () => void;
  readonly result: AsyncResult.AsyncResult<Success, Failure>;
}
