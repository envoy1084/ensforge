import { defineExtendedAction, type EnsAction, type EnsActionEffect } from "./action.js";

const EnsWriteIntentTypeId: unique symbol = Symbol.for("@ensforge/core/EnsWriteIntent");
declare const EnsWriteIntentSuccessTypeId: unique symbol;
declare const EnsWriteIntentFailureTypeId: unique symbol;

export interface EnsWriteIntent<Success, Failure> {
  readonly [EnsWriteIntentTypeId]: typeof EnsWriteIntentTypeId;
  readonly [EnsWriteIntentSuccessTypeId]: Success;
  readonly [EnsWriteIntentFailureTypeId]: Failure;
  readonly operation: string;
  readonly parameters: unknown;
}

export interface EnsWriteAction<Parameters, Success, Failure> extends EnsAction<
  Parameters,
  Success,
  Failure
> {
  readonly call: (parameters: Parameters) => EnsWriteIntent<Success, Failure>;
}

const makeWriteIntent = <Parameters, Success, Failure>(
  operation: string,
  parameters: Parameters,
): EnsWriteIntent<Success, Failure> =>
  Object.freeze({
    [EnsWriteIntentTypeId]: EnsWriteIntentTypeId,
    operation,
    parameters,
  }) as EnsWriteIntent<Success, Failure>;

export const defineWriteAction = <Parameters, Success, Failure>(
  operation: string,
  implementation: EnsActionEffect<Parameters, Success, Failure>,
): EnsWriteAction<Parameters, Success, Failure> => {
  const action = defineExtendedAction(implementation);

  return Object.freeze(
    Object.defineProperty(action, "call", {
      value: (parameters: Parameters) =>
        makeWriteIntent<Parameters, Success, Failure>(operation, parameters),
      enumerable: true,
      configurable: false,
      writable: false,
    }),
  ) as EnsWriteAction<Parameters, Success, Failure>;
};
