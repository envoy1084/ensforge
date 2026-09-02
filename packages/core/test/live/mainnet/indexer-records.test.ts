import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { getIndexedRecords, getRecordHistory } from "../../../src/actions/indexer/records/index.js";
import { mainnetConfig } from "../setup/mainnet.js";

describe("Mainnet indexed records", () => {
  it.effect("reads V1 resolver inventory", () =>
    Effect.gen(function* () {
      const inventory = yield* getIndexedRecords.effect(mainnetConfig, { name: "vitalik.eth" });
      const current = inventory.bindings.find(
        ({ current: isCurrent, source }) => isCurrent && source.protocol === "v1",
      );
      assert.isDefined(current);
      assert.isFalse(inventory.authoritative);
      assert.include(current?.records.coinTypes ?? [], 60n);
      assert.isAbove(current?.records.textKeys.length ?? 0, 0);
    }),
  );

  it.effect("reads V1 resolver record history", () =>
    Effect.gen(function* () {
      const history = yield* getRecordHistory.effect(mainnetConfig, {
        name: "vitalik.eth",
        pageSize: 5,
      });
      assert.isAbove(history.items.length, 0);
      assert.isTrue(history.items.every(({ source }) => source.protocol === "v1"));
      assert.isTrue(history.items.every(({ raw }) => raw.data === null));
    }),
  );
});
