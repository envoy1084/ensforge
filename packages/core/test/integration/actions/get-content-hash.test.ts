import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { expect } from "vitest";

import { decodeContentHash, getContentHash, getOwner, readBatch } from "../../../src/index.js";
import { getIntegrationDevnet } from "../setup/devnet.js";

const expectedContentHash = (raw: `0x${string}`) => {
  const decoded = decodeContentHash(raw);
  assert.isNotNull(decoded);
  return { protocol: decoded.protocol, value: decoded.value, raw };
};

describe("content hash resolution integration", () => {
  it.effect("resolves a content hash through the v1 Universal Resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v1;
      const result = yield* getContentHash.effect(devnet.configs.v1, { name: fixture.name });

      expect(result).toEqual(expectedContentHash(fixture.contenthash));
    }),
  );

  it.effect("resolves migrated v2 and RESERVED v1 content hashes through the v2 resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [migrated, reserved] = yield* Effect.all([
        getContentHash.effect(devnet.configs.v2, {
          name: devnet.fixtures.records.v2.name,
        }),
        getContentHash.effect(devnet.configs.v2, {
          name: devnet.fixtures.records.reserved.name,
        }),
      ]);

      expect(migrated).toEqual(expectedContentHash(devnet.fixtures.records.v2.contenthash));
      expect(reserved).toEqual(expectedContentHash(devnet.fixtures.records.reserved.contenthash));
    }),
  );

  it.effect("returns an unset result when the resolver has no content hash record", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* getContentHash.effect(devnet.configs.v2, {
        name: devnet.fixtures.v2.active.name,
      });

      expect(result).toEqual({ protocol: null, value: null, raw: null });
    }),
  );

  it.effect("returns an unset result when the name has no resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* getContentHash.effect(devnet.configs.v2, {
        name: devnet.fixtures.v2.noResolver.name,
      });

      expect(result).toEqual({ protocol: null, value: null, raw: null });
    }),
  );

  it.effect("keeps Promise and Effect APIs equivalent", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const parameters = { name: devnet.fixtures.records.v2.name };
      const promiseResult = yield* Effect.promise(() =>
        getContentHash(devnet.configs.v2, parameters),
      );
      const effectResult = yield* getContentHash.effect(devnet.configs.v2, parameters);

      expect(effectResult).toEqual(promiseResult);
    }),
  );

  it.effect("supports content hash resolution inside semantic read batches", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v2;
      const result = yield* readBatch.effect(devnet.configs.v2, {
        contentHash: getContentHash.request({ name: fixture.name }),
        owner: getOwner.request({ name: fixture.name }),
      });

      expect(result.contentHash).toEqual(expectedContentHash(fixture.contenthash));
      assert.isNotNull(result.owner);
    }),
  );
});
