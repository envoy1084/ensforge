import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { getNameHistory } from "../../../src/actions/indexer/history/index.js";
import {
  getRegistrations,
  getRegistrationsForAddress,
} from "../../../src/actions/indexer/registrations/index.js";
import { sepoliaConfig, sepoliaFixtureAccounts, sepoliaNames } from "../setup/sepolia.js";

describe("Sepolia indexed registration history", () => {
  it.effect("reads the recent V2 registration feed", () =>
    Effect.gen(function* () {
      const page = yield* getRegistrations.effect(sepoliaConfig, {
        filter: { protocols: ["v2"] },
        pageSize: 3,
      });

      assert.lengthOf(page.items, 3);
      assert.isTrue(page.items.every(({ protocol }) => protocol === "v2"));
    }),
  );

  it.effect("reads the V2 smoke registration", () =>
    Effect.gen(function* () {
      const page = yield* getRegistrationsForAddress.effect(sepoliaConfig, {
        address: sepoliaFixtureAccounts.owner,
        filter: { protocols: ["v2"] },
        pageSize: 20,
      });
      assert.isTrue(
        page.items.some(({ name }) => name.value === sepoliaNames.v2.indexedRegistration),
      );
    }),
  );

  it.effect("reads typed V2 name history", () =>
    Effect.gen(function* () {
      const page = yield* getNameHistory.effect(sepoliaConfig, {
        name: sepoliaNames.v2.indexedRegistration,
        pageSize: 5,
      });
      assert.isAbove(page.items.length, 0);
      assert.isTrue(page.items.every(({ namehash }) => namehash !== null));
      assert.isTrue(page.items.some(({ protocol }) => protocol === "v2"));
      assert.isTrue(page.items.some(({ kind }) => kind === "registration"));
      assert.isTrue(page.items.some(({ kind }) => kind === "role"));
      assert.isTrue(page.items.some(({ kind }) => kind === "transfer"));
    }),
  );
});
