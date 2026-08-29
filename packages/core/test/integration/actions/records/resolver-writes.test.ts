import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  AuthorizationError,
  WritePlanError,
  clearAvatar,
  decodeAddressRecord,
  getRecordPermissions,
  getRecords,
  sendCalls,
  setAbi,
  setAddress,
  setAddresses,
  setAvatar,
  setContentHash,
  setData,
  setInterface,
  setName,
  setPubkey,
  setText,
  setTexts,
  simulateCalls,
} from "../../../../src/index.js";
import { createTestConfig } from "../../../../src/testing/index.js";
import { getIntegrationDevnet, type IntegrationDevnet } from "../../setup/devnet.js";

const phaseAbi = [
  {
    type: "function",
    name: "phaseTen",
    stateMutability: "view",
    inputs: [],
    outputs: [],
  },
] as const;
const contentHashValue = "bafybeigdyrzt5sfp7udm7hu76u3dgn4hz6l4n5yhzf3xj7o2k5v5z5z5zi";
const interfaceId = "0x01ffc9a7";
const pubkey = {
  x: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  y: "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
} as const;

const completeRecordCalls = (
  devnet: IntegrationDevnet,
  name: string,
  suffix: string,
  bitcoinAddress: string,
) => [
  setTexts.call({
    name,
    texts: [
      { key: `com.ensforge.phase10.${suffix}.one`, value: "one" },
      { key: `com.ensforge.phase10.${suffix}.two`, value: "two" },
    ],
  }),
  setAddress.call({ name, address: devnet.accounts.owner2 }),
  setAddresses.call({
    name,
    addresses: [
      { coinType: 60n, address: devnet.accounts.owner2 },
      { coinType: 0n, address: bitcoinAddress },
    ],
  }),
  setContentHash.call({ name, protocol: "ipfs", value: contentHashValue }),
  setAbi.call({ name, contentType: "json", value: phaseAbi }),
  setPubkey.call({ name, ...pubkey }),
  setInterface.call({ name, interfaceId, implementer: devnet.accounts.owner2 }),
  setData.call({ name, key: `com.ensforge.phase10.${suffix}`, value: "0x1234" }),
  setName.call({ name, value: `primary-${suffix}.eth` }),
  setAvatar.call({ name, value: `https://ensforge.test/${suffix}.png` }),
  clearAvatar.call({ name }),
];

describe("resolver write integration", () => {
  it.effect("writes and reads every focused record profile on the V1 Public Resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v1;
      const bitcoinAddress = yield* Effect.sync(() =>
        decodeAddressRecord({ coinType: 0n, data: fixture.addresses.bitcoin.value }),
      );
      assert.isNotNull(bitcoinAddress);

      const result = yield* sendCalls.effect(devnet.configs.v1, {
        calls: completeRecordCalls(devnet, fixture.name, "v1", bitcoinAddress),
        mode: "sequential",
      });
      const records = yield* getRecords.effect(devnet.configs.v1, {
        name: fixture.name,
        records: {
          addresses: [60n, 0n],
          texts: ["com.ensforge.phase10.v1.one", "com.ensforge.phase10.v1.two", "avatar"],
          contentHash: true,
          abi: { contentTypes: ["json"] },
          pubkey: true,
          interfaces: [interfaceId],
          data: ["com.ensforge.phase10.v1"],
          name: true,
        },
      });

      assert.strictEqual(result.status, "completed");
      assert.isTrue(result.calls.every((call) => call.status === "confirmed"));
      assert.strictEqual(records.addresses[0]?.address, devnet.accounts.owner2);
      assert.strictEqual(records.addresses[1]?.address, bitcoinAddress);
      assert.deepStrictEqual(
        records.texts.map((record) => record.value),
        ["one", "two", null],
      );
      assert.strictEqual(records.contentHash.value, contentHashValue);
      assert.deepStrictEqual(records.abi.value, phaseAbi);
      assert.deepStrictEqual(records.pubkey, pubkey);
      assert.strictEqual(records.interfaces[0]?.implementer, devnet.accounts.owner2);
      assert.strictEqual(records.data[0]?.value, "0x1234");
      assert.strictEqual(records.nameRecord.name, "primary-v1.eth");
    }),
  );

  it.effect("writes every focused profile on a V2 Permissioned Resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.permissions.v2.permissionedResolver;
      const bitcoinAddress = yield* Effect.sync(() =>
        decodeAddressRecord({
          coinType: 0n,
          data: devnet.fixtures.records.v1.addresses.bitcoin.value,
        }),
      );
      assert.isNotNull(bitcoinAddress);

      const result = yield* sendCalls.effect(devnet.configs.v2, {
        calls: completeRecordCalls(devnet, fixture.name, "v2-role", bitcoinAddress),
        mode: "sequential",
      });
      const records = yield* getRecords.effect(devnet.configs.v2, {
        name: fixture.name,
        records: {
          addresses: [60n, 0n],
          texts: ["com.ensforge.phase10.v2-role.one", "avatar"],
          contentHash: true,
          abi: { contentTypes: ["json"] },
          pubkey: true,
          interfaces: [interfaceId],
          data: ["com.ensforge.phase10.v2-role"],
          name: true,
        },
      });

      assert.strictEqual(result.status, "completed");
      assert.isTrue(result.calls.every((call) => call.status === "confirmed"));
      assert.strictEqual(records.addresses[0]?.address, devnet.accounts.owner2);
      assert.strictEqual(records.addresses[1]?.address, bitcoinAddress);
      assert.strictEqual(records.texts[0]?.value, "one");
      assert.isNull(records.texts[1]?.value);
      assert.strictEqual(records.contentHash.value, contentHashValue);
      assert.deepStrictEqual(records.abi.value, phaseAbi);
      assert.deepStrictEqual(records.pubkey, pubkey);
      assert.strictEqual(records.interfaces[0]?.implementer, devnet.accounts.owner2);
      assert.strictEqual(records.data[0]?.value, "0x1234");
      assert.strictEqual(records.nameRecord.name, "primary-v2-role.eth");
    }),
  );

  it.effect("supports Public Resolver delegates without granting inherited resolver control", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const v1Call = setTexts.call({
        name: devnet.fixtures.permissions.v1.resolverDelegate.name,
        texts: [{ key: "com.ensforge.delegate", value: "v1" }],
      });
      const v2Call = setData.call({
        name: devnet.fixtures.permissions.v2.resolverDelegate.name,
        key: "com.ensforge.delegate",
        value: "0x02",
      });
      const [v1, v2] = yield* Effect.all(
        [
          sendCalls.effect(devnet.configs.v1, {
            calls: [v1Call],
            account: devnet.fixtures.permissions.operator,
            mode: "sequential",
          }),
          sendCalls.effect(devnet.configs.v2, {
            calls: [v2Call],
            account: devnet.fixtures.permissions.operator,
            mode: "sequential",
          }),
        ] as const,
        { concurrency: 1 },
      );
      const inherited = yield* simulateCalls
        .effect(devnet.configs.v2, {
          calls: [
            setText.call({
              name: devnet.fixtures.v2.inheritedResolver.name,
              key: "com.ensforge.inherited",
              value: "inherited",
            }),
          ],
          account: devnet.accounts.owner2,
        })
        .pipe(Effect.flip);

      assert.strictEqual(v1.status, "completed");
      assert.strictEqual(v2.status, "completed");
      assert.instanceOf(inherited, AuthorizationError);
      assert.strictEqual(inherited.code, "UNAUTHORIZED");
    }),
  );

  it.effect("enforces exact V2 record roles and rejects invalid write plans", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.permissions.v2.permissionedResolver;
      const scoped = yield* sendCalls.effect(devnet.configs.v2, {
        calls: [
          setTexts.call({
            name: fixture.name,
            texts: [{ key: fixture.textKey, value: "scoped" }],
          }),
        ],
        account: devnet.fixtures.permissions.operator,
        mode: "sequential",
      });
      const denied = yield* simulateCalls
        .effect(devnet.configs.v2, {
          calls: [
            setTexts.call({
              name: fixture.name,
              texts: [
                { key: fixture.textKey, value: "allowed" },
                { key: "url", value: "denied" },
              ],
            }),
          ],
          account: devnet.fixtures.permissions.operator,
        })
        .pipe(Effect.flip);
      const empty = yield* simulateCalls
        .effect(devnet.configs.v2, {
          calls: [setTexts.call({ name: fixture.name, texts: [] })],
        })
        .pipe(Effect.flip);
      const missingResolver = yield* simulateCalls
        .effect(devnet.configs.v2, {
          calls: [
            setData.call({
              name: devnet.fixtures.v2.noResolver.name,
              key: "missing",
              value: "0x01",
            }),
          ],
        })
        .pipe(Effect.flip);

      assert.strictEqual(scoped.status, "completed");
      assert.instanceOf(denied, AuthorizationError);
      assert.strictEqual(denied.code, "UNAUTHORIZED");
      assert.instanceOf(empty, WritePlanError);
      assert.strictEqual(empty.code, "INVALID_CALL_PLAN");
      assert.instanceOf(missingResolver, AuthorizationError);
      assert.strictEqual(missingResolver.code, "WRITE_TARGET_UNAVAILABLE");
    }),
  );

  it.effect("lets simulation decide authorization for an unrecognized custom resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.v1.activeUnwrapped.name;
      const walletClient = devnet.configs.v1.walletClient;
      if (walletClient === undefined) {
        return yield* Effect.die(new Error("The integration config must include a wallet client"));
      }
      const customResolverConfig = createTestConfig({
        deployments: {
          protocol: "v1",
          v1: {
            ...devnet.deployments.v1,
            contracts: {
              ...devnet.deployments.v1.contracts,
              publicResolver: devnet.accounts.owner2,
            },
          },
        },
        publicClient: devnet.configs.v1.publicClient,
        walletClient,
      });
      const permissions = yield* getRecordPermissions.effect(customResolverConfig, {
        name,
        account: devnet.accounts.owner,
        records: [{ type: "text", key: "com.ensforge.custom-simulation" }],
      });
      const simulated = yield* simulateCalls.effect(customResolverConfig, {
        calls: [
          setText.call({
            name,
            key: "com.ensforge.custom-simulation",
            value: "simulation-authorized",
          }),
        ],
      });

      assert.strictEqual(permissions.records[0]?.authorization.status, "unknown");
      assert.strictEqual(simulated.length, 1);
    }),
  );
});
