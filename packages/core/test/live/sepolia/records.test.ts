import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  getAbi,
  getAddress,
  getAddresses,
  getAlias,
  getAvatar,
  getContentHash,
  getData,
  getDnsRecord,
  getInterface,
  getName,
  getPubkey,
  getRecords,
  getResolver,
  getResolverVersion,
  getText,
  getZoneHash,
  toCoinType,
} from "../../../src/index.js";
import { sepoliaConfig, sepoliaNames } from "../setup/sepolia.js";

const baseCoinType = toCoinType(8453);

describe("Sepolia V1 and V2 records", () => {
  it.effect("reads every seeded Permissioned Resolver profile", () =>
    Effect.gen(function* () {
      const name = sepoliaNames.v2.profile;
      const [
        address,
        addresses,
        text,
        avatar,
        contentHash,
        abi,
        pubkey,
        implementer,
        data,
        nameRecord,
      ] = yield* Effect.all(
        [
          getAddress.effect(sepoliaConfig, { name }),
          getAddresses.effect(sepoliaConfig, { name, coinTypes: [60n, baseCoinType] }),
          getText.effect(sepoliaConfig, { name, key: "description" }),
          getAvatar.effect(sepoliaConfig, { name }),
          getContentHash.effect(sepoliaConfig, { name }),
          getAbi.effect(sepoliaConfig, { name }),
          getPubkey.effect(sepoliaConfig, { name }),
          getInterface.effect(sepoliaConfig, { name, interfaceId: "0x01ffc9a7" }),
          getData.effect(sepoliaConfig, { name, key: "com.ensforge.smoke" }),
          getName.effect(sepoliaConfig, { name }),
        ] as const,
        { concurrency: 3 },
      );

      assert.isNotNull(address.address);
      assert.strictEqual(addresses[0]?.address, address.address);
      assert.strictEqual(addresses[1]?.address, address.address);
      assert.strictEqual(text.value, "ensforge ENSv2 Sepolia smoke-test profile");
      assert.isNotNull(avatar);
      assert.strictEqual(avatar?.status, "resolved");
      if (avatar?.status === "resolved") {
        assert.strictEqual(avatar.uri, "https://ensforge.envoy1084.xyz/og.png");
      }
      assert.strictEqual(contentHash.protocol, "ipfs");
      assert.isNotNull(contentHash.value);
      assert.strictEqual(abi.contentType, "json");
      assert.isArray(abi.value);
      assert.isNotNull(pubkey);
      assert.strictEqual(pubkey?.x, `0x${"11".repeat(32)}`);
      assert.strictEqual(pubkey?.y, `0x${"22".repeat(32)}`);
      assert.strictEqual(implementer.implementer, address.address);
      assert.strictEqual(data.value, "0x656e73666f726765");
      assert.strictEqual(nameRecord.name, name);
    }),
  );

  it.effect("composes the same profile through getRecords", () =>
    Effect.gen(function* () {
      const name = sepoliaNames.v2.profile;
      const records = yield* getRecords.effect(sepoliaConfig, {
        name,
        records: {
          addresses: [60n, baseCoinType],
          texts: ["description", "url", "com.twitter", "email", "avatar"],
          avatar: true,
          contentHash: true,
          abi: true,
          pubkey: true,
          name: true,
          interfaces: ["0x01ffc9a7"],
          data: ["com.ensforge.smoke"],
        },
      });

      assert.strictEqual(String(records.name), name);
      assert.strictEqual(records.addresses.length, 2);
      assert.isTrue(records.addresses.every(({ address }) => address !== null));
      assert.strictEqual(records.texts.length, 5);
      assert.isTrue(records.texts.every(({ value }) => value !== null));
      assert.strictEqual(records.avatar?.status, "resolved");
      assert.strictEqual(records.contentHash?.protocol, "ipfs");
      assert.strictEqual(records.abi?.contentType, "json");
      assert.strictEqual(records.pubkey?.x, `0x${"11".repeat(32)}`);
      assert.strictEqual(records.nameRecord?.name, name);
      assert.isNotNull(records.interfaces[0]?.implementer);
      assert.strictEqual(records.data[0]?.value, "0x656e73666f726765");
    }),
  );

  it.effect("reads alias and resolver metadata from the deployed V2 resolver", () =>
    Effect.gen(function* () {
      const [alias, profileResolver, inheritedResolver, version] = yield* Effect.all(
        [
          getAlias.effect(sepoliaConfig, { name: sepoliaNames.v2.alias }),
          getResolver.effect(sepoliaConfig, { name: sepoliaNames.v2.profile }),
          getResolver.effect(sepoliaConfig, { name: sepoliaNames.v2.inherited }),
          getResolverVersion.effect(sepoliaConfig, { name: sepoliaNames.v2.profile }),
        ] as const,
        { concurrency: 2 },
      );

      assert.isTrue(alias.supported);
      assert.strictEqual(String(alias.target), sepoliaNames.v2.profile);
      assert.isNotNull(profileResolver);
      assert.strictEqual(inheritedResolver, profileResolver);
      assert.isTrue(version.supported);
      if (version.supported) assert.strictEqual(version.version, 0n);
    }),
  );

  it.effect("resolves stable reserved V1 records through the transition resolver", () =>
    Effect.gen(function* () {
      const [vitalik, resolverProfile, vitalikResolver] = yield* Effect.all(
        [
          getAddress.effect(sepoliaConfig, { name: sepoliaNames.v1.reserved }),
          getAddress.effect(sepoliaConfig, { name: sepoliaNames.v1.resolverProfile }),
          getResolver.effect(sepoliaConfig, { name: sepoliaNames.v1.reserved }),
        ] as const,
        { concurrency: 2 },
      );

      assert.strictEqual(vitalik.address, "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
      assert.isNotNull(resolverProfile.address);
      assert.isNotNull(vitalikResolver);
    }),
  );

  it.effect("returns explicit empty DNS reads for a V2-only Public Resolver name", () =>
    Effect.gen(function* () {
      const [record, zoneHash] = yield* Effect.all(
        [
          getDnsRecord.effect(sepoliaConfig, {
            name: sepoliaNames.v2.dns,
            recordName: `profile.${sepoliaNames.v2.dns}`,
            resource: 16,
          }),
          getZoneHash.effect(sepoliaConfig, { name: sepoliaNames.v2.dns }),
        ] as const,
        { concurrency: 2 },
      );

      assert.isNull(record.value);
      assert.isNull(zoneHash.value);
    }),
  );
});
