import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { textResolverAbi } from "@ensforge/contracts/resolver-profiles";
import { decodeFunctionResult, encodeFunctionData } from "viem";
import { expect } from "vitest";

import {
  getOwner,
  namehash,
  readBatch,
  resolve,
  resolveBatch,
  resolveWithResolver,
} from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

const textCall = (name: string, key: string) =>
  encodeFunctionData({
    abi: textResolverAbi,
    functionName: "text",
    args: [namehash(name), key],
  });

const decodeText = (data: `0x${string}`) =>
  decodeFunctionResult({ abi: textResolverAbi, functionName: "text", data });

describe("low-level universal resolution integration", () => {
  it.effect("resolves arbitrary calldata through v1, migrated v2, and RESERVED routing", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const v1Fixture = devnet.fixtures.records.v1;
      const v2Fixture = devnet.fixtures.records.v2;
      const reservedFixture = devnet.fixtures.records.reserved;
      const [v1, migrated, reserved] = yield* Effect.all([
        resolve.effect(devnet.configs.v1, {
          name: v1Fixture.name,
          data: textCall(v1Fixture.name, "email"),
        }),
        resolve.effect(devnet.configs.v2, {
          name: v2Fixture.name,
          data: textCall(v2Fixture.name, "email"),
        }),
        resolve.effect(devnet.configs.v2, {
          name: reservedFixture.name,
          data: textCall(reservedFixture.name, "email"),
        }),
      ]);

      assert.isNotNull(v1);
      assert.isNotNull(migrated);
      assert.isNotNull(reserved);
      expect(decodeText(v1.data)).toBe(v1Fixture.texts.email);
      expect(decodeText(migrated.data)).toBe(v2Fixture.texts.email);
      expect(decodeText(reserved.data)).toBe(reservedFixture.texts.email);
      expect(v1.resolverAddress).toBe(v1Fixture.resolver);
      expect(migrated.resolverAddress).toBe(v2Fixture.resolver);
      expect(reserved.resolverAddress).toBe(devnet.deployments.v2.migration.ensV1Resolver);
    }),
  );

  it.effect("returns null when automatic resolver discovery finds no resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.v2.noResolver.name;
      const result = yield* resolve.effect(devnet.configs.v2, {
        name,
        data: textCall(name, "email"),
      });

      assert.isNull(result);
    }),
  );

  it.effect("resolves with an explicitly supplied resolver on both protocols", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const v1Fixture = devnet.fixtures.records.v1;
      const v2Fixture = devnet.fixtures.records.v2;
      const [v1, v2] = yield* Effect.all([
        resolveWithResolver.effect(devnet.configs.v1, {
          name: v1Fixture.name,
          resolverAddress: v1Fixture.resolver,
          data: textCall(v1Fixture.name, "email"),
        }),
        resolveWithResolver.effect(devnet.configs.v2, {
          name: v2Fixture.name,
          resolverAddress: v2Fixture.resolver,
          data: textCall(v2Fixture.name, "email"),
          gateways: [],
        }),
      ]);

      expect(v1.resolverAddress).toBe(v1Fixture.resolver);
      expect(v2.resolverAddress).toBe(v2Fixture.resolver);
      expect(decodeText(v1.data)).toBe(v1Fixture.texts.email);
      expect(decodeText(v2.data)).toBe(v2Fixture.texts.email);
    }),
  );

  it.effect("validates calldata and explicit resolver addresses before contract execution", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v2;
      const [invalidData, invalidResolver, zeroResolver] = yield* Effect.all([
        Effect.flip(resolve.effect(devnet.configs.v2, { name: fixture.name, data: "0x123" })),
        Effect.flip(
          resolveWithResolver.effect(devnet.configs.v2, {
            name: fixture.name,
            data: textCall(fixture.name, "email"),
            resolverAddress: "0x1234",
          }),
        ),
        Effect.flip(
          resolveWithResolver.effect(devnet.configs.v2, {
            name: fixture.name,
            data: textCall(fixture.name, "email"),
            resolverAddress: "0x0000000000000000000000000000000000000000",
          }),
        ),
      ]);

      expect(invalidData).toMatchObject({ _tag: "CodecError", code: "INVALID_HEX" });
      expect(invalidResolver).toMatchObject({ _tag: "CodecError", code: "INVALID_ADDRESS" });
      expect(zeroResolver).toMatchObject({ _tag: "CodecError", code: "INVALID_ADDRESS" });
    }),
  );

  it.effect("resolves mixed automatic and explicit calls concurrently in input order", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v2;
      const missingName = devnet.fixtures.v2.noResolver.name;
      const emailCall = textCall(fixture.name, "email");
      const results = yield* resolveBatch.effect(devnet.configs.v2, {
        calls: [
          { name: fixture.name, data: emailCall },
          {
            name: fixture.name,
            data: textCall(fixture.name, "description"),
            resolverAddress: fixture.resolver,
          },
          { name: missingName, data: textCall(missingName, "email") },
          { name: fixture.name, data: emailCall },
        ],
      });

      const [email, description, missing, duplicate] = results;
      assert.isDefined(email);
      assert.isDefined(description);
      assert.isDefined(missing);
      assert.isDefined(duplicate);
      assert.isNotNull(email);
      assert.isNotNull(description);
      assert.isNull(missing);
      assert.isNotNull(duplicate);
      expect(decodeText(email.data)).toBe(fixture.texts.email);
      expect(decodeText(description.data)).toBe(fixture.texts.description);
      expect(description.resolverAddress).toBe(fixture.resolver);
      expect(duplicate).toEqual(email);
    }),
  );

  it.effect("handles empty batches and composes as a semantic read request", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v2;
      const empty = yield* resolveBatch.effect(devnet.configs.v2, { calls: [] });
      const result = yield* readBatch.effect(devnet.configs.v2, {
        resolutions: resolveBatch.request({
          calls: [{ name: fixture.name, data: textCall(fixture.name, "email") }],
        }),
        owner: getOwner.request({ name: fixture.name }),
      });

      expect(empty).toEqual([]);
      const resolution = result.resolutions[0];
      assert.isDefined(resolution);
      assert.isNotNull(resolution);
      expect(decodeText(resolution.data)).toBe(fixture.texts.email);
      assert.isNotNull(result.owner);
    }),
  );
});
