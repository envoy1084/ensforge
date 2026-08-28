import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { expect } from "vitest";

import { getAvatar, getOwner, readBatch } from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

describe("avatar resolution integration", () => {
  it.effect("resolves inline avatar records through the v1 Universal Resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v1;
      const result = yield* getAvatar.effect(devnet.configs.v1, { name: fixture.name });

      expect(result).toEqual({
        record: fixture.texts.avatar,
        uri: fixture.texts.avatar,
      });
    }),
  );

  it.effect("resolves migrated v2 and RESERVED v1 avatar records through the v2 resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [migrated, reserved] = yield* Effect.all([
        getAvatar.effect(devnet.configs.v2, {
          name: devnet.fixtures.records.v2.name,
        }),
        getAvatar.effect(devnet.configs.v2, {
          name: devnet.fixtures.records.reserved.name,
        }),
      ]);

      expect(migrated).toEqual({
        record: devnet.fixtures.records.v2.texts.avatar,
        uri: devnet.fixtures.records.v2.texts.avatar,
      });
      expect(reserved).toEqual({
        record: devnet.fixtures.records.reserved.texts.avatar,
        uri: devnet.fixtures.records.reserved.texts.avatar,
      });
    }),
  );

  it.effect("returns null when the avatar text record is unset", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* getAvatar.effect(devnet.configs.v2, {
        name: devnet.fixtures.v2.active.name,
      });

      assert.isNull(result);
    }),
  );

  it.effect("supports avatar resolution inside semantic read batches", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v2;
      const result = yield* readBatch.effect(devnet.configs.v2, {
        avatar: getAvatar.request({ name: fixture.name }),
        owner: getOwner.request({ name: fixture.name }),
      });

      expect(result.avatar).toEqual({
        record: fixture.texts.avatar,
        uri: fixture.texts.avatar,
      });
      assert.isNotNull(result.owner);
    }),
  );
});
