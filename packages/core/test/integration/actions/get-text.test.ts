import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { expect } from "vitest";

import { getOwner, getText, getTexts, readBatch } from "../../../src/index.js";
import { getIntegrationDevnet } from "../setup/devnet.js";

describe("text resolution integration", () => {
  it.effect("resolves text records through the v1 Universal Resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v1;
      const result = yield* getText.effect(devnet.configs.v1, {
        name: fixture.name,
        key: "email",
      });

      expect(result).toEqual({ key: "email", value: fixture.texts.email });
    }),
  );

  it.effect("resolves migrated v2 and RESERVED v1 text records through the v2 resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [migrated, reserved] = yield* Effect.all([
        getText.effect(devnet.configs.v2, {
          name: devnet.fixtures.records.v2.name,
          key: "description",
        }),
        getText.effect(devnet.configs.v2, {
          name: devnet.fixtures.records.reserved.name,
          key: "description",
        }),
      ]);

      expect(migrated).toEqual({
        key: "description",
        value: devnet.fixtures.records.v2.texts.description,
      });
      expect(reserved).toEqual({
        key: "description",
        value: devnet.fixtures.records.reserved.texts.description,
      });
    }),
  );

  it.effect(
    "resolves several text records with resolver-native multicall and preserves order",
    () =>
      Effect.gen(function* () {
        const devnet = getIntegrationDevnet();
        const fixture = devnet.fixtures.records.v2;
        const results = yield* getTexts.effect(devnet.configs.v2, {
          name: fixture.name,
          keys: ["email", "missing", "avatar", "email"],
        });

        expect(results).toEqual([
          { key: "email", value: fixture.texts.email },
          { key: "missing", value: null },
          { key: "avatar", value: fixture.texts.avatar },
          { key: "email", value: fixture.texts.email },
        ]);
      }),
  );

  it.effect("returns structured unset records for names without a resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const single = yield* getText.effect(devnet.configs.v2, {
        name: devnet.fixtures.v2.noResolver.name,
        key: "email",
      });
      const multiple = yield* getTexts.effect(devnet.configs.v2, {
        name: devnet.fixtures.v2.noResolver.name,
        keys: ["email", "url"],
      });

      expect(single).toEqual({ key: "email", value: null });
      expect(multiple).toEqual([
        { key: "email", value: null },
        { key: "url", value: null },
      ]);
    }),
  );

  it.effect("keeps Promise and Effect APIs equivalent", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const parameters = {
        name: devnet.fixtures.records.v2.name,
        keys: ["email", "url"],
      } as const;
      const promiseResult = yield* Effect.promise(() => getTexts(devnet.configs.v2, parameters));
      const effectResult = yield* getTexts.effect(devnet.configs.v2, parameters);

      expect(effectResult).toEqual(promiseResult);
    }),
  );

  it.effect("supports text actions inside semantic read batches", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v2;
      const result = yield* readBatch.effect(devnet.configs.v2, {
        text: getText.request({ name: fixture.name, key: "email" }),
        texts: getTexts.request({ name: fixture.name, keys: ["avatar", "url"] }),
        owner: getOwner.request({ name: fixture.name }),
      });

      expect(result.text).toEqual({ key: "email", value: fixture.texts.email });
      expect(result.texts).toEqual([
        { key: "avatar", value: fixture.texts.avatar },
        { key: "url", value: fixture.texts.url },
      ]);
      assert.isNotNull(result.owner);
    }),
  );

  it.effect("returns an empty result when no text keys are requested", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* getTexts.effect(devnet.configs.v2, {
        name: devnet.fixtures.records.v2.name,
        keys: [],
      });

      expect(result).toEqual([]);
    }),
  );
});
