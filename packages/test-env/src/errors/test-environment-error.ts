import { Schema } from "effect";

export const TestEnvironmentErrorCode = Schema.Literals([
  "SOURCE_UNAVAILABLE",
  "SOURCE_DIRTY",
  "SOURCE_MISMATCH",
  "BUILD_FAILED",
  "START_FAILED",
  "HEALTHCHECK_FAILED",
  "DEPLOYMENTS_INVALID",
  "RPC_INVALID",
  "BYTECODE_MISSING",
  "CONFIG_INVALID",
  "LOGS_UNAVAILABLE",
  "SEED_FAILED",
  "SNAPSHOT_FAILED",
  "STOP_FAILED",
]);

export type TestEnvironmentErrorCode = typeof TestEnvironmentErrorCode.Type;

export class TestEnvironmentError extends Schema.TaggedError<TestEnvironmentError>()(
  "TestEnvironmentError",
  {
    code: TestEnvironmentErrorCode,
    message: Schema.String,
    cause: Schema.Defect(),
  },
) {}
