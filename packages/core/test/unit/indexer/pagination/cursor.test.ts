import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  decodeIndexerCursor,
  encodeIndexerCursor,
  fingerprintIndexerValue,
} from "../../../../src/internal/indexer/pagination/cursor.js";
import {
  combineV1NameWhere,
  compileV1NamePosition,
  decodeV1NamePosition,
} from "../../../../src/internal/indexer/pagination/v1-keyset.js";

const binding = {
  action: "getNames",
  network: "sepolia",
  filter: { migrated: false },
  order: { field: "createdAt", direction: "desc" },
  sources: {
    v1: { state: "enabled", endpoint: "https://v1.example/graphql" },
    v2: { state: "enabled", endpoint: "https://v2.example/graphql" },
  },
} as const;

const positions = {
  v1: { position: "1700000000:namehash", exhausted: false },
  v2: { position: "opaque-v2-cursor", exhausted: false },
} as const;

describe("indexer cursors", () => {
  it.effect("round-trips independent source positions", () =>
    Effect.gen(function* () {
      const cursor = yield* encodeIndexerCursor(binding, positions);
      const decoded = yield* decodeIndexerCursor(cursor, binding);

      assert.match(cursor, /^v1\./u);
      assert.deepStrictEqual(decoded.sources, positions);
    }),
  );

  it.effect("rejects reuse with another query", () =>
    Effect.gen(function* () {
      const cursor = yield* encodeIndexerCursor(binding, positions);
      const error = yield* decodeIndexerCursor(cursor, {
        ...binding,
        filter: { migrated: true },
      }).pipe(Effect.flip);

      assert.strictEqual(error.code, "CURSOR_MISMATCH");
    }),
  );

  it.effect("rejects corrupted cursor data", () =>
    Effect.gen(function* () {
      const error = yield* decodeIndexerCursor("v1.not-valid-base64", binding).pipe(Effect.flip);
      assert.strictEqual(error.code, "INVALID_CURSOR");
    }),
  );

  it("fingerprints object keys deterministically", () => {
    assert.strictEqual(
      fingerprintIndexerValue({ b: 2n, a: 1 }),
      fingerprintIndexerValue({ a: 1, b: 2n }),
    );
  });

  it.effect("compiles equal-value V1 keyset progress with an identity tie-breaker", () =>
    Effect.gen(function* () {
      const order = { field: "createdAt", direction: "desc" } as const;
      const position = yield* decodeV1NamePosition(
        JSON.stringify({
          field: "createdAt",
          value: "1700000000",
          namehash: `0x${"a".repeat(64)}`,
        }),
        order,
      );
      const where = combineV1NameWhere(
        { isMigrated: false },
        compileV1NamePosition(position, order),
      );

      assert.deepStrictEqual(where, {
        and: [
          { isMigrated: false },
          {
            or: [
              { createdAt_lt: "1700000000" },
              { createdAt: "1700000000", id_lt: `0x${"a".repeat(64)}` },
              { createdAt: null },
            ],
          },
        ],
      });
    }),
  );
});
