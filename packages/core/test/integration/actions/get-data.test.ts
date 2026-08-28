import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { expect } from "vitest";

import { getData, getInterface, getPubkey, readBatch } from "../../../src/index.js";
import { getIntegrationDevnet } from "../setup/devnet.js";

describe("data resolution integration", () => {
  it.effect("resolves arbitrary data through the v1 Universal Resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v1;
      const result = yield* getData.effect(devnet.configs.v1, {
        name: fixture.name,
        key: fixture.data.key,
      });

      expect(result).toEqual({ key: fixture.data.key, value: fixture.data.value });
    }),
  );

  it.effect("resolves migrated v2 and RESERVED v1 data through the v2 resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const migratedFixture = devnet.fixtures.records.v2;
      const reservedFixture = devnet.fixtures.records.reserved;
      const [migrated, reserved] = yield* Effect.all([
        getData.effect(devnet.configs.v2, {
          name: migratedFixture.name,
          key: migratedFixture.data.key,
        }),
        getData.effect(devnet.configs.v2, {
          name: reservedFixture.name,
          key: reservedFixture.data.key,
        }),
      ]);

      expect(migrated.value).toBe(migratedFixture.data.value);
      expect(reserved.value).toBe(reservedFixture.data.value);
    }),
  );

  it.effect("returns null when the requested data key is unset", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* getData.effect(devnet.configs.v2, {
        name: devnet.fixtures.records.v2.name,
        key: "com.ensforge.missing",
      });

      expect(result).toEqual({ key: "com.ensforge.missing", value: null });
    }),
  );

  it.effect("returns null when the name has no resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* getData.effect(devnet.configs.v2, {
        name: devnet.fixtures.v2.noResolver.name,
        key: "com.ensforge.fixture",
      });

      expect(result).toEqual({ key: "com.ensforge.fixture", value: null });
    }),
  );

  it.effect("keeps Promise and Effect APIs equivalent", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v2;
      const parameters = { name: fixture.name, key: fixture.data.key };
      const promiseResult = yield* Effect.promise(() => getData(devnet.configs.v2, parameters));
      const effectResult = yield* getData.effect(devnet.configs.v2, parameters);

      expect(effectResult).toEqual(promiseResult);
    }),
  );

  it.effect("supports all three profile actions inside semantic read batches", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v2;
      const result = yield* readBatch.effect(devnet.configs.v2, {
        data: getData.request({ name: fixture.name, key: fixture.data.key }),
        interface: getInterface.request({
          name: fixture.name,
          interfaceId: fixture.interface.id,
        }),
        pubkey: getPubkey.request({ name: fixture.name }),
      });

      expect(result.data.value).toBe(fixture.data.value);
      expect(result.interface.implementer).toBe(fixture.interface.implementer);
      assert.isNotNull(result.pubkey);
      expect(result.pubkey).toEqual(fixture.pubkey);
    }),
  );
});
