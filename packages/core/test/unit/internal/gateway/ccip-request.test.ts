import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import type { CcipRequestParameters, PublicClient } from "viem";

import { defaultGatewayOptions, GatewayError } from "../../../../src/index.js";
import {
  makeCcipRequest,
  withGatewayPolicy,
} from "../../../../src/internal/gateway/ccip-request.js";
import { startCcipGateway } from "../../../fixtures/ccip-gateway.js";

const sender = "0x0000000000000000000000000000000000000001" as const;
const data = "0x1234" as const;
const parameters = (urls: ReadonlyArray<string>): CcipRequestParameters => ({ data, sender, urls });
const withGateway = <Success, Failure>(
  use: (gateway: Awaited<ReturnType<typeof startCcipGateway>>) => Effect.Effect<Success, Failure>,
) =>
  Effect.scoped(
    Effect.acquireRelease(Effect.promise(startCcipGateway), (gateway) =>
      Effect.promise(gateway.close),
    ).pipe(Effect.flatMap(use)),
  );
const failure = <Success>(effect: Effect.Effect<Success>) =>
  Effect.tryPromise({
    try: () => Effect.runPromise(effect),
    catch: (cause) => cause,
  }).pipe(Effect.flip);

describe("CCIP gateway requester", () => {
  it.effect("executes GET templates with normalized substitutions", () =>
    withGateway((gateway) =>
      Effect.gen(function* () {
        const request = makeCcipRequest({
          ...defaultGatewayOptions,
          allowedHosts: ["127.0.0.1"],
        });
        const result = yield* Effect.promise(() =>
          request(parameters([`${gateway.url}/get/{sender}/{data}`])),
        );

        assert.strictEqual(result, "0xabcd");
        assert.deepStrictEqual(gateway.requests, [
          { body: "", method: "GET", path: `/get/${sender}/${data}` },
        ]);
      }),
    ),
  );

  it.effect("executes POST templates with the EIP-3668 payload", () =>
    withGateway((gateway) =>
      Effect.gen(function* () {
        const request = makeCcipRequest(defaultGatewayOptions);
        const result = yield* Effect.promise(() => request(parameters([`${gateway.url}/post`])));

        assert.strictEqual(result, "0xcafe");
        const post = gateway.requests[0];
        assert.isDefined(post);
        assert.deepStrictEqual(JSON.parse(post.body), { data, sender });
        assert.strictEqual(post.method, "POST");
      }),
    ),
  );

  it.effect("tries ordered fallback gateways after an HTTP failure", () =>
    withGateway((gateway) =>
      Effect.gen(function* () {
        const request = makeCcipRequest(defaultGatewayOptions);
        const result = yield* Effect.promise(() =>
          request(parameters([`${gateway.url}/error/{data}`, `${gateway.url}/result/{data}`])),
        );

        assert.strictEqual(result, "0xbeef");
        assert.deepStrictEqual(
          gateway.requests.map(({ path }) => path),
          ["/error/0x1234", "/result/0x1234"],
        );
      }),
    ),
  );

  it.effect("follows allowed redirects and rejects redirect loops", () =>
    withGateway((gateway) =>
      Effect.gen(function* () {
        const request = makeCcipRequest({ ...defaultGatewayOptions, maxRedirects: 1 });
        const result = yield* Effect.promise(() =>
          request(parameters([`${gateway.url}/redirect`])),
        );
        assert.strictEqual(result, "0xbeef");

        const error = yield* failure(
          Effect.promise(() => request(parameters([`${gateway.url}/loop`]))),
        );
        assert.instanceOf(error, GatewayError);
        assert.strictEqual(error.code, "GATEWAY_NOT_ALLOWED");
      }),
    ),
  );

  it.effect("rejects denied hosts before making a request", () =>
    withGateway((gateway) =>
      Effect.gen(function* () {
        const request = makeCcipRequest({
          ...defaultGatewayOptions,
          deniedHosts: ["127.0.0.1"],
        });
        const error = yield* failure(
          Effect.promise(() => request(parameters([`${gateway.url}/result`]))),
        );

        assert.instanceOf(error, GatewayError);
        assert.strictEqual(error.code, "GATEWAY_NOT_ALLOWED");
        assert.lengthOf(gateway.requests, 0);
      }),
    ),
  );

  it.effect("validates every redirect destination before following it", () =>
    withGateway((gateway) =>
      Effect.gen(function* () {
        const request = makeCcipRequest({
          ...defaultGatewayOptions,
          allowedHosts: ["127.0.0.1"],
        });
        const error = yield* failure(
          Effect.promise(() => request(parameters([`${gateway.url}/redirect-denied`]))),
        );

        assert.instanceOf(error, GatewayError);
        assert.strictEqual(error.code, "GATEWAY_NOT_ALLOWED");
        assert.deepStrictEqual(
          gateway.requests.map(({ path }) => path),
          ["/redirect-denied"],
        );
      }),
    ),
  );

  it.effect("reports typed timeouts", () =>
    withGateway((gateway) =>
      Effect.gen(function* () {
        const request = makeCcipRequest({ ...defaultGatewayOptions, timeout: 10 });
        const error = yield* failure(
          Effect.promise(() => request(parameters([`${gateway.url}/slow`]))),
        );

        assert.instanceOf(error, GatewayError);
        assert.strictEqual(error.code, "GATEWAY_TIMEOUT");
      }),
    ),
  );

  it.effect("preserves caller cancellation", () =>
    withGateway((gateway) =>
      Effect.gen(function* () {
        const controller = new AbortController();
        const request = makeCcipRequest(defaultGatewayOptions);
        const pending = request({
          ...parameters([`${gateway.url}/slow`]),
          requestOptions: { signal: controller.signal },
        });
        controller.abort(new Error("cancelled"));

        const error = yield* failure(Effect.promise(() => pending));
        assert.notInstanceOf(error, GatewayError);
      }),
    ),
  );

  it.effect("rejects oversized and malformed responses", () =>
    withGateway((gateway) =>
      Effect.gen(function* () {
        const bounded = makeCcipRequest({ ...defaultGatewayOptions, maxResponseSize: 32 });
        const oversized = yield* failure(
          Effect.promise(() => bounded(parameters([`${gateway.url}/oversized`]))),
        );
        assert.instanceOf(oversized, GatewayError);
        assert.strictEqual(oversized.code, "GATEWAY_NOT_ALLOWED");

        const request = makeCcipRequest(defaultGatewayOptions);
        const malformed = yield* failure(
          Effect.promise(() => request(parameters([`${gateway.url}/malformed`]))),
        );
        assert.match(String(malformed), /malformed CCIP data/);

        const invalidJson = yield* failure(
          Effect.promise(() => request(parameters([`${gateway.url}/invalid-json`]))),
        );
        assert.instanceOf(invalidJson, SyntaxError);
      }),
    ),
  );

  it("preserves disabled and custom CCIP requesters", () => {
    const customRequest = async () => data;
    const disabled = { ccipRead: false } as PublicClient;
    const custom = { ccipRead: { request: customRequest } } as unknown as PublicClient;

    assert.strictEqual(withGatewayPolicy(disabled, defaultGatewayOptions), disabled);
    assert.strictEqual(withGatewayPolicy(custom, defaultGatewayOptions), custom);
  });
});
