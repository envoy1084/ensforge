import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { labelhash, namehash } from "viem/ens";

import {
  getDecodedName,
  getIndexedName,
  getIndexerStatus,
  getNames,
  getNamesForAddress,
  getResolvedNamesForAddress,
  getSubnames,
  searchNames,
} from "../../../src/actions/indexer/index.js";
import { mainnetConfig } from "../setup/mainnet.js";

const vitalik = "vitalik.eth";
const vitalikOwner = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

describe("Mainnet indexer", () => {
  it.effect("reads status, an exact V1 name, and an encoded label", () =>
    Effect.gen(function* () {
      const status = yield* getIndexerStatus.effect(mainnetConfig);
      const v1 = status.sources.find((source) => source.protocol === "v1");
      const v2 = status.sources.find((source) => source.protocol === "v2");
      assert.strictEqual(v1?.status, "ready");
      if (v1?.status !== "ready") return;
      assert.strictEqual(v1.health, "healthy");
      assert.isTrue(v1.indexedBlock.number > 0n);
      assert.strictEqual(v2?.status, "unavailable");

      const exact = yield* getIndexedName.effect(mainnetConfig, { name: vitalik });
      assert.isNotNull(exact);
      if (exact === null) return;
      assert.strictEqual(exact.protocol, "v1");
      assert.strictEqual(exact.name.kind, "normalized");
      if (exact.name.kind !== "normalized") return;
      assert.strictEqual(exact.name.value, vitalik);
      assert.strictEqual(exact.owner, vitalikOwner);

      const decoded = yield* getDecodedName.effect(mainnetConfig, {
        name: `[${labelhash("vitalik").slice(2)}].eth`,
      });
      assert.strictEqual(decoded, vitalik);
    }),
  );

  it.effect("enumerates V1 names, search results, and subnames", () =>
    Effect.gen(function* () {
      const names = yield* getNames.effect(mainnetConfig, {
        filter: { name: vitalik, protocol: "v1" },
      });
      assert.lengthOf(names.items, 1);
      assert.strictEqual(names.items[0]?.namehash, namehash(vitalik));

      const search = yield* searchNames.effect(mainnetConfig, {
        query: vitalik,
        field: "name",
        mode: "starts-with",
        filter: { protocol: "v1" },
        pageSize: 5,
      });
      assert.isAbove(search.items.length, 0);

      const children = yield* getSubnames.effect(mainnetConfig, {
        name: vitalik,
        filter: { protocol: "v1" },
        pageSize: 5,
      });
      assert.isAbove(children.items.length, 0);
      assert.isTrue(
        children.items.every(({ parentNamehash }) => parentNamehash === namehash(vitalik)),
      );
    }),
  );

  it.effect("discovers V1 ownership and resolved-address relations", () =>
    Effect.gen(function* () {
      const owned = yield* getNamesForAddress.effect(mainnetConfig, {
        address: vitalikOwner,
        filter: { name: vitalik, protocol: "v1" },
        pageSize: 5,
      });
      const ownedVitalik = owned.items.find(({ namehash: hash }) => hash === namehash(vitalik));
      assert.isDefined(ownedVitalik);
      assert.include(ownedVitalik?.relations ?? [], "owner");

      const resolved = yield* getResolvedNamesForAddress.effect(mainnetConfig, {
        address: vitalikOwner,
        filter: { name: vitalik, protocol: "v1" },
        pageSize: 5,
      });
      assert.isAbove(resolved.items.length, 0);
      assert.strictEqual(resolved.items[0]?.verification, "indexed-unverified");
      assert.strictEqual(resolved.items[0]?.address, vitalikOwner);
    }),
  );
});
