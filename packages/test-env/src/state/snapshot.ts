import { Effect, Ref, Semaphore } from "effect";

import type { TestClient } from "viem";

import { TestEnvironmentError } from "../errors/test-environment-error.js";

export interface DevnetStateClient {
  readonly increaseTime: TestClient<"anvil">["increaseTime"];
  readonly mine: TestClient<"anvil">["mine"];
  readonly revert: TestClient<"anvil">["revert"];
  readonly snapshot: TestClient<"anvil">["snapshot"];
}

export interface DevnetState {
  readonly advanceTime: (seconds: number) => Effect.Effect<void, TestEnvironmentError>;
  readonly mine: (blocks?: number, interval?: number) => Effect.Effect<void, TestEnvironmentError>;
  readonly reset: Effect.Effect<void, TestEnvironmentError>;
}

const stateOperation = <A>(message: string, operation: () => Promise<A>) =>
  Effect.tryPromise({
    try: operation,
    catch: (cause) =>
      new TestEnvironmentError({
        code: "SNAPSHOT_FAILED",
        message,
        cause,
      }),
  });

export const createDevnetState = Effect.fn("createDevnetState")(function* (
  client: DevnetStateClient,
) {
  const snapshotId = yield* stateOperation(
    "Unable to create the ENS devnet baseline snapshot",
    () => client.snapshot(),
  );
  const currentSnapshot = yield* Ref.make(snapshotId);
  const lock = yield* Semaphore.make(1);

  const reset = lock.withPermits(1)(
    Effect.gen(function* () {
      const id = yield* Ref.get(currentSnapshot);
      yield* stateOperation("Unable to restore the ENS devnet baseline snapshot", () =>
        client.revert({ id }),
      );
      const replacement = yield* stateOperation(
        "Unable to renew the ENS devnet baseline snapshot",
        () => client.snapshot(),
      );
      yield* Ref.set(currentSnapshot, replacement);
    }),
  );

  const advanceTime = Effect.fn("DevnetState.advanceTime")(function* (seconds: number) {
    if (!Number.isSafeInteger(seconds) || seconds < 0) {
      return yield* new TestEnvironmentError({
        code: "SNAPSHOT_FAILED",
        message: "ENS devnet time advancement must be a non-negative safe integer",
        cause: seconds,
      });
    }
    yield* stateOperation("Unable to advance ENS devnet time", () =>
      client.increaseTime({ seconds }),
    );
    yield* stateOperation("Unable to mine the ENS devnet time-advancement block", () =>
      client.mine({ blocks: 1 }),
    );
  });

  const mine = Effect.fn("DevnetState.mine")(function* (blocks = 1, interval = 0) {
    if (
      !Number.isSafeInteger(blocks) ||
      blocks < 1 ||
      !Number.isSafeInteger(interval) ||
      interval < 0
    ) {
      return yield* new TestEnvironmentError({
        code: "SNAPSHOT_FAILED",
        message: "ENS devnet mining values must be non-negative safe integers",
        cause: { blocks, interval },
      });
    }
    yield* stateOperation("Unable to mine ENS devnet blocks", () =>
      client.mine({ blocks, interval }),
    );
  });

  return { advanceTime, mine, reset } satisfies DevnetState;
});
