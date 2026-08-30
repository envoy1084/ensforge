import type { Exit, Schedule } from "effect";

export interface EnsMutationExecutionOptions<Parameters, Success, Failure> {
  readonly onExit?: (exit: Exit.Exit<Success, Failure>, parameters: Parameters) => void;
}

export interface EnsMutationOptions<
  Parameters,
  Success,
  Failure,
> extends EnsMutationExecutionOptions<Parameters, Success, Failure> {
  readonly retry?: false | Schedule.Schedule<unknown, Failure>;
}

export interface EnsMutationDefaults {
  readonly retry?: false | Schedule.Schedule<unknown, unknown>;
}
