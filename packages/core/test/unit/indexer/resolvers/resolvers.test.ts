import { assert, describe, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";

import { namehash } from "viem/ens";

import {
  getIndexedResolver,
  getResolverApprovals,
  getResolverMetadata,
  getResolversForAddress,
} from "../../../../src/actions/indexer/resolvers/index.js";
import { createConfig } from "../../../../src/index.js";
import { Namehash } from "../../../../src/schemas/hash.js";
import {
  makeMainnetPublicClient,
  makeSepoliaPublicClient,
} from "../../fixtures/client-fixtures.js";

const resolver = "0x0000000000000000000000000000000000001000" as const;
const secondResolver = "0x0000000000000000000000000000000000002000" as const;
const owner = "0x0000000000000000000000000000000000003000" as const;
const delegate = "0x0000000000000000000000000000000000004000" as const;
const aliceNamehash = Schema.decodeUnknownSync(Namehash)(namehash("alice.eth"));
const transactionHash = `0x${"ab".repeat(32)}` as const;

const response = (data: unknown) =>
  new Response(JSON.stringify({ data }), { headers: { "content-type": "application/json" } });
const request = (init: RequestInit | undefined) =>
  JSON.parse(String(init?.body)) as {
    readonly query: string;
    readonly variables: Record<string, unknown>;
  };

const binding = (protocol: "v1" | "v2") => ({
  id: `${protocol}-${resolver}-${aliceNamehash}`,
  address: resolver,
  texts: ["avatar", "url"],
  coinTypes: ["60", "2147488453"],
  contentHash: "0x1234",
  ...(protocol === "v2"
    ? {
        abis: [1],
        pubkey: { x: "0x01", y: "0x02" },
        interfaces: [{ interfaceId: "0x01ffc9a7" }],
        reverseName: "alice.eth",
        version: 2,
      }
    : {}),
  domain: { id: aliceNamehash, name: "alice.eth" },
});

describe("indexed resolvers", () => {
  it.effect("returns the useful V1 resolver binding inventory", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = (_input, init) => {
        assert.include(request(init).query, "V1GetIndexedResolver");
        return Promise.resolve(
          response({ _meta: { block: { number: 100 } }, resolvers: [binding("v1")] }),
        );
      };
      const config = createConfig({
        network: "mainnet",
        publicClient: makeMainnetPublicClient(),
        indexer: { fetch, retry: { attempts: 0 } },
      });

      const result = yield* getIndexedResolver.effect(config, { address: resolver });
      assert.strictEqual(result?.protocol, "v1");
      assert.strictEqual(result?.bindings[0]?.coinTypes[0], 60n);
      assert.strictEqual(result?.bindings[0]?.coinTypes[1], 2_147_488_453n);
      assert.deepStrictEqual(result?.bindings[0]?.textKeys, ["avatar", "url"]);
      assert.strictEqual(result?.bindings[0]?.contentHash, "0x1234");
    }),
  );

  it.effect("returns V2 contract details and per-name resolver profiles", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = (_input, init) => {
        const operation = request(init);
        assert.include(operation.query, "V2GetIndexedResolver");
        assert.strictEqual(operation.variables.protocol, null);
        return Promise.resolve(
          response({
            _meta: { block: { number: 200 } },
            detail: {
              address: resolver,
              nodeCount: 1,
              aliasCount: 1,
              aliases: [{ fromName: "alias.eth", toName: "alice.eth" }],
              roleHolderCount: 2,
              roles: [
                {
                  account: owner,
                  resource: "0x00",
                  name: null,
                  roleBitmap: "0x01",
                  timestamp: 100,
                },
              ],
            },
            bindings: [
              binding("v2"),
              {
                ...binding("v2"),
                id: `v2-${resolver}-${namehash("bob.eth")}`,
                domain: { id: namehash("bob.eth"), name: "bob.eth" },
                version: 3,
              },
            ],
          }),
        );
      };
      const config = createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
        indexer: { endpoints: { v1: null }, fetch, retry: { attempts: 0 } },
      });

      const result = yield* getIndexedResolver.effect(config, { address: resolver });
      assert.strictEqual(result?.protocol, "v2");
      if (result?.protocol !== "v2") return;
      assert.deepStrictEqual(result.aliases, [{ from: "alias.eth", to: "alice.eth" }]);
      assert.strictEqual(result.owner, owner);
      assert.deepStrictEqual(result.bindings[0]?.abiContentTypes, [1]);
      assert.strictEqual(result.bindings[0]?.interfaceIds[0], "0x01ffc9a7");
      assert.isTrue(result.bindings[0]?.hasPubkey);
      assert.strictEqual(result.bindings[0]?.version, 2);
      assert.strictEqual(result.bindings[1]?.name.value, "bob.eth");
      assert.strictEqual(result.bindings[1]?.version, 3);
    }),
  );

  it.effect("paginates resolver contracts owned by an address", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = () =>
        Promise.resolve(
          response({
            _meta: { block: { number: 200 } },
            resolversByOwner: [resolver, secondResolver].map((address) => ({
              address,
              nodeCount: 1,
              aliases: [],
              roleHolderCount: 1,
            })),
          }),
        );
      const config = createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
        indexer: { endpoints: { v1: null }, fetch, retry: { attempts: 0 } },
      });

      const first = yield* getResolversForAddress.effect(config, { address: owner, pageSize: 1 });
      if (first.status !== "supported" || first.value.pageInfo.cursor === null) {
        return assert.fail("expected a resolver cursor");
      }
      const second = yield* getResolversForAddress.effect(config, {
        address: owner,
        pageSize: 1,
        cursor: first.value.pageInfo.cursor,
      });
      assert.strictEqual(second.status, "supported");
      if (second.status !== "supported") return;
      assert.strictEqual(second.value.items[0]?.address, secondResolver);
    }),
  );

  it.effect("returns ENSIP-16 metadata with indexed provenance", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = () =>
        Promise.resolve(
          response({
            _meta: { block: { number: 200 } },
            metadata: {
              id: "metadata-1",
              resolver,
              graphqlUrl: "https://resolver.example/graphql",
              blockNumber: 150,
              timestamp: 1000,
              transactionHash,
            },
          }),
        );
      const config = createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
        indexer: { endpoints: { v1: null }, fetch, retry: { attempts: 0 } },
      });

      const result = yield* getResolverMetadata.effect(config, { resolver });
      assert.strictEqual(result.status, "supported");
      if (result.status !== "supported") return;
      assert.strictEqual(result.value?.blockNumber, 150n);
      assert.strictEqual(result.value?.source.indexedBlock, 200n);
    }),
  );

  it.effect("filters and paginates resolver approval and revocation history", () =>
    Effect.gen(function* () {
      const approval = (id: string, approved: boolean, blockNumber: number, logIndex: number) => ({
        id,
        approved,
        blockNumber,
        logIndex,
        resolver,
        namehash: aliceNamehash,
        context: owner,
        delegate,
        timestamp: blockNumber * 10,
        transactionHash,
      });
      const approvals = [approval("revoked", false, 20, 2), approval("approved", true, 10, 1)];
      const requestedDelegates: Array<unknown> = [];
      const fetch: typeof globalThis.fetch = (_input, init) => {
        const operation = request(init);
        requestedDelegates.push(operation.variables.delegate);
        return Promise.resolve(response({ _meta: { block: { number: 200 } }, approvals }));
      };
      const config = createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
        indexer: { endpoints: { v1: null }, fetch, retry: { attempts: 0 } },
      });

      const first = yield* getResolverApprovals.effect(config, {
        filter: { namehash: aliceNamehash },
        pageSize: 1,
      });
      assert.strictEqual(first.status, "supported");
      if (first.status !== "supported" || first.value.pageInfo.cursor === null) {
        return assert.fail("expected an approval cursor");
      }
      assert.deepStrictEqual(
        first.value.items.map(({ id }) => id),
        ["revoked"],
      );
      assert.isFalse(first.value.items[0]?.approved);

      const second = yield* getResolverApprovals.effect(config, {
        filter: { namehash: aliceNamehash },
        pageSize: 1,
        cursor: first.value.pageInfo.cursor,
      });
      assert.strictEqual(second.status, "supported");
      if (second.status !== "supported") return;
      assert.deepStrictEqual(
        second.value.items.map(({ id }) => id),
        ["approved"],
      );

      const filtered = yield* getResolverApprovals.effect(config, {
        filter: { delegate, approved: false },
        pageSize: 1,
      });
      assert.strictEqual(filtered.status, "supported");
      if (filtered.status !== "supported") return;
      assert.deepStrictEqual(
        filtered.value.items.map(({ id }) => id),
        ["revoked"],
      );
      assert.isFalse(filtered.value.items[0]?.approved);
      assert.include(requestedDelegates, delegate.toLowerCase());
    }),
  );

  it.effect("requires an indexed approval anchor", () =>
    Effect.gen(function* () {
      const config = createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
        indexer: { endpoints: { v1: null }, retry: { attempts: 0 } },
      });
      const result = yield* Effect.exit(
        getResolverApprovals.effect(config, { filter: {}, pageSize: 1 }),
      );

      assert.isTrue(Exit.isFailure(result));
    }),
  );

  it.effect("returns unsupported for V2-only resolver discovery without a V2 source", () =>
    Effect.gen(function* () {
      const config = createConfig({
        network: "mainnet",
        publicClient: makeMainnetPublicClient(),
      });
      const result = yield* getResolverMetadata.effect(config, { resolver });
      assert.deepStrictEqual(result, {
        status: "unsupported",
        network: "mainnet",
        reason: "V2_INDEXER_UNAVAILABLE",
      });
    }),
  );
});
