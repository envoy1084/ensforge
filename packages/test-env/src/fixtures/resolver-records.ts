import { Effect } from "effect";

import { publicResolverV1Abi } from "@ensforge/contracts/v1";
import { publicResolverV2Abi } from "@ensforge/contracts/v2";
import {
  concatHex,
  namehash,
  numberToHex,
  stringToHex,
  type Abi,
  type Address,
  type Hex,
} from "viem";

import type { DevnetEnvironment } from "../environment.js";
import { seedTransaction } from "./contract.js";
import type { ResolverRecordsFixture } from "./manifest.js";

const contenthash =
  "0xe301017012209d6c2be50f706953479ab9df2ce3edca90b68053c00b3004b7f0accbe1e8eedf" as const;
const abiJson = '[{"type":"function","name":"hello","inputs":[],"outputs":[]}]';
const pubkey = {
  x: "0x1111111111111111111111111111111111111111111111111111111111111111",
  y: "0x2222222222222222222222222222222222222222222222222222222222222222",
} as const;
const interfaceId = "0x01ffc9a7" as const;
const zonehash = "0x3333333333333333333333333333333333333333333333333333333333333333";
const customData = stringToHex("ensforge fixture data");
const bitcoinAddress = "0x00112233445566778899aabbccddeeff00112233" as const;

const encodeDnsName = (name: string): Hex =>
  concatHex([
    ...name
      .split(".")
      .map((label) => concatHex([numberToHex(label.length, { size: 1 }), stringToHex(label)])),
    "0x00",
  ]);

const dnsTxtRecord = (name: string, value: string): Hex => {
  const encodedValue = stringToHex(value);
  const characterLength = encodedValue.length / 2 - 1;
  const rdata = concatHex([numberToHex(characterLength, { size: 1 }), encodedValue]);

  return concatHex([
    encodeDnsName(name),
    numberToHex(16, { size: 2 }),
    numberToHex(1, { size: 2 }),
    numberToHex(60, { size: 4 }),
    numberToHex(rdata.length / 2 - 1, { size: 2 }),
    rdata,
  ]);
};

const resolverWriteAbi = [...publicResolverV1Abi, ...publicResolverV2Abi] as const satisfies Abi;

const seedResolverRecords = Effect.fn("seedResolverRecordsForName")(function* (
  environment: DevnetEnvironment,
  name: string,
  resolver: Address,
) {
  const node = namehash(name);
  const transaction = (
    functionName: string,
    args: readonly unknown[],
    record: string,
  ): Effect.Effect<unknown, unknown> =>
    seedTransaction(
      environment,
      {
        abi: resolverWriteAbi,
        address: resolver,
        functionName: functionName as never,
        args: args as never,
      },
      `Unable to seed the ${record} record for ${name}`,
      "owner",
    );

  yield* transaction("setAddr", [node, environment.accounts.owner], "ETH address");
  yield* transaction("setAddr", [node, 0n, bitcoinAddress], "coin-type address");
  yield* transaction("setText", [node, "email", "hello@ensforge.test"], "email text");
  yield* transaction("setText", [node, "avatar", "https://ensforge.test/avatar.png"], "avatar");
  yield* transaction("setText", [node, "url", "https://ensforge.test"], "URL text");
  yield* transaction(
    "setText",
    [node, "description", "Ensforge integration fixture"],
    "description",
  );
  yield* transaction("setContenthash", [node, contenthash], "contenthash");
  yield* transaction("setABI", [node, 1n, stringToHex(abiJson)], "ABI");
  yield* transaction("setPubkey", [node, pubkey.x, pubkey.y], "public key");
  yield* transaction("setInterface", [node, interfaceId, environment.accounts.owner2], "interface");
  yield* transaction("setName", [node, name], "name");
  yield* transaction("setData", [node, "com.ensforge.fixture", customData], "data");
  yield* transaction("setZonehash", [node, zonehash], "zonehash");
  yield* transaction(
    "setDNSRecords",
    [node, dnsTxtRecord(`profile.${name}`, "ensforge.test")],
    "DNS TXT",
  );

  return {
    abi: { contentType: 1n, value: stringToHex(abiJson) },
    addresses: {
      eth: environment.accounts.owner,
      bitcoin: { coinType: 0n, value: bitcoinAddress },
    },
    contenthash,
    data: { key: "com.ensforge.fixture", value: customData },
    dns: { name: `profile.${name}`, resource: 16, value: "ensforge.test" },
    interface: { id: interfaceId, implementer: environment.accounts.owner2 },
    name,
    node,
    primaryName: name,
    pubkey,
    resolver,
    texts: {
      avatar: "https://ensforge.test/avatar.png",
      description: "Ensforge integration fixture",
      email: "hello@ensforge.test",
      url: "https://ensforge.test",
    },
    zonehash,
  } satisfies ResolverRecordsFixture;
});

export const seedResolverRecordFixtures = Effect.fn("seedResolverRecordFixtures")(function* (
  environment: DevnetEnvironment,
) {
  return {
    v1: yield* seedResolverRecords(
      environment,
      "v1-unwrapped.eth",
      environment.deployments.v1.contracts.publicResolver,
    ),
    v2: yield* seedResolverRecords(
      environment,
      "v2-migrated-locked.eth",
      environment.deployments.v2.contracts.publicResolver,
    ),
    reserved: yield* seedResolverRecords(
      environment,
      "v2-reserved-unwrapped.eth",
      environment.deployments.v1.contracts.publicResolver,
    ),
  };
});
