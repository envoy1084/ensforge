import type { CallExecutionResult, WriteError } from "../../../write/types.js";

export interface SetAliasParameters {
  readonly name: string;
  readonly target: string | null;
}

export type SetAliasResult = CallExecutionResult;
export type SetAliasError = WriteError;
