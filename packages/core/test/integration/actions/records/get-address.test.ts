import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { expect } from "vitest";

import {
  decodeAddressRecord,
  getAddress,
  getAddresses,
  getOwner,
  readBatch,
} from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

describe("address resolution integration", () => {
  it.effect("resolves ETH and multicoin records through the v1 Universal Resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v1;
      const [eth, bitcoin] = yield* Effect.all([
        getAddress.effect(devnet.configs.v1, { name: fixture.name }),
        getAddress.effect(devnet.configs.v1, {
          name: fixture.name,
          coinType: fixture.addresses.bitcoin.coinType,
        }),
      ]);

      expect(eth).toEqual({
        coinType: 60n,
        address: fixture.addresses.eth,
        raw: fixture.addresses.eth,
      });
      expect(bitcoin).toEqual({
        coinType: fixture.addresses.bitcoin.coinType,
        address: decodeAddressRecord({
          coinType: fixture.addresses.bitcoin.coinType,
          data: fixture.addresses.bitcoin.value,
        }),
        raw: fixture.addresses.bitcoin.value,
      });
    }),
  );

  it.effect("resolves migrated v2 and RESERVED v1 records through the v2 Universal Resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [migrated, reservedV1, reserved] = yield* Effect.all([
        getAddress.effect(devnet.configs.v2, { name: devnet.fixtures.records.v2.name }),
        getAddress.effect(devnet.configs.v1, { name: devnet.fixtures.records.reserved.name }),
        getAddress.effect(devnet.configs.v2, { name: devnet.fixtures.records.reserved.name }),
      ]);

      expect(migrated).toEqual({
        coinType: 60n,
        address: devnet.fixtures.records.v2.addresses.eth,
        raw: devnet.fixtures.records.v2.addresses.eth,
      });
      expect(reservedV1).toEqual({
        coinType: 60n,
        address: devnet.fixtures.records.reserved.addresses.eth,
        raw: devnet.fixtures.records.reserved.addresses.eth,
      });
      expect(reserved).toEqual({
        coinType: 60n,
        address: devnet.fixtures.records.reserved.addresses.eth,
        raw: devnet.fixtures.records.reserved.addresses.eth,
      });
    }),
  );

  it.effect("resolves several records with resolver-native multicall and preserves order", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v2;
      const results = yield* getAddresses.effect(devnet.configs.v2, {
        name: fixture.name,
        coinTypes: [60n, fixture.addresses.bitcoin.coinType, 2n, 60n],
      });

      expect(results).toEqual([
        { coinType: 60n, address: fixture.addresses.eth, raw: fixture.addresses.eth },
        {
          coinType: fixture.addresses.bitcoin.coinType,
          address: decodeAddressRecord({
            coinType: fixture.addresses.bitcoin.coinType,
            data: fixture.addresses.bitcoin.value,
          }),
          raw: fixture.addresses.bitcoin.value,
        },
        { coinType: 2n, address: null, raw: null },
        { coinType: 60n, address: fixture.addresses.eth, raw: fixture.addresses.eth },
      ]);
    }),
  );

  it.effect("returns structured unset records for names without a resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const single = yield* getAddress.effect(devnet.configs.v2, {
        name: devnet.fixtures.v2.noResolver.name,
      });
      const multiple = yield* getAddresses.effect(devnet.configs.v2, {
        name: devnet.fixtures.v2.noResolver.name,
        coinTypes: [60n, 0n],
      });

      expect(single).toEqual({ coinType: 60n, address: null, raw: null });
      expect(multiple).toEqual([
        { coinType: 60n, address: null, raw: null },
        { coinType: 0n, address: null, raw: null },
      ]);
    }),
  );

  it.effect("supports address actions inside semantic read batches", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v2;
      const result = yield* readBatch.effect(devnet.configs.v2, {
        address: getAddress.request({ name: fixture.name }),
        addresses: getAddresses.request({ name: fixture.name, coinTypes: [60n, 0n] }),
        owner: getOwner.request({ name: fixture.name }),
      });

      assert.strictEqual(result.address.address, fixture.addresses.eth);
      expect(result.addresses.map(({ coinType, raw }) => ({ coinType, raw }))).toEqual([
        { coinType: 60n, raw: fixture.addresses.eth },
        { coinType: 0n, raw: fixture.addresses.bitcoin.value },
      ]);
      assert.isNotNull(result.owner);
    }),
  );

  it.effect("returns an empty result without resolving when no coin types are requested", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* getAddresses.effect(devnet.configs.v2, {
        name: devnet.fixtures.records.v2.name,
        coinTypes: [],
      });

      expect(result).toEqual([]);
    }),
  );
});
