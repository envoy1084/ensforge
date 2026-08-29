import type { Effect } from "effect";

export interface BoundEffectAction<Parameters, Success, Failure> {
  readonly effect: (parameters: Parameters) => Effect.Effect<Success, Failure>;
}

export type ActionParameters<Action> =
  Action extends BoundEffectAction<infer Parameters, unknown, unknown> ? Parameters : never;

export type ActionSuccess<Action> =
  Action extends BoundEffectAction<unknown, infer Success, unknown> ? Success : never;

export type ActionFailure<Action> =
  Action extends BoundEffectAction<unknown, unknown, infer Failure> ? Failure : never;
