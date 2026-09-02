import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { getRegistrationHistory } from "../../../src/actions/indexer/history/index.js";
import { getRegistrations } from "../../../src/actions/indexer/registrations/index.js";
import { mainnetConfig } from "../setup/mainnet.js";

describe("Mainnet indexed registration history", () => {
  it.effect("reads a V1 registration", () =>
    Effect.gen(function* () {
      const page = yield* getRegistrations.effect(mainnetConfig, {
        filter: { name: "vitalik.eth", protocols: ["v1"] },
        pageSize: 1,
      });
      assert.lengthOf(page.items, 1);
      assert.strictEqual(page.items[0]?.protocol, "v1");
      assert.strictEqual(page.items[0]?.name.value, "vitalik.eth");
    }),
  );

  it.effect("reads V1 registration lifecycle events", () =>
    Effect.gen(function* () {
      const page = yield* getRegistrationHistory.effect(mainnetConfig, {
        name: "vitalik.eth",
        pageSize: 5,
      });
      assert.isAbove(page.items.length, 0);
      assert.isTrue(page.items.every(({ protocol }) => protocol === "v1"));
      assert.isTrue(
        page.items.every(({ kind }) =>
          ["registration", "renewal", "transfer", "migration", "expiry"].includes(kind),
        ),
      );
    }),
  );
});
