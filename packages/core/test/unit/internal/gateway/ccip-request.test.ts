import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { defaultGatewayOptions, GatewayError } from "../../../../src/index.js";
import { makeCcipRequest } from "../../../../src/internal/gateway/ccip-request.js";

const parameters = {
  data: "0x1234" as const,
  sender: "0x0000000000000000000000000000000000000001" as const,
  urls: ["https://gateway.example/{sender}/{data}"],
};

describe("CCIP gateway requester", () => {
  it.effect("returns bounded hexadecimal gateway data", () =>
    Effect.gen(function* () {
      const request = makeCcipRequest(
        { ...defaultGatewayOptions, allowedHosts: ["gateway.example"] },
        async () =>
          new Response(JSON.stringify({ data: "0xabcd" }), {
            headers: { "content-type": "application/json" },
          }),
      );

      const result = yield* Effect.promise(() => request(parameters));
      assert.strictEqual(result, "0xabcd");
    }),
  );

  it.effect("rejects oversized gateway responses", () =>
    Effect.gen(function* () {
      const request = makeCcipRequest(
        { ...defaultGatewayOptions, maxResponseSize: 4 },
        async () => new Response("0x1234"),
      );
      const error = yield* Effect.tryPromise({
        try: () => request(parameters),
        catch: (cause) => cause,
      }).pipe(Effect.flip);

      assert.instanceOf(error, GatewayError);
      assert.strictEqual(error.code, "GATEWAY_NOT_ALLOWED");
    }),
  );

  it.effect("validates redirect destinations and redirect count", () =>
    Effect.gen(function* () {
      const request = makeCcipRequest(
        {
          ...defaultGatewayOptions,
          allowedHosts: ["gateway.example"],
          maxRedirects: 0,
        },
        async () =>
          new Response(null, {
            status: 302,
            headers: { location: "https://other.example/result" },
          }),
      );
      const error = yield* Effect.tryPromise({
        try: () => request(parameters),
        catch: (cause) => cause,
      }).pipe(Effect.flip);

      assert.instanceOf(error, GatewayError);
      assert.strictEqual(error.code, "GATEWAY_NOT_ALLOWED");
    }),
  );
});
