import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { namehash } from "viem/ens";

import { getIndexedName } from "../../../src/actions/indexer/names/index.js";
import { getIndexedResolver } from "../../../src/actions/indexer/resolvers/index.js";
import { mainnetConfig, mainnetNames } from "../setup/mainnet.js";

describe("Mainnet indexed resolvers", () => {
  it.effect("reads V1 resolver bindings", () =>
    Effect.gen(function* () {
      const name = yield* getIndexedName.effect(mainnetConfig, { name: mainnetNames.reverse });
      if (name?.resolver === null || name === null) return assert.fail("expected a V1 resolver");

      const resolver = yield* getIndexedResolver.effect(mainnetConfig, {
        address: name.resolver,
        protocol: "v1",
        name: mainnetNames.reverse,
      });
      assert.strictEqual(resolver?.protocol, "v1");
      assert.isTrue(
        resolver?.bindings.some((binding) => binding.namehash === namehash(mainnetNames.reverse)),
      );
    }),
  );
});
