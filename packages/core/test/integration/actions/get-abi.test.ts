import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { expect } from "vitest";

import { getAbi, getOwner, readBatch } from "../../../src/index.js";
import { getIntegrationDevnet } from "../setup/devnet.js";

describe("ABI resolution integration", () => {
  it.effect("resolves the preferred ABI through the v1 Universal Resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v1;
      const result = yield* getAbi.effect(devnet.configs.v1, { name: fixture.name });

      expect(result).toEqual({
        contentType: "json",
        value: fixture.abi.value,
        raw: fixture.abi.json.raw,
      });
    }),
  );

  it.effect("resolves migrated v2 and RESERVED v1 ABIs through the v2 resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [migrated, reserved] = yield* Effect.all([
        getAbi.effect(devnet.configs.v2, { name: devnet.fixtures.records.v2.name }),
        getAbi.effect(devnet.configs.v2, { name: devnet.fixtures.records.reserved.name }),
      ]);

      expect(migrated.value).toEqual(devnet.fixtures.records.v2.abi.value);
      expect(reserved.value).toEqual(devnet.fixtures.records.reserved.abi.value);
    }),
  );

  it.effect("decodes every supported inline ABI content type", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v2;
      const [json, zlibJson, cbor] = yield* Effect.all([
        getAbi.effect(devnet.configs.v2, { name: fixture.name, contentTypes: ["json"] }),
        getAbi.effect(devnet.configs.v2, { name: fixture.name, contentTypes: ["zlib-json"] }),
        getAbi.effect(devnet.configs.v2, { name: fixture.name, contentTypes: ["cbor"] }),
      ]);

      expect(json).toEqual({
        contentType: "json",
        value: fixture.abi.value,
        raw: fixture.abi.json.raw,
      });
      expect(zlibJson).toEqual({
        contentType: "zlib-json",
        value: fixture.abi.value,
        raw: fixture.abi.zlibJson.raw,
      });
      expect(cbor).toEqual({
        contentType: "cbor",
        value: fixture.abi.value,
        raw: fixture.abi.cbor.raw,
      });
    }),
  );

  it.effect("returns URI ABI records without fetching them", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v2;
      const result = yield* getAbi.effect(devnet.configs.v2, {
        name: fixture.name,
        contentTypes: ["uri"],
      });

      expect(result).toEqual({
        contentType: "uri",
        value: fixture.abi.uri.value,
        raw: fixture.abi.uri.raw,
      });
    }),
  );

  it.effect("returns an unset result when no accepted ABI is available", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* getAbi.effect(devnet.configs.v2, {
        name: devnet.fixtures.v2.active.name,
        contentTypes: ["json"],
      });

      expect(result).toEqual({ contentType: null, value: null, raw: null });
    }),
  );

  it.effect(
    "returns an unset result when the name has no resolver or no formats are accepted",
    () =>
      Effect.gen(function* () {
        const devnet = getIntegrationDevnet();
        const [noResolver, noFormats] = yield* Effect.all([
          getAbi.effect(devnet.configs.v2, { name: devnet.fixtures.v2.noResolver.name }),
          getAbi.effect(devnet.configs.v2, {
            name: devnet.fixtures.records.v2.name,
            contentTypes: [],
          }),
        ]);

        expect(noResolver).toEqual({ contentType: null, value: null, raw: null });
        expect(noFormats).toEqual({ contentType: null, value: null, raw: null });
      }),
  );

  it.effect("supports ABI resolution inside semantic read batches", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v2;
      const result = yield* readBatch.effect(devnet.configs.v2, {
        abi: getAbi.request({ name: fixture.name }),
        owner: getOwner.request({ name: fixture.name }),
      });

      expect(result.abi.value).toEqual(fixture.abi.value);
      assert.isNotNull(result.owner);
    }),
  );
});
