import type { Cause, Effect } from "effect";
import type { AsyncResult } from "effect/unstable/reactivity";

import type { EnsMutationCallbacks } from "./options.js";

export type EnsMutationStatus = "idle" | "pending" | "success" | "error";

export interface EnsMutationResult<Parameters, Success, Failure> {
  readonly cause: Cause.Cause<Failure> | null;
  readonly data: Success | undefined;
  readonly error: Failure | Error | null;
  readonly interrupt: () => void;
  readonly isError: boolean;
  readonly isIdle: boolean;
  readonly isPending: boolean;
  readonly isSuccess: boolean;
  readonly mutate: (
    parameters: Parameters,
    callbacks?: EnsMutationCallbacks<Parameters, Success, Failure>,
  ) => void;
  readonly mutateAsync: (parameters: Parameters) => Promise<Success>;
  readonly mutateEffect: (parameters: Parameters) => Effect.Effect<Success, Failure>;
  readonly parameters: Parameters | undefined;
  readonly reset: () => void;
  readonly result: AsyncResult.AsyncResult<Success, Failure>;
  readonly status: EnsMutationStatus;
}
