import { Schema } from "effect";

export const ContractErrorCode = Schema.Literals([
  "REVERTED",
  "READ_FAILED",
  "MULTICALL_FAILED",
  "SIMULATION_FAILED",
  "WRITE_FAILED",
  "ENCODE_FAILED",
  "DECODE_FAILED",
]);

export type ContractErrorCode = typeof ContractErrorCode.Type;

export class ContractError extends Schema.TaggedError<ContractError>()("ContractError", {
  code: ContractErrorCode,
  message: Schema.String,
  cause: Schema.Defect(),
}) {}
