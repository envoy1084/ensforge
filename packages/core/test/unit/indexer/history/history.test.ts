import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { namehash } from "viem/ens";

import {
  getEvents,
  getNameHistory,
  getRegistrationHistory,
} from "../../../../src/actions/indexer/history/index.js";
import { createConfig } from "../../../../src/index.js";
import { makeSepoliaPublicClient } from "../../fixtures/client-fixtures.js";

const resolver = "0x0000000000000000000000000000000000001000" as const;
const owner = "0x0000000000000000000000000000000000002000" as const;
const transactionHash = `0x${"ab".repeat(32)}` as const;
const aliceNamehash = namehash("alice.eth");
const response = (data: unknown) =>
  new Response(JSON.stringify({ data }), { headers: { "content-type": "application/json" } });
const request = (init: RequestInit | undefined) =>
  JSON.parse(String(init?.body)) as {
    readonly query: string;
    readonly variables: Record<string, unknown>;
  };

const v2Node = (overrides: Readonly<Record<string, unknown>>) => ({
  id: "event",
  type: "FutureEvent",
  protocol: "v2",
  name: "alice.eth",
  namehash: aliceNamehash,
  blockNumber: 100,
  timestamp: 2000,
  transactionHash,
  contractAddress: resolver,
  data: "{}",
  key: null,
  value: null,
  asAddressChanged: null,
  asExpiryUpdated: null,
  asFusesSet: null,
  asLabelRegistered: null,
  asNameRegistered: null,
  asNameRenewed: null,
  asNameUnwrapped: null,
  asNameWrapped: null,
  asRegistryTransfer: null,
  asResolverUpdated: null,
  asReverseClaimed: null,
  asTextChanged: null,
  asTransfer: null,
  ...overrides,
});

const v1Response = () =>
  response({
    _meta: { block: { number: 150 } },
    domainEvents: [
      {
        __typename: "NewResolver",
        id: "resolver-event",
        blockNumber: 90,
        transactionID: transactionHash,
        domain: { id: aliceNamehash, name: "alice.eth" },
        resolver: { address: resolver },
      },
    ],
    registrationEvents: [
      {
        __typename: "NameRegistered",
        id: "registration-event",
        blockNumber: 80,
        transactionID: transactionHash,
        registrant: { id: owner },
        expiryDate: "3000",
        registration: {
          cost: "10",
          domain: { id: aliceNamehash, name: "alice.eth" },
        },
      },
    ],
    resolverEvents: [
      {
        __typename: "TextChanged",
        id: "record-event",
        blockNumber: 100,
        transactionID: transactionHash,
        resolver: {
          id: "resolver-binding",
          address: resolver,
          domain: { id: aliceNamehash, name: "alice.eth" },
        },
        key: "url",
        value: "https://example.com",
      },
    ],
  });

const v2Response = () =>
  response({
    _meta: { block: { number: 250 } },
    eventConnection: {
      edges: [
        {
          cursor: "renewal-cursor",
          node: v2Node({
            id: "renewal-event",
            type: "NameRenewed",
            blockNumber: 110,
            data: JSON.stringify({ expires: 4000 }),
            asNameRenewed: { expires: 4000, id: "1" },
          }),
        },
      ],
      pageInfo: { hasNextPage: false, endCursor: "renewal-cursor" },
    },
  });

describe("indexed history", () => {
  it.effect("merges domain, registration, resolver, and V2 events chronologically", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = (_input, init) =>
        Promise.resolve(request(init).query.includes("V1GetEvents") ? v1Response() : v2Response());
      const config = createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
        indexer: { fetch, retry: { attempts: 0 } },
      });

      const page = yield* getNameHistory.effect(config, { name: "alice.eth", pageSize: 10 });

      assert.deepStrictEqual(
        page.items.map(({ kind }) => kind),
        ["renewal", "record", "resolver", "registration"],
      );
      assert.isTrue(page.items.every(({ name }) => name === "alice.eth"));
      assert.deepInclude(page.items[1], { kind: "record", recordKind: "text", key: "url" });
      assert.isNotNull(page.items[0]?.raw.data);
    }),
  );

  it.effect("keeps registration history focused on lifecycle events", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = (_input, init) =>
        Promise.resolve(request(init).query.includes("V1GetEvents") ? v1Response() : v2Response());
      const config = createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
        indexer: { fetch, retry: { attempts: 0 } },
      });

      const page = yield* getRegistrationHistory.effect(config, { name: "alice.eth" });
      assert.deepStrictEqual(
        page.items.map(({ kind }) => kind),
        ["renewal", "registration"],
      );
    }),
  );

  it.effect("returns partial V2 history when the V1 source fails", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = (_input, init) =>
        request(init).query.includes("V1GetEvents")
          ? Promise.reject(new Error("V1 unavailable"))
          : Promise.resolve(v2Response());
      const config = createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
        indexer: { fetch, failureMode: "partial", retry: { attempts: 0 } },
      });

      const page = yield* getEvents.effect(config, { filter: { name: "alice.eth" } });
      assert.lengthOf(page.items, 1);
      assert.strictEqual(page.items[0]?.protocol, "v2");
      assert.isTrue(
        page.sources.some(({ protocol, status }) => protocol === "v1" && status === "failed"),
      );
    }),
  );

  it.effect("resumes V2 cursors and preserves unknown events across range filters", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = (_input, init) => {
        const { variables } = request(init);
        assert.deepInclude(variables.where, {
          blockNumber_gt: 50,
          timestamp_gt: 1500,
        });
        const after = variables.after;
        return Promise.resolve(
          response({
            _meta: { block: { number: 250 } },
            eventConnection: {
              edges:
                after === null
                  ? [
                      {
                        cursor: "first-cursor",
                        node: v2Node({ id: "first", blockNumber: 120, timestamp: 2100 }),
                      },
                    ]
                  : [
                      {
                        cursor: "second-cursor",
                        node: v2Node({ id: "second", blockNumber: 119, timestamp: 2099 }),
                      },
                    ],
              pageInfo: {
                hasNextPage: after === null,
                endCursor: after === null ? "first-cursor" : "second-cursor",
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

      const first = yield* getEvents.effect(config, {
        filter: { blockAfter: 50n, timestampAfter: 1500n },
        pageSize: 1,
      });
      assert.strictEqual(first.items[0]?.kind, "unknown");
      if (first.pageInfo.cursor === null) return assert.fail("expected an event cursor");
      const second = yield* getEvents.effect(config, {
        filter: { blockAfter: 50n, timestampAfter: 1500n },
        pageSize: 1,
        cursor: first.pageInfo.cursor,
      });
      assert.strictEqual(second.items[0]?.id, "second");
      assert.isFalse(second.pageInfo.hasNextPage);
    }),
  );

  it.effect("pushes V2 role and subregistry kinds into the event connection", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = (_input, init) => {
        const { variables } = request(init);
        assert.deepInclude(variables.where, {
          type_in: ["EACRolesChanged", "SubregistryUpdated"],
        });
        return Promise.resolve(
          response({
            _meta: { block: { number: 250 } },
            eventConnection: {
              edges: [],
              pageInfo: { hasNextPage: false, endCursor: null },
            },
          }),
        );
      };
      const config = createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
        indexer: { endpoints: { v1: null }, fetch, retry: { attempts: 0 } },
      });

      const page = yield* getEvents.effect(config, {
        filter: { kinds: ["role", "subregistry"] },
      });

      assert.isEmpty(page.items);
    }),
  );
});
