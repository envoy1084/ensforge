import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import type { PublicClient } from "viem";

import { resolveAvatarRecord } from "../../../src/actions/records/get-avatar/resolve.js";
import { defaultGatewayOptions, GatewayError } from "../../../src/index.js";
import { validateGatewayUrl } from "../../../src/internal/gateway/validate-url.js";

describe("avatar gateway policy", () => {
  it.effect("returns an explicit result for an NFT on another chain", () =>
    Effect.gen(function* () {
      const result = yield* resolveAvatarRecord(
        {} as PublicClient,
        "alice.eth",
        "eip155:1/erc721:0x0000000000000000000000000000000000000001/1",
        11_155_111,
        defaultGatewayOptions,
      );

      assert.deepStrictEqual(result, {
        status: "unsupported-chain",
        record: "eip155:1/erc721:0x0000000000000000000000000000000000000001/1",
        chainId: 1,
      });
    }),
  );

  it.effect("rejects denied and non-allowlisted gateway hosts", () =>
    Effect.gen(function* () {
      const denied = yield* validateGatewayUrl("https://blocked.example/ipfs/value", {
        ...defaultGatewayOptions,
        allowedHosts: null,
        deniedHosts: ["blocked.example"],
      }).pipe(Effect.flip);
      const unlisted = yield* validateGatewayUrl("https://other.example/value", {
        ...defaultGatewayOptions,
        allowedHosts: ["gateway.example"],
        deniedHosts: [],
      }).pipe(Effect.flip);

      assert.instanceOf(denied, GatewayError);
      assert.strictEqual(denied.code, "GATEWAY_NOT_ALLOWED");
      assert.instanceOf(unlisted, GatewayError);
      assert.strictEqual(unlisted.code, "GATEWAY_NOT_ALLOWED");
    }),
  );
});
