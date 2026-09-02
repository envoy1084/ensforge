import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { labelhash, namehash } from "viem/ens";

import {
  getRegistriesForAddress,
  getRegistry,
  getRegistryLabels,
  getRegistryRoles,
} from "../../../../src/actions/indexer/registries/index.js";
import { createConfig } from "../../../../src/index.js";
import {
  makeMainnetPublicClient,
  makeSepoliaPublicClient,
} from "../../fixtures/client-fixtures.js";

const registry = "0x0000000000000000000000000000000000001000" as const;
const parentRegistry = "0x0000000000000000000000000000000000002000" as const;
const owner = "0x0000000000000000000000000000000000003000" as const;
const account = "0x0000000000000000000000000000000000004000" as const;
const transactionHash = `0x${"ab".repeat(32)}` as const;

const response = (data: unknown) =>
  new Response(JSON.stringify({ data }), { headers: { "content-type": "application/json" } });
const request = (init: RequestInit | undefined) =>
  JSON.parse(String(init?.body)) as {
    readonly query: string;
    readonly variables: Record<string, unknown>;
  };

const registryWire = (name = "alice.eth") => ({
  address: registry,
  name,
  namehash: namehash(name),
  owner: { id: owner },
  parentRegistry,
  createdAt: 100,
  createdBlock: 10,
  labelCount: 2,
  referencedByCount: 1,
  roleCount: 3,
  eventCount: 4,
});

const nameWire = (name: string) => {
  const [label = ""] = name.split(".");
  return {
    id: name,
    protocol: "v2",
    name,
    labelName: label,
    labelhash: labelhash(label),
    parent: { id: name.slice(label.length + 1), subregistry: { address: registry } },
    owner: { id: owner },
    registrant: { id: owner },
    resolvedAddress: null,
    resolver: null,
    createdAt: 100,
    expiryDate: null,
    subdomainCount: 0,
    isMigrated: false,
    ttl: null,
    wrappedOwner: null,
    wrappedDomain: null,
    subregistry: null,
    canonicalId: "1",
    tokenId: "1",
    tokenVersion: 1,
    registrationDate: 100,
    gracePeriodEnd: null,
    unreachableSince: null,
    isNormalized: true,
    isReachable: true,
    isWrapped: false,
    roleHolderCount: 0,
  };
};

describe("indexed registries", () => {
  it.effect("gets a registry by managed name", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = (_input, init) => {
        const operation = request(init);
        assert.include(operation.query, "V2GetRegistryByName");
        assert.strictEqual(operation.variables.name, "alice.eth");
        return Promise.resolve(
          response({
            _meta: { block: { number: 500 } },
            domain: { subregistry: registryWire() },
          }),
        );
      };
      const config = createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
        indexer: { endpoints: { v1: null }, fetch, retry: { attempts: 0 } },
      });

      const result = yield* getRegistry.effect(config, { name: "ALICE.eth" });
      assert.strictEqual(result.status, "supported");
      if (result.status !== "supported") return;
      assert.strictEqual(result.value?.address, registry);
      assert.strictEqual(result.value?.labelCount, 2);
      assert.strictEqual(result.value?.source.indexedBlock, 500n);
    }),
  );

  it.effect("paginates the complete registry-owner result with opaque cursors", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = () =>
        Promise.resolve(
          response({
            _meta: { block: { number: 500 } },
            registries: [registryWire("alice.eth"), registryWire("bob.eth")],
          }),
        );
      const config = createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
        indexer: { endpoints: { v1: null }, fetch, retry: { attempts: 0 } },
      });

      const first = yield* getRegistriesForAddress.effect(config, { address: owner, pageSize: 1 });
      assert.strictEqual(first.status, "supported");
      if (first.status !== "supported" || first.value.pageInfo.cursor === null) {
        return assert.fail("expected a registry cursor");
      }
      const second = yield* getRegistriesForAddress.effect(config, {
        address: owner,
        pageSize: 1,
        cursor: first.value.pageInfo.cursor,
      });
      assert.strictEqual(second.status, "supported");
      if (second.status !== "supported") return;
      assert.strictEqual(second.value.items[0]?.managedName.value, "bob.eth");
      assert.isFalse(second.value.pageInfo.hasNextPage);
    }),
  );

  it.effect("keeps direct labels separate from subregistry references", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = (_input, init) => {
        const operation = request(init);
        assert.include(operation.query, "V2GetRegistryReferences");
        return Promise.resolve(
          response({
            _meta: { block: { number: 500 } },
            registry: {
              referencedByConnection: {
                edges: [{ cursor: "reference-1", node: nameWire("parent.eth") }],
                pageInfo: { hasNextPage: false, endCursor: "reference-1" },
              },
            },
          }),
        );
      };
      const config = createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
        indexer: { endpoints: { v1: null }, fetch, retry: { attempts: 0 } },
      });

      const result = yield* getRegistryLabels.effect(config, {
        address: registry,
        relationship: "referenced-by",
      });
      assert.strictEqual(result.status, "supported");
      if (result.status !== "supported") return;
      assert.deepInclude(result.value.items[0], { relationship: "referenced-by" });
    }),
  );

  it.effect("filters roles while preserving raw bitmap and decoded permissions", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = () =>
        Promise.resolve(
          response({
            _meta: { block: { number: 500 } },
            registry: {
              roleConnection: {
                edges: [
                  {
                    cursor: "role-1",
                    node: {
                      id: "role-1",
                      account,
                      resource: "1",
                      name: "alice.eth",
                      roleBitmap: "0x00",
                      permissions: [],
                      blockNumber: 10,
                      timestamp: 100,
                      transactionHash,
                    },
                  },
                  {
                    cursor: "role-2",
                    node: {
                      id: "role-2",
                      account,
                      resource: "1",
                      name: "alice.eth",
                      roleBitmap: "0x01",
                      permissions: ["SET_RESOLVER"],
                      blockNumber: 20,
                      timestamp: 200,
                      transactionHash,
                    },
                  },
                ],
                pageInfo: { hasNextPage: false, endCursor: "role-2" },
              },
            },
          }),
        );
      const config = createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
        indexer: { endpoints: { v1: null }, fetch, retry: { attempts: 0 } },
      });

      const result = yield* getRegistryRoles.effect(config, {
        registry,
        filter: { active: true, permission: "SET_RESOLVER" },
      });
      assert.strictEqual(result.status, "supported");
      if (result.status !== "supported") return;
      assert.lengthOf(result.value.items, 1);
      assert.strictEqual(result.value.items[0]?.bitmap, "0x01");
      assert.deepStrictEqual(result.value.items[0]?.permissions, ["SET_RESOLVER"]);
    }),
  );

  it.effect("returns unsupported when the configured network has no V2 indexer", () =>
    Effect.gen(function* () {
      const config = createConfig({
        network: "mainnet",
        publicClient: makeMainnetPublicClient(),
      });
      const result = yield* getRegistry.effect(config, { address: registry });
      assert.deepStrictEqual(result, {
        status: "unsupported",
        network: "mainnet",
        reason: "V2_INDEXER_UNAVAILABLE",
      });
    }),
  );
});
