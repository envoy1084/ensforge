export interface EnsMutationCallbacks<Parameters, Success, Failure> {
  readonly onError?: (error: Failure | Error, parameters: Parameters) => void;
  readonly onSettled?: (
    data: Success | undefined,
    error: Failure | Error | null,
    parameters: Parameters,
  ) => void;
  readonly onSuccess?: (data: Success, parameters: Parameters) => void;
}

export interface EnsMutationOptions<Parameters, Success, Failure> extends EnsMutationCallbacks<
  Parameters,
  Success,
  Failure
> {
  readonly retry?: false | number;
}
