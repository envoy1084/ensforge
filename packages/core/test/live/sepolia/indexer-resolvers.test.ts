import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { getIndexedName } from "../../../src/actions/indexer/names/index.js";
import { getRegistry } from "../../../src/actions/indexer/registries/index.js";
import {
  getIndexedResolver,
  getResolverApprovals,
  getResolverMetadata,
  getResolversForAddress,
} from "../../../src/actions/indexer/resolvers/index.js";
import { sepoliaConfig, sepoliaNames } from "../setup/sepolia.js";

describe("Sepolia indexed resolvers", () => {
  it.effect("reads V2 resolver details and binding inventories", () =>
    Effect.gen(function* () {
      const name = yield* getIndexedName.effect(sepoliaConfig, {
        name: sepoliaNames.v2.profile,
      });
      if (name?.resolver === null || name === null) return assert.fail("expected a V2 resolver");

      const resolver = yield* getIndexedResolver.effect(sepoliaConfig, {
        address: name.resolver,
        protocol: "v2",
        name: sepoliaNames.v2.profile,
      });
      assert.strictEqual(resolver?.protocol, "v2");
      assert.isAbove(resolver?.bindings.length ?? 0, 0);
      assert.isTrue(resolver?.bindings.some((binding) => binding.textKeys.length > 0));
    }),
  );

  it.effect("reads resolver ownership, metadata, and approvals", () =>
    Effect.gen(function* () {
      const [name, registry] = yield* Effect.all(
        [
          getIndexedName.effect(sepoliaConfig, { name: sepoliaNames.v2.profile }),
          getRegistry.effect(sepoliaConfig, { name: sepoliaNames.v2.indexedRegistry }),
        ],
        { concurrency: "unbounded" },
      );
      if (name?.resolver === null || name === null) return assert.fail("expected a V2 resolver");
      if (registry.status !== "supported" || registry.value === null) {
        return assert.fail("expected the resolver owner fixture");
      }
      const owner = registry.value.owner;
      if (owner === null) return assert.fail("expected a resolver owner");

      const [owned, metadata, approvals] = yield* Effect.all(
        [
          getResolversForAddress.effect(sepoliaConfig, { address: owner }),
          getResolverMetadata.effect(sepoliaConfig, { resolver: name.resolver }),
          getResolverApprovals.effect(sepoliaConfig, {
            filter: { namehash: name.namehash, resolver: name.resolver },
          }),
        ],
        { concurrency: "unbounded" },
      );
      assert.strictEqual(owned.status, "supported");
      assert.strictEqual(metadata.status, "supported");
      assert.strictEqual(approvals.status, "supported");
      if (owned.status !== "supported") return;
      assert.isTrue(owned.value.items.some(({ address }) => address === name.resolver));
    }),
  );
});
