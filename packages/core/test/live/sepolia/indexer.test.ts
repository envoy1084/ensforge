import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { getIndexerStatus } from "../../../src/actions/indexer/index.js";
import { sepoliaConfig } from "../setup/sepolia.js";

describe("Sepolia indexers", () => {
  it.effect("reports both default sources as healthy", () =>
    Effect.gen(function* () {
      const result = yield* getIndexerStatus.effect(sepoliaConfig);

      assert.lengthOf(result.sources, 2);
      for (const source of result.sources) {
        assert.strictEqual(source.status, "ready", `${source.protocol} is not ready`);
        if (source.status !== "ready") continue;
        assert.strictEqual(source.health, "healthy");
        assert.isTrue(source.indexedBlock.number > 0n);
      }
    }),
  );
});
