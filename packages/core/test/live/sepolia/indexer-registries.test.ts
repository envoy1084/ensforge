import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  getRegistriesForAddress,
  getRegistry,
  getRegistryLabels,
  getRegistryRoles,
} from "../../../src/actions/indexer/registries/index.js";
import { sepoliaConfig, sepoliaNames } from "../setup/sepolia.js";

describe("Sepolia indexed registries", () => {
  it.effect("discovers the smoke namespace and its labels", () =>
    Effect.gen(function* () {
      const lookup = yield* getRegistry.effect(sepoliaConfig, {
        name: sepoliaNames.v2.indexedRegistry,
      });
      assert.strictEqual(lookup.status, "supported");
      if (lookup.status !== "supported" || lookup.value === null) {
        return assert.fail("expected the smoke namespace registry");
      }

      const labels = yield* getRegistryLabels.effect(sepoliaConfig, {
        address: lookup.value.address,
        pageSize: 10,
      });
      assert.strictEqual(labels.status, "supported");
      if (labels.status !== "supported") return;
      assert.isAbove(labels.value.items.length, 0);
      assert.isTrue(labels.value.items.every(({ relationship }) => relationship === "label"));
    }),
  );

  it.effect("discovers the registry owner and role assignments", () =>
    Effect.gen(function* () {
      const lookup = yield* getRegistry.effect(sepoliaConfig, {
        name: sepoliaNames.v2.indexedRegistry,
      });
      if (lookup.status !== "supported" || lookup.value === null) {
        return assert.fail("expected a registry with an indexed owner");
      }
      const indexedRegistry = lookup.value;
      const registryOwner = indexedRegistry.owner;
      if (registryOwner === null) return assert.fail("expected an indexed registry owner");

      const [registries, roles] = yield* Effect.all(
        [
          getRegistriesForAddress.effect(sepoliaConfig, { address: registryOwner }),
          getRegistryRoles.effect(sepoliaConfig, {
            registry: indexedRegistry.address,
            pageSize: 10,
          }),
        ],
        { concurrency: "unbounded" },
      );
      assert.strictEqual(registries.status, "supported");
      assert.strictEqual(roles.status, "supported");
      if (registries.status !== "supported" || roles.status !== "supported") return;
      assert.isTrue(
        registries.value.items.some(({ address }) => address === indexedRegistry.address),
      );
      assert.isAbove(roles.value.items.length, 0);
    }),
  );
});
