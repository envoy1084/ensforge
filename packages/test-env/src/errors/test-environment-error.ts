import { Schema } from "effect";

export const TestEnvironmentErrorCode = Schema.Literals([
  "SOURCE_UNAVAILABLE",
  "SOURCE_DIRTY",
  "BUILD_FAILED",
  "START_FAILED",
  "HEALTHCHECK_FAILED",
  "DEPLOYMENTS_INVALID",
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
