import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { getIndexerStatus } from "../../../src/actions/indexer/index.js";
import { mainnetConfig } from "../setup/mainnet.js";

describe("Mainnet indexer", () => {
  it.effect("reports the default V1 source as healthy", () =>
    Effect.gen(function* () {
      const result = yield* getIndexerStatus.effect(mainnetConfig);
      const v1 = result.sources.find((source) => source.protocol === "v1");
      const v2 = result.sources.find((source) => source.protocol === "v2");

      assert.strictEqual(v1?.status, "ready");
      if (v1?.status !== "ready") return;
      assert.strictEqual(v1.health, "healthy");
      assert.isTrue(v1.indexedBlock.number > 0n);
      assert.strictEqual(v2?.status, "unavailable");
    }),
  );
});
