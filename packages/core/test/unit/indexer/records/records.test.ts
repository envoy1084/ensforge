import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { namehash } from "viem/ens";

import {
  getIndexedRecords,
  getRecordHistory,
} from "../../../../src/actions/indexer/records/index.js";
import { createConfig } from "../../../../src/index.js";
import {
  makeMainnetPublicClient,
  makeSepoliaPublicClient,
} from "../../fixtures/client-fixtures.js";

const resolver = "0x0000000000000000000000000000000000001000" as const;
const oldResolver = "0x0000000000000000000000000000000000002000" as const;
const transactionHash = `0x${"ab".repeat(32)}` as const;
const response = (data: unknown) =>
  new Response(JSON.stringify({ data }), { headers: { "content-type": "application/json" } });
const request = (init: RequestInit | undefined) =>
  JSON.parse(String(init?.body)) as {
    readonly query: string;
    readonly variables: Record<string, unknown>;
  };

describe("indexed records", () => {
  it.effect("combines protocol inventories and marks only current resolver bindings", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = (_input, init) => {
        const { query, variables } = request(init);
        if (query.includes("V1GetIndexedRecords")) {
          assert.deepInclude(variables, { domainId: namehash("alice.eth") });
          return Promise.resolve(
            response({
              _meta: { block: { number: 100 } },
              domain: { resolver: { id: "current-v1" } },
              resolvers: [
                {
                  id: "old-v1",
                  address: oldResolver,
                  texts: ["url"],
                  coinTypes: ["60"],
                  contentHash: "0x",
                  events: [{ __typename: "NameChanged", name: "alice.eth" }],
                },
                {
                  id: "current-v1",
                  address: resolver,
                  texts: ["com.twitter"],
                  coinTypes: ["0", "60"],
                  contentHash: "0xe3010170",
                  events: [
                    { __typename: "AbiChanged", contentType: "1" },
                    {
                      __typename: "InterfaceChanged",
                      interfaceID: "0x01ffc9a7",
                      implementer: resolver,
                    },
                    {
                      __typename: "InterfaceChanged",
                      interfaceID: "0x01ffc9a7",
                      implementer: "0x0000000000000000000000000000000000000000",
                    },
                    { __typename: "VersionChanged", version: "2" },
                  ],
                },
              ],
            }),
          );
        }
        assert.deepInclude(variables, { protocol: "v2" });
        return Promise.resolve(
          response({
            _meta: { block: { number: 200 } },
            byName: { resolver: { id: "current-v2" } },
            byNamehash: null,
            resolvers: [
              {
                id: "current-v2",
                address: resolver,
                texts: ["avatar"],
                coinTypes: ["60"],
                contentHash: null,
                abis: [1, 2],
                pubkey: { x: "0x01", y: "0x02" },
                interfaces: [{ interfaceId: "0x01ffc9a7" }],
                reverseName: null,
                version: 3,
              },
            ],
          }),
        );
      };
      const config = createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
        indexer: { fetch, retry: { attempts: 0 } },
      });

      const result = yield* getIndexedRecords.effect(config, { name: "alice.eth" });

      assert.isFalse(result.authoritative);
      assert.lengthOf(result.bindings, 3);
      assert.lengthOf(
        result.bindings.filter(({ current }) => current),
        2,
      );
      assert.deepStrictEqual(result.bindings[1]?.records.coinTypes, [0n, 60n]);
      assert.deepStrictEqual(result.bindings[1]?.records.abiContentTypes, [1n]);
      assert.deepStrictEqual(result.bindings[1]?.records.interfaceIds, ["0x01ffc9a7"]);
      assert.strictEqual(result.bindings[2]?.version, 3n);
    }),
  );

  it.effect("queries every historical V1 resolver and normalizes filtered record events", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = (_input, init) => {
        const variables = request(init).variables;
        assert.deepInclude(variables.where, { resolver_: { domain: namehash("alice.eth") } });
        return Promise.resolve(
          response({
            _meta: { block: { number: 100 } },
            resolverEvents: [
              {
                __typename: "TextChanged",
                id: "100-2",
                blockNumber: 100,
                transactionID: transactionHash,
                resolver: { id: "old", address: oldResolver },
                key: "url",
                value: "",
              },
              {
                __typename: "TextChanged",
                id: "100-1",
                blockNumber: 100,
                transactionID: transactionHash,
                resolver: { id: "old", address: oldResolver },
                key: "url",
                value: "https://example.com",
              },
              {
                __typename: "AddrChanged",
                id: "100-2",
                blockNumber: 100,
                transactionID: transactionHash,
                resolver: { id: "current", address: resolver },
                addr: { id: resolver },
              },
            ],
          }),
        );
      };
      const config = createConfig({
        network: "mainnet",
        publicClient: makeMainnetPublicClient(),
        indexer: { endpoints: { v2: null }, fetch, retry: { attempts: 0 } },
      });

      const page = yield* getRecordHistory.effect(config, {
        name: "alice.eth",
        filter: { kinds: ["text"], textKey: "url" },
      });

      assert.lengthOf(page.items, 2);
      assert.deepInclude(page.items[0], {
        kind: "text",
        key: "url",
        value: "",
        resolver: oldResolver,
      });
      assert.strictEqual(page.items[1]?.id, "100-1");
      assert.isFalse(page.pageInfo.hasNextPage);
    }),
  );

  it.effect("paginates V2 record history and preserves its raw event payload", () =>
    Effect.gen(function* () {
      const events = [
        {
          cursor: "address-cursor",
          node: {
            id: "address-event",
            type: "AddressChanged",
            protocol: "v2",
            namehash: namehash("alice.eth"),
            blockNumber: 200,
            timestamp: 2_000,
            transactionHash,
            contractAddress: resolver,
            data: JSON.stringify({ resolver, coinType: 60, address: resolver }),
            key: null,
            value: null,
            asAddressChanged: { address: resolver, coinType: 60 },
            asTextChanged: null,
          },
        },
        {
          cursor: "text-cursor",
          node: {
            id: "text-event",
            type: "TextChanged",
            protocol: "v2",
            namehash: namehash("alice.eth"),
            blockNumber: 199,
            timestamp: 1_999,
            transactionHash,
            contractAddress: resolver,
            data: JSON.stringify({ resolver, key: "avatar", value: "ipfs://avatar" }),
            key: "avatar",
            value: "ipfs://avatar",
            asAddressChanged: null,
            asTextChanged: { key: "avatar", value: "ipfs://avatar" },
          },
        },
      ];
      const fetch: typeof globalThis.fetch = (_input, init) => {
        const variables = request(init).variables;
        const after = variables.after;
        const selected =
          after === "address-cursor" ? events.slice(1) : after === "text-cursor" ? [] : events;
        return Promise.resolve(
          response({
            _meta: { block: { number: 250 } },
            eventConnection: {
              edges: selected,
              pageInfo: { hasNextPage: false, endCursor: selected.at(-1)?.cursor ?? null },
            },
          }),
        );
      };
      const config = createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
        indexer: { endpoints: { v1: null }, fetch, retry: { attempts: 0 } },
      });

      const first = yield* getRecordHistory.effect(config, { name: "alice.eth", pageSize: 1 });
      assert.strictEqual(first.items[0]?.kind, "address");
      assert.isNotNull(first.items[0]?.raw.data);
      if (first.pageInfo.cursor === null) return assert.fail("expected another history page");
      const second = yield* getRecordHistory.effect(config, {
        name: "alice.eth",
        pageSize: 1,
        cursor: first.pageInfo.cursor,
      });
      assert.strictEqual(second.items[0]?.kind, "text");
      assert.isFalse(second.pageInfo.hasNextPage);
    }),
  );
});
