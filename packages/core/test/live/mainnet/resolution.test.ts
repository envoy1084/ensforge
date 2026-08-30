import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { isAddress, zeroAddress } from "viem";

import {
  getAddress,
  getAddresses,
  getPrimaryName,
  getRecords,
  getResolver,
  toCoinType,
} from "../../../src/index.js";
import { mainnetConfig, mainnetNames } from "../setup/mainnet.js";

describe("Mainnet resolution", () => {
  it.effect("uses the canonical Universal Resolver", () =>
    Effect.gen(function* () {
      const [address, resolver] = yield* Effect.all(
        [
          getAddress.effect(mainnetConfig, { name: mainnetNames.universalResolver }),
          getResolver.effect(mainnetConfig, { name: mainnetNames.universalResolver }),
        ] as const,
        { concurrency: 2 },
      );

      assert.strictEqual(address.address, "0x2222222222222222222222222222222222222222");
      assert.isNotNull(resolver);
      assert.notStrictEqual(resolver, zeroAddress);
    }),
  );

  it.effect("resolves the official CCIP-Read canary", () =>
    Effect.gen(function* () {
      const [address, resolver] = yield* Effect.all(
        [
          getAddress.effect(mainnetConfig, { name: mainnetNames.ccipRead }),
          getResolver.effect(mainnetConfig, { name: mainnetNames.ccipRead }),
        ] as const,
        { concurrency: 2 },
      );

      assert.strictEqual(address.address, "0x779981590E7Ccc0CFAe8040Ce7151324747cDb97");
      assert.isNotNull(resolver);
      assert.notStrictEqual(resolver, zeroAddress);
    }),
  );

  it.effect("resolves a standard ENS profile consistently", () =>
    Effect.gen(function* () {
      const [address, profile] = yield* Effect.all(
        [
          getAddress.effect(mainnetConfig, { name: mainnetNames.standard }),
          getRecords.effect(mainnetConfig, {
            name: mainnetNames.standard,
            records: {
              addresses: [60n],
              texts: ["url"],
              avatar: true,
              contentHash: true,
            },
          }),
        ] as const,
        { concurrency: 2 },
      );

      assert.isNotNull(address.address);
      assert.strictEqual(profile.addresses[0]?.address, address.address);
      assert.strictEqual(profile.texts[0]?.key, "url");
      assert.isDefined(profile.contentHash);
    }),
  );

  it.effect("resolves chain-specific multichain address records", () =>
    Effect.gen(function* () {
      const baseCoinType = toCoinType(8453);
      const addresses = yield* getAddresses.effect(mainnetConfig, {
        name: mainnetNames.multichain,
        coinTypes: [60n, baseCoinType],
      });

      assert.strictEqual(addresses[0]?.address, "0x2B0F09F23193de2Fb66258a10886B9f06903276c");
      assert.strictEqual(addresses[1]?.address, "0x7d3a48269416507E6d207a9449E7800971823Ffa");
      assert.notStrictEqual(addresses[0]?.raw, addresses[1]?.raw);
    }),
  );

  it.effect("resolves a DNS name without assuming an eth suffix", () =>
    Effect.gen(function* () {
      const [address, resolver] = yield* Effect.all(
        [
          getAddress.effect(mainnetConfig, { name: mainnetNames.dns }),
          getResolver.effect(mainnetConfig, { name: mainnetNames.dns }),
        ] as const,
        { concurrency: 2 },
      );

      assert.isNotNull(address.address);
      assert.isTrue(isAddress(address.address));
      assert.isNotNull(resolver);
      assert.notStrictEqual(resolver, zeroAddress);
    }),
  );

  it.effect("round-trips a forward-verified primary name", () =>
    Effect.gen(function* () {
      const forward = yield* getAddress.effect(mainnetConfig, { name: mainnetNames.reverse });
      if (forward.address === null) {
        return yield* Effect.die(new Error(`${mainnetNames.reverse} has no Ethereum address`));
      }

      const primary = yield* getPrimaryName.effect(mainnetConfig, { address: forward.address });
      if (primary === null) {
        return yield* Effect.die(new Error(`${forward.address} has no verified primary name`));
      }

      const roundTrip = yield* getAddress.effect(mainnetConfig, { name: primary.name });
      assert.isTrue(primary.match);
      assert.strictEqual(roundTrip.address?.toLowerCase(), forward.address.toLowerCase());
    }),
  );
});
