import { assert, describe, it } from "@effect/vitest";
import { Effect, Fiber } from "effect";
import { TestClock } from "effect/testing";

import {
  IndexerDecodeError,
  IndexerRequestError,
  IndexerUnavailableError,
} from "../../../../src/actions/indexer/index.js";
import { createConfig } from "../../../../src/index.js";
import { requestIndexer } from "../../../../src/internal/indexer/client.js";
import { makeMainnetPublicClient } from "../../fixtures/client-fixtures.js";

const query = "query Status { _meta { block { number } } }";
const offlineFetch: typeof globalThis.fetch = () => Promise.reject(new TypeError("offline"));

const response = (body: unknown, init: ResponseInit = {}): Response =>
  new Response(typeof body === "string" ? body : JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
    ...init,
  });

const makeConfig = (
  fetch: typeof globalThis.fetch,
  indexer: { readonly timeout?: number; readonly attempts?: number } = {},
) =>
  createConfig({
    network: "mainnet",
    publicClient: makeMainnetPublicClient(),
    indexer: {
      fetch,
      timeout: indexer.timeout ?? 1_000,
      retry: { attempts: indexer.attempts ?? 0 },
    },
  });

const request = (config: ReturnType<typeof makeConfig>) =>
  requestIndexer<{ readonly _meta: { readonly block: { readonly number: number } } }>(config, {
    protocol: "v1",
    operationName: "Status",
    document: query,
  });

describe("indexer client", () => {
  it.effect("returns typed data and request metadata", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = (_input, init) => {
        assert.instanceOf(init?.signal, AbortSignal);
        assert.deepStrictEqual(JSON.parse(String(init?.body)), { query });
        return Promise.resolve(response({ data: { _meta: { block: { number: 42 } } } }));
      };
      const result = yield* request(makeConfig(fetch));

      assert.deepStrictEqual(result, {
        data: { _meta: { block: { number: 42 } } },
        errors: [],
        status: 200,
      });
    }),
  );

  it.effect("preserves partial GraphQL data and structured errors", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = () =>
        Promise.resolve(
          response({
            data: { _meta: { block: { number: 42 } } },
            errors: [
              {
                message: "resolver failed",
                path: ["domain", "resolver"],
                locations: [{ line: 2, column: 3 }],
                extensions: { code: "INTERNAL" },
              },
            ],
          }),
        );
      const result = yield* request(makeConfig(fetch));

      assert.deepStrictEqual(result.data, { _meta: { block: { number: 42 } } });
      assert.deepStrictEqual(result.errors, [
        {
          message: "resolver failed",
          path: ["domain", "resolver"],
          locations: [{ line: 2, column: 3 }],
          extensions: { code: "INTERNAL" },
        },
      ]);
    }),
  );

  it.effect("resolves lazy headers for every request", () =>
    Effect.gen(function* () {
      let resolutions = 0;
      const received: Array<string | null> = [];
      const fetch: typeof globalThis.fetch = (_input, init) => {
        received.push(new Headers(init?.headers).get("authorization"));
        return Promise.resolve(response({ data: { _meta: { block: { number: 1 } } } }));
      };
      const config = createConfig({
        network: "mainnet",
        publicClient: makeMainnetPublicClient(),
        indexer: {
          fetch,
          retry: { attempts: 0 },
          headers: ({ network, protocol }) => {
            resolutions += 1;
            return { authorization: `${network}:${protocol}:${resolutions}` };
          },
        },
      });

      yield* request(config);
      yield* request(config);
      assert.deepStrictEqual(received, ["mainnet:v1:1", "mainnet:v1:2"]);
    }),
  );

  it.effect("retries transient HTTP failures and honors Retry-After", () =>
    Effect.gen(function* () {
      let calls = 0;
      const fetch: typeof globalThis.fetch = () => {
        calls += 1;
        return Promise.resolve(
          calls === 1
            ? response(
                { errors: [{ message: "busy" }] },
                {
                  status: 429,
                  headers: { "content-type": "application/json", "retry-after": "0" },
                },
              )
            : response({ data: { _meta: { block: { number: 2 } } } }),
        );
      };
      const result = yield* request(makeConfig(fetch, { attempts: 1 }));

      assert.strictEqual(calls, 2);
      assert.strictEqual(result.data?.["_meta"].block.number, 2);
    }),
  );

  it.effect("does not retry ordinary HTTP client errors", () =>
    Effect.gen(function* () {
      let calls = 0;
      const fetch: typeof globalThis.fetch = () => {
        calls += 1;
        return Promise.resolve(response({ errors: [{ message: "bad request" }] }, { status: 400 }));
      };
      const error = yield* request(makeConfig(fetch, { attempts: 2 })).pipe(Effect.flip);

      assert.instanceOf(error, IndexerRequestError);
      if (!(error instanceof IndexerRequestError)) return;
      assert.strictEqual(error.code, "HTTP_FAILED");
      assert.strictEqual(error.status, 400);
      assert.isFalse(error.retryable);
      assert.strictEqual(calls, 1);
      assert.notInclude(error.message, "api.thegraph.com");
    }),
  );

  it.effect("classifies malformed JSON separately from transport failures", () =>
    Effect.gen(function* () {
      const malformed: typeof globalThis.fetch = () => Promise.resolve(response("{"));
      const malformedError = yield* request(makeConfig(malformed)).pipe(Effect.flip);
      assert.instanceOf(malformedError, IndexerDecodeError);

      const offlineError = yield* request(makeConfig(offlineFetch)).pipe(Effect.flip);
      assert.instanceOf(offlineError, IndexerRequestError);
      if (!(offlineError instanceof IndexerRequestError)) return;
      assert.strictEqual(offlineError.code, "TRANSPORT_FAILED");
      assert.isTrue(offlineError.retryable);
    }),
  );

  it.effect("times out requests and aborts the active fetch", () =>
    Effect.gen(function* () {
      let resolveSignal: (signal: AbortSignal) => void;
      const signalReady = new Promise<AbortSignal>((resolve) => {
        resolveSignal = resolve;
      });
      const fetch: typeof globalThis.fetch = (_input, init) => {
        const signal = init?.signal as AbortSignal;
        resolveSignal(signal);
        return new Promise((_resolve, reject) =>
          signal.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError"))),
        );
      };
      const fiber = yield* Effect.forkChild(
        request(makeConfig(fetch, { timeout: 10 })).pipe(Effect.flip),
      );
      const signal = yield* Effect.promise(() => signalReady);

      yield* TestClock.adjust(10);
      const error = yield* Fiber.join(fiber);

      assert.instanceOf(error, IndexerRequestError);
      if (!(error instanceof IndexerRequestError)) return;
      assert.strictEqual(error.code, "REQUEST_TIMEOUT");
      assert.isTrue(signal.aborted);
    }),
  );

  it.effect("propagates Effect interruption to the active fetch", () =>
    Effect.gen(function* () {
      let resolveSignal: (signal: AbortSignal) => void;
      const signalReady = new Promise<AbortSignal>((resolve) => {
        resolveSignal = resolve;
      });
      const fetch: typeof globalThis.fetch = (_input, init) => {
        const signal = init?.signal as AbortSignal;
        resolveSignal(signal);
        return new Promise((_resolve, reject) =>
          signal?.addEventListener("abort", () =>
            reject(new DOMException("aborted", "AbortError")),
          ),
        );
      };
      const fiber = yield* Effect.forkChild(request(makeConfig(fetch, { timeout: 5_000 })));
      const signal = yield* Effect.promise(() => signalReady);

      yield* Fiber.interrupt(fiber);
      assert.isTrue(signal.aborted);
    }),
  );

  it.effect("fails with a typed error when a source is unavailable", () =>
    Effect.gen(function* () {
      const config = createConfig({
        network: "mainnet",
        publicClient: makeMainnetPublicClient(),
      });
      const error = yield* requestIndexer(config, {
        protocol: "v2",
        operationName: "Status",
        document: query,
      }).pipe(Effect.flip);

      assert.instanceOf(error, IndexerUnavailableError);
      assert.strictEqual(error.protocol, "v2");
    }),
  );
});
