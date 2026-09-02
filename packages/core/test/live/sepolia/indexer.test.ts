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
import { sepoliaConfig, sepoliaNames } from "../setup/sepolia.js";

const indexedV2Name = "testingname.eth";
const indexedV2Owner = "0x00A2895816e64F152FF81c8A931DC1bd9F5c3ce3";
const fixtureSeededAtBlock = 11_601_253n;

describe("Sepolia indexers", () => {
  it.effect("reports V1 and V2 health and reads exact names from both protocols", () =>
    Effect.gen(function* () {
      const status = yield* getIndexerStatus.effect(sepoliaConfig);
      assert.lengthOf(status.sources, 2);
      for (const source of status.sources) {
        assert.strictEqual(source.status, "ready", `${source.protocol} is not ready`);
        if (source.status !== "ready") continue;
        assert.strictEqual(source.health, "healthy");
        assert.isTrue(source.indexedBlock.number > 0n);
      }

      const legacy = yield* getIndexedName.effect(sepoliaConfig, {
        name: sepoliaNames.v1.reserved,
      });
      assert.isNotNull(legacy);
      assert.strictEqual(legacy?.protocol, "v1");

      const native = yield* getIndexedName.effect(sepoliaConfig, { name: indexedV2Name });
      assert.isNotNull(native);
      assert.strictEqual(native?.protocol, "v2");
      assert.strictEqual(native?.owner, indexedV2Owner);

      const fixture = yield* getIndexedName.effect(sepoliaConfig, { name: sepoliaNames.v2.root });
      if (fixture === null && sepoliaNames.v2.root === "ensforge-smoke.eth") {
        const v2 = status.sources.find((source) => source.protocol === "v2");
        assert.strictEqual(v2?.status, "ready");
        if (v2?.status === "ready") {
          assert.isTrue(
            v2.indexedBlock.number < fixtureSeededAtBlock,
            "ensforge-smoke.eth is missing even though the V2 indexer passed its seed block",
          );
        }
      } else {
        assert.strictEqual(fixture?.protocol, "v2");
      }
    }),
  );

  it.effect("filters, searches, and paginates V2 names", () =>
    Effect.gen(function* () {
      const names = yield* getNames.effect(sepoliaConfig, {
        filter: { name: indexedV2Name, protocol: "v2" },
      });
      assert.lengthOf(names.items, 1);
      assert.strictEqual(names.items[0]?.namehash, namehash(indexedV2Name));

      const search = yield* searchNames.effect(sepoliaConfig, {
        query: "testingname",
        field: "label",
        mode: "starts-with",
        filter: { protocol: "v2" },
      });
      assert.isTrue(search.items.some(({ namehash: hash }) => hash === namehash(indexedV2Name)));

      const firstChildren = yield* getSubnames.effect(sepoliaConfig, {
        name: "eth",
        filter: { protocol: "v2" },
        pageSize: 2,
      });
      assert.lengthOf(firstChildren.items, 2);
      assert.isTrue(firstChildren.pageInfo.hasNextPage);
      assert.isNotNull(firstChildren.pageInfo.cursor);
      if (firstChildren.pageInfo.cursor === null) return;
      const secondChildren = yield* getSubnames.effect(sepoliaConfig, {
        name: "eth",
        filter: { protocol: "v2" },
        pageSize: 2,
        cursor: firstChildren.pageInfo.cursor,
      });
      const firstHashes = new Set(firstChildren.items.map(({ namehash: hash }) => hash));
      assert.isTrue(secondChildren.items.every(({ namehash: hash }) => !firstHashes.has(hash)));
    }),
  );

  it.effect("discovers V2 ownership and resolved-address relations", () =>
    Effect.gen(function* () {
      const owned = yield* getNamesForAddress.effect(sepoliaConfig, {
        address: indexedV2Owner,
        filter: { protocol: "v2" },
      });
      const ownedName = owned.items.find(({ namehash: hash }) => hash === namehash(indexedV2Name));
      assert.isDefined(ownedName);
      assert.include(ownedName?.relations ?? [], "owner");

      const resolved = yield* getResolvedNamesForAddress.effect(sepoliaConfig, {
        address: indexedV2Owner,
        filter: { protocol: "v2" },
      });
      const resolvedName = resolved.items.find(
        ({ name }) => name.namehash === namehash(indexedV2Name),
      );
      assert.isDefined(resolvedName);
      assert.strictEqual(resolvedName?.verification, "indexed-unverified");
    }),
  );

  it.effect("decodes indexed V1 and V2 labels", () =>
    Effect.gen(function* () {
      const decodedV2 = yield* getDecodedName.effect(sepoliaConfig, {
        name: `[${labelhash("testingname").slice(2)}].eth`,
      });
      const decodedV1 = yield* getDecodedName.effect(sepoliaConfig, {
        name: `[${labelhash("vitalik").slice(2)}].eth`,
      });
      assert.strictEqual(decodedV2, indexedV2Name);
      assert.strictEqual(decodedV1, sepoliaNames.v1.reserved);
    }),
  );
});
