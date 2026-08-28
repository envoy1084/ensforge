import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { expect } from "vitest";

import {
  decodeAddressRecord,
  decodeContentHash,
  getOwner,
  getRecords,
  readBatch,
} from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

describe("resolver profile integration", () => {
  it.effect("resolves a complete selected profile with one resolver-native multicall", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v2;
      const decodedContentHash = decodeContentHash(fixture.contenthash);
      assert.isNotNull(decodedContentHash);

      const result = yield* getRecords.effect(devnet.configs.v2, {
        name: fixture.name,
        records: {
          addresses: [60n, fixture.addresses.bitcoin.coinType, 60n],
          texts: ["email", "missing", "email"],
          avatar: true,
          contentHash: true,
          abi: { contentTypes: ["json"] },
          pubkey: true,
          name: true,
          interfaces: [fixture.interface.id, "0xffffffff"],
          data: [fixture.data.key, "com.ensforge.missing"],
        },
      });

      expect(result).toEqual({
        name: fixture.name,
        addresses: [
          { coinType: 60n, address: fixture.addresses.eth, raw: fixture.addresses.eth },
          {
            coinType: fixture.addresses.bitcoin.coinType,
            address: decodeAddressRecord({
              coinType: fixture.addresses.bitcoin.coinType,
              data: fixture.addresses.bitcoin.value,
            }),
            raw: fixture.addresses.bitcoin.value,
          },
          { coinType: 60n, address: fixture.addresses.eth, raw: fixture.addresses.eth },
        ],
        texts: [
          { key: "email", value: fixture.texts.email },
          { key: "missing", value: null },
          { key: "email", value: fixture.texts.email },
        ],
        avatar: { record: fixture.texts.avatar, uri: fixture.texts.avatar },
        contentHash: { ...decodedContentHash, raw: fixture.contenthash },
        abi: { contentType: "json", value: fixture.abi.value, raw: fixture.abi.json.raw },
        pubkey: fixture.pubkey,
        nameRecord: { name: fixture.name },
        interfaces: [
          { interfaceId: fixture.interface.id, implementer: fixture.interface.implementer },
          { interfaceId: "0xffffffff", implementer: null },
        ],
        data: [
          { key: fixture.data.key, value: fixture.data.value },
          { key: "com.ensforge.missing", value: null },
        ],
      });
    }),
  );

  it.effect("uses v1, migrated v2, and RESERVED routing without changing the API", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [v1, migrated, reserved] = yield* Effect.all([
        getRecords.effect(devnet.configs.v1, {
          name: devnet.fixtures.records.v1.name,
          records: { addresses: [60n], texts: ["email"] },
        }),
        getRecords.effect(devnet.configs.v2, {
          name: devnet.fixtures.records.v2.name,
          records: { addresses: [60n], texts: ["email"] },
        }),
        getRecords.effect(devnet.configs.v2, {
          name: devnet.fixtures.records.reserved.name,
          records: { addresses: [60n], texts: ["email"] },
        }),
      ]);

      expect(v1.addresses[0]?.address).toBe(devnet.fixtures.records.v1.addresses.eth);
      expect(migrated.addresses[0]?.address).toBe(devnet.fixtures.records.v2.addresses.eth);
      expect(reserved.addresses[0]?.address).toBe(devnet.fixtures.records.reserved.addresses.eth);
      expect(v1.texts[0]?.value).toBe(devnet.fixtures.records.v1.texts.email);
      expect(migrated.texts[0]?.value).toBe(devnet.fixtures.records.v2.texts.email);
      expect(reserved.texts[0]?.value).toBe(devnet.fixtures.records.reserved.texts.email);
    }),
  );

  it.effect("returns selected unset shapes when the name has no resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.v2.noResolver.name;
      const result = yield* getRecords.effect(devnet.configs.v2, {
        name,
        records: {
          addresses: [60n],
          texts: ["email"],
          avatar: true,
          contentHash: true,
          abi: true,
          pubkey: true,
          name: true,
          interfaces: ["0x01ffc9a7"],
          data: ["com.ensforge.fixture"],
        },
      });

      expect(result).toEqual({
        name,
        addresses: [{ coinType: 60n, address: null, raw: null }],
        texts: [{ key: "email", value: null }],
        avatar: null,
        contentHash: { protocol: null, value: null, raw: null },
        abi: { contentType: null, value: null, raw: null },
        pubkey: null,
        nameRecord: { name: null },
        interfaces: [{ interfaceId: "0x01ffc9a7", implementer: null }],
        data: [{ key: "com.ensforge.fixture", value: null }],
      });
    }),
  );

  it.effect("omits unselected fields and handles an empty selection without an RPC read", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.records.v2.name;
      const result = yield* getRecords.effect(devnet.configs.v2, { name, records: {} });

      expect(result).toEqual({ name });
    }),
  );

  it.effect("rejects an invalid selector before executing the resolver call", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const error = yield* Effect.flip(
        getRecords.effect(devnet.configs.v2, {
          name: devnet.fixtures.records.v2.name,
          records: { interfaces: ["0x1234"] },
        }),
      );

      expect(error).toMatchObject({ _tag: "CodecError", code: "INVALID_INTERFACE_ID" });
    }),
  );

  it.effect("supports complete profiles inside semantic read batches", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v2;
      const result = yield* readBatch.effect(devnet.configs.v2, {
        profile: getRecords.request({
          name: fixture.name,
          records: { addresses: [60n], texts: ["email"], avatar: true },
        }),
        owner: getOwner.request({ name: fixture.name }),
      });

      expect(result.profile.addresses[0]?.address).toBe(fixture.addresses.eth);
      expect(result.profile.texts[0]?.value).toBe(fixture.texts.email);
      expect(result.profile.avatar).toEqual({
        record: fixture.texts.avatar,
        uri: fixture.texts.avatar,
      });
      assert.isNotNull(result.owner);
    }),
  );
});
