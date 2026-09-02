import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { getIndexerStatus } from "../../../src/actions/indexer/index.js";
import { createConfig } from "../../../src/index.js";
import { makeMainnetPublicClient, makeSepoliaPublicClient } from "../fixtures/client-fixtures.js";

const graphqlResponse = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const healthyV1Response = {
  data: {
    _meta: {
      block: {
        number: 25_891_477,
        hash: "0x7963ed730196d47909962b1e611e41f852e09a415f5f75dbbe56917e02d6a77e",
        timestamp: 1_788_374_603,
      },
      deployment: "QmV1Deployment",
      hasIndexingErrors: false,
    },
  },
};

const healthyV2Response = {
  data: {
    _meta: {
      block: { number: 11_536_163, hash: null, timestamp: null },
      deployment: null,
      hasIndexingErrors: false,
    },
  },
};

describe("getIndexerStatus", () => {
  it.effect("reports Mainnet V1 and explicit V2 unavailability", () =>
    Effect.gen(function* () {
      let requests = 0;
      const fetch: typeof globalThis.fetch = () => {
        requests += 1;
        return Promise.resolve(graphqlResponse(healthyV1Response));
      };
      const config = createConfig({
        network: "mainnet",
        publicClient: makeMainnetPublicClient(),
        indexer: { fetch, retry: { attempts: 0 } },
      });

      const result = yield* getIndexerStatus.effect(config);

      assert.strictEqual(requests, 1);
      assert.deepStrictEqual(result.sources, [
        {
          protocol: "v1",
          status: "ready",
          health: "healthy",
          indexedBlock: {
            number: 25_891_477n,
            hash: "0x7963ed730196d47909962b1e611e41f852e09a415f5f75dbbe56917e02d6a77e",
            timestamp: 1_788_374_603n,
          },
          deployment: "QmV1Deployment",
        },
        { protocol: "v2", status: "unavailable" },
      ]);
    }),
  );

  it.effect("keeps a healthy source when another source fails", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = (_input, init) => {
        const body = String(init?.body);
        return Promise.resolve(
          body.includes("V1IndexerStatus")
            ? graphqlResponse({ errors: [{ message: "temporarily unavailable" }] }, 503)
            : graphqlResponse(healthyV2Response),
        );
      };
      const config = createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
        indexer: { fetch, retry: { attempts: 0 } },
      });

      const result = yield* getIndexerStatus.effect(config);
      const [v1, v2] = result.sources;
      if (v1 === undefined || v2 === undefined) return assert.fail("expected both indexer sources");

      assert.strictEqual(v1.status, "failed");
      if (v1.status !== "failed") return;
      assert.deepStrictEqual(v1.failure, {
        code: "HTTP_FAILED",
        message: "The sepolia:v1 indexer request failed with HTTP 503",
        retryable: true,
        httpStatus: 503,
      });
      assert.strictEqual(v2.status, "ready");
      if (v2.status !== "ready") return;
      assert.strictEqual(v2.indexedBlock.number, 11_536_163n);
      assert.isNull(v2.indexedBlock.hash);
    }),
  );

  it.effect("does not expose endpoint or header credentials in failures", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = () =>
        Promise.resolve(graphqlResponse({ errors: [{ message: "unauthorized" }] }, 401));
      const config = createConfig({
        network: "mainnet",
        publicClient: makeMainnetPublicClient(),
        indexer: {
          endpoints: { v1: "https://indexer.example/api/path-secret/graphql" },
          headers: { authorization: "Bearer header-secret" },
          fetch,
          retry: { attempts: 0 },
        },
      });

      const result = yield* getIndexerStatus.effect(config);
      const serialized = JSON.stringify(result);

      assert.notInclude(serialized, "path-secret");
      assert.notInclude(serialized, "header-secret");
      assert.include(serialized, "HTTP_FAILED");
    }),
  );
});
