import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { getEnsEvents, getNameHistory, watchEnsEvents } from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

describe("ENS events integration", () => {
  it.effect("normalizes bounded V1 and V2 event history", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const events = yield* getEnsEvents.effect(devnet.configs.v2, {
        fromBlock: devnet.fixtures.events.fromBlock,
        toBlock: devnet.fixtures.events.toBlock,
      });

      assert.isAbove(events.length, 0);
      assert.isTrue(events.some((event) => event.kind === "commitment"));
      assert.isTrue(events.some((event) => event.kind === "registration"));
      assert.isTrue(events.some((event) => event.kind === "records"));
      assert.isTrue(events.every((event) => event.transactionHash !== null));
    }),
  );

  it.effect("filters semantic event kinds and name history", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const range = {
        fromBlock: devnet.fixtures.events.fromBlock,
        toBlock: devnet.fixtures.events.toBlock,
      } as const;
      const [records, history] = yield* Effect.all(
        [
          getEnsEvents.effect(devnet.configs.v2, { ...range, kinds: ["records"] }),
          getNameHistory.effect(devnet.configs.v2, {
            ...range,
            name: devnet.fixtures.v1.activeUnwrapped.name,
          }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.isAbove(records.length, 0);
      assert.isTrue(records.every((event) => event.kind === "records"));
      assert.strictEqual(history.name, devnet.fixtures.v1.activeUnwrapped.name);
      assert.isAbove(history.events.length, 0);
      for (let index = 1; index < history.events.length; index += 1) {
        const previous = history.events[index - 1];
        const current = history.events[index];
        if (previous !== undefined && current !== undefined) {
          assert.isTrue((previous.blockNumber ?? 0n) <= (current.blockNumber ?? 0n));
        }
      }
    }),
  );

  it.effect("opens and disposes the JavaScript watcher facade", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const unwatch = yield* Effect.promise(() =>
        watchEnsEvents(
          devnet.configs.v2,
          { kinds: ["registration"], pollingInterval: 50 },
          () => undefined,
          () => undefined,
        ),
      );

      assert.isFunction(unwatch);
      unwatch();
    }),
  );
});
