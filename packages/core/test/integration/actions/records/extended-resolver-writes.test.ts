import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { concatHex, numberToHex, stringToHex } from "viem";

import {
  AuthorizationError,
  getAlias,
  getAddress,
  getData,
  getDnsRecord,
  getResolverVersion,
  getText,
  getZoneHash,
  setAlias,
  setDnsRecords,
  setRecords,
  setZoneHash,
  simulateCalls,
} from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

const encodeDnsName = (name: string) =>
  concatHex([
    ...name
      .split(".")
      .map((label) => concatHex([numberToHex(label.length, { size: 1 }), stringToHex(label)])),
    "0x00",
  ]);

const dnsTxtRecord = (name: string, value: string) => {
  const encodedValue = stringToHex(value);
  const rdata = concatHex([numberToHex(encodedValue.length / 2 - 1, { size: 1 }), encodedValue]);
  return concatHex([
    encodeDnsName(name),
    numberToHex(16, { size: 2 }),
    numberToHex(1, { size: 2 }),
    numberToHex(60, { size: 4 }),
    numberToHex(rdata.length / 2 - 1, { size: 2 }),
    rdata,
  ]);
};

describe("extended resolver writes integration", () => {
  it.effect("atomically clears and sets heterogeneous V2 records in declared order", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.permissions.v2.permissionedResolver.name;
      const result = yield* setRecords.effect(devnet.configs.v2, {
        name,
        records: [
          { type: "text", key: "com.ensforge.phase11", value: "before-clear" },
          { type: "clear" },
          { type: "text", key: "com.ensforge.phase11", value: "first" },
          { type: "text", key: "com.ensforge.phase11", value: "last" },
          { type: "address", address: devnet.accounts.owner2 },
          { type: "data", key: "com.ensforge.phase11", value: "0x1234" },
        ],
      });
      const records = yield* Effect.all(
        {
          text: getText.effect(devnet.configs.v2, {
            name,
            key: "com.ensforge.phase11",
          }),
          address: getAddress.effect(devnet.configs.v2, { name }),
          data: getData.effect(devnet.configs.v2, {
            name,
            key: "com.ensforge.phase11",
          }),
          version: getResolverVersion.effect(devnet.configs.v2, { name }),
        },
        { concurrency: "unbounded" },
      );

      assert.strictEqual(result.mode, "resolver");
      assert.isTrue(result.atomic);
      assert.strictEqual(records.text.value, "last");
      assert.strictEqual(records.address.address, devnet.accounts.owner2);
      assert.strictEqual(records.data.value, "0x1234");
      assert.isTrue(records.version.supported);
      if (records.version.supported) assert.strictEqual(records.version.version, 1n);
    }),
  );

  it.effect(
    "falls back to independently simulated calls when native resolver multicall is absent",
    () =>
      Effect.gen(function* () {
        const devnet = getIntegrationDevnet();
        const name = devnet.fixtures.v1.recordWrites.name;
        const result = yield* setRecords.effect(devnet.configs.v1, {
          name,
          aggregation: "wallet",
          mode: "sequential",
          records: [
            { type: "text", key: "com.ensforge.phase11.fallback", value: "fallback" },
            { type: "data", key: "com.ensforge.phase11.fallback", value: "0x11" },
          ],
        });
        const text = yield* getText.effect(devnet.configs.v1, {
          name,
          key: "com.ensforge.phase11.fallback",
        });

        assert.strictEqual(result.status, "completed");
        assert.strictEqual(text.value, "fallback");
      }),
  );

  it.effect("writes DNS records and zone hashes through a supported Public Resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.v1.recordWrites.name;
      const recordName = `phase11.${name}`;
      const data = dnsTxtRecord(recordName, "ensforge-phase-11");
      const zoneHash =
        "0x4444444444444444444444444444444444444444444444444444444444444444" as const;

      yield* setDnsRecords.effect(devnet.configs.v1, { name, data });
      yield* setZoneHash.effect(devnet.configs.v1, { name, value: zoneHash });
      const [record, zone] = yield* Effect.all(
        [
          getDnsRecord.effect(devnet.configs.v1, { name, recordName, resource: 16 }),
          getZoneHash.effect(devnet.configs.v1, { name }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.strictEqual(record.value, data);
      assert.strictEqual(zone.value, zoneHash);
    }),
  );

  it.effect("sets and clears Permissioned Resolver aliases", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.permissions.v2.permissionedResolver.name;

      yield* setAlias.effect(devnet.configs.v2, { name, target: "alias-target.eth" });
      const set = yield* getAlias.effect(devnet.configs.v2, { name });
      yield* setAlias.effect(devnet.configs.v2, { name, target: null });
      const cleared = yield* getAlias.effect(devnet.configs.v2, { name });

      assert.isTrue(set.supported);
      if (set.supported) assert.strictEqual(set.target, "alias-target.eth");
      assert.isTrue(cleared.supported);
      if (cleared.supported) assert.isNull(cleared.target);
    }),
  );

  it.effect("rejects alias and DNS profiles on incompatible resolvers", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [alias, dns] = yield* Effect.all(
        [
          simulateCalls
            .effect(devnet.configs.v2, {
              calls: [setAlias.call({ name: devnet.fixtures.v1.recordWrites.name, target: null })],
            })
            .pipe(Effect.flip),
          simulateCalls
            .effect(devnet.configs.v2, {
              calls: [
                setDnsRecords.call({
                  name: devnet.fixtures.permissions.v2.permissionedResolver.name,
                  data: "0x",
                }),
              ],
            })
            .pipe(Effect.flip),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.instanceOf(alias, AuthorizationError);
      assert.instanceOf(dns, AuthorizationError);
    }),
  );
});
