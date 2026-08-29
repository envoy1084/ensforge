import { describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { expect } from "vitest";

import {
  decodeAddressRecord,
  getOwner,
  getPrimaryName,
  readBatch,
  toCoinType,
} from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

describe("primary name resolution integration", () => {
  it.effect("returns a forward-verified v1 primary name", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.reverse.verifiedV1;
      const result = yield* getPrimaryName.effect(devnet.configs.v1, {
        address: fixture.address,
      });

      expect(result).toEqual({ name: fixture.name, match: true });
    }),
  );

  it.effect("returns a forward-verified v2 primary name", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.reverse.verifiedV2;
      const result = yield* getPrimaryName.effect(devnet.configs.v2, {
        address: fixture.address,
      });

      expect(result).toEqual({ name: fixture.name, match: true });
    }),
  );

  it.effect("resolves default EVM primary names through either ENS profile", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const v1Fixture = devnet.fixtures.reverse.verifiedDefaultV1;
      const v2Fixture = devnet.fixtures.reverse.verifiedDefaultV2;
      const [v1, v2] = yield* Effect.all(
        [
          getPrimaryName.effect(devnet.configs.v1, {
            address: v1Fixture.address,
            coinType: v1Fixture.coinType,
          }),
          getPrimaryName.effect(devnet.configs.v2, {
            address: v2Fixture.address,
            coinType: v2Fixture.coinType,
          }),
        ] as const,
        { concurrency: "unbounded" },
      );

      expect(v1).toEqual({ name: v1Fixture.name, match: true });
      expect(v2).toEqual({ name: v2Fixture.name, match: true });
    }),
  );

  it.effect("uses the default primary name for a chain-specific EVM coin type", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.reverse.verifiedDefaultV2;
      const result = yield* getPrimaryName.effect(devnet.configs.v2, {
        address: fixture.address,
        coinType: toCoinType(8453),
      });

      expect(result).toEqual({ name: fixture.name, match: true });
    }),
  );

  it.effect("accepts non-EVM address encodings when no reverse record exists", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const bitcoin = devnet.fixtures.records.v1.addresses.bitcoin;
      const address = decodeAddressRecord({ coinType: bitcoin.coinType, data: bitcoin.value });
      if (address === null) return yield* Effect.die(new Error("The Bitcoin fixture is empty"));

      const result = yield* getPrimaryName.effect(devnet.configs.v1, {
        address,
        coinType: bitcoin.coinType,
      });

      expect(result).toBeNull();
    }),
  );

  it.effect("returns an automatically named and forward-verified contract", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.reverse.verifiedContract;
      const result = yield* getPrimaryName.effect(devnet.configs.v2, {
        address: fixture.address,
      });

      expect(result).toEqual({ name: fixture.name, match: true });
    }),
  );

  it.effect("rejects unverified and missing reverse records", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixtures = [devnet.fixtures.reverse.unverified, devnet.fixtures.reverse.missing];
      const results = yield* Effect.all(
        fixtures.map((fixture) =>
          getPrimaryName.effect(devnet.configs.v2, { address: fixture.address }),
        ),
        { concurrency: "unbounded" },
      );

      expect(results).toEqual([null, null]);
    }),
  );

  it.effect("rejects malformed Ethereum addresses", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const error = yield* Effect.flip(
        getPrimaryName.effect(devnet.configs.v2, { address: "0x1234" }),
      );

      expect(error).toMatchObject({ _tag: "CodecError", code: "INVALID_ADDRESS" });
    }),
  );

  it.effect("rejects malformed coin types and multicoin addresses", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [coinTypeError, addressError] = yield* Effect.all(
        [
          Effect.flip(
            getPrimaryName.effect(devnet.configs.v2, {
              address: devnet.accounts.owner,
              coinType: -1n,
            }),
          ),
          Effect.flip(
            getPrimaryName.effect(devnet.configs.v2, {
              address: "not-a-bitcoin-address",
              coinType: 0n,
            }),
          ),
        ] as const,
        { concurrency: "unbounded" },
      );

      expect(coinTypeError).toMatchObject({ _tag: "CodecError", code: "INVALID_COIN_TYPE" });
      expect(addressError).toMatchObject({
        _tag: "CodecError",
        code: "INVALID_ADDRESS_RECORD",
      });
    }),
  );

  it.effect("supports verified primary names inside semantic read batches", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.reverse.verifiedDefaultV2;
      if (fixture.name === undefined) {
        return yield* Effect.die(new Error("The verified reverse fixture has no name"));
      }
      const name = fixture.name;
      const result = yield* readBatch.effect(devnet.configs.v2, {
        owner: getOwner.request({ name }),
        primaryName: getPrimaryName.request({
          address: fixture.address,
          coinType: toCoinType(8453),
        }),
      });

      expect(result.primaryName).toEqual({
        name,
        match: true,
      });
      expect(result.owner).not.toBeNull();
    }),
  );
});
