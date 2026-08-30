import { concatHex, numberToHex, stringToHex } from "viem";

const baseCoinType = 0x80000000n | 8453n;

const encodeDnsName = (name) =>
  concatHex([
    ...name
      .split(".")
      .map((label) => concatHex([numberToHex(label.length, { size: 1 }), stringToHex(label)])),
    "0x00",
  ]);

const dnsTxtRecord = (name, value) => {
  const encodedValue = stringToHex(value);
  const recordData = concatHex([
    numberToHex(encodedValue.length / 2 - 1, { size: 1 }),
    encodedValue,
  ]);
  return concatHex([
    encodeDnsName(name),
    numberToHex(16, { size: 2 }),
    numberToHex(1, { size: 2 }),
    numberToHex(60, { size: 4 }),
    numberToHex(recordData.length / 2 - 1, { size: 2 }),
    recordData,
  ]);
};

export const fixtureVersion = 1;

export const makeSepoliaV2Fixtures = ({ account, bareRoot, operator, root, secondary }) => {
  const names = {
    root,
    bareRoot,
    profile: `profile.${root}`,
    empty: `empty.${root}`,
    inherited: `inherited.${root}`,
    alias: `alias.${root}`,
    dns: `dns.${root}`,
    permissioned: `permissioned.${root}`,
    differentOwner: `different-owner.${root}`,
    branch: `branch.${root}`,
    nested: `nested.branch.${root}`,
    mutation: `mutation.${root}`,
    customExpiry: `custom-expiry.${root}`,
    available: `available.${root}`,
    availableRoot: `${root.slice(0, -4)}-available.eth`,
  };

  return {
    version: fixtureVersion,
    accounts: { owner: account, operator, secondary },
    names,
    records: {
      profile: {
        addresses: [
          { coinType: 60n, address: account },
          { coinType: baseCoinType, address: account },
        ],
        texts: [
          { key: "description", value: "ensforge ENSv2 Sepolia smoke-test profile" },
          { key: "url", value: "https://ensforge.envoy1084.xyz" },
          { key: "com.twitter", value: "ensforge" },
          { key: "email", value: "smoke@ensforge.invalid" },
          { key: "avatar", value: "https://ensforge.envoy1084.xyz/og.png" },
        ],
        contentHash: {
          protocol: "ipfs",
          value: "QmYwAPJzv5CZsnAzt8auVZRnGiRAK8vN2jEw9kDrYb3a5f",
        },
        abi: [
          {
            type: "function",
            name: "owner",
            stateMutability: "view",
            inputs: [],
            outputs: [{ name: "", type: "address" }],
          },
        ],
        pubkey: {
          x: `0x${"11".repeat(32)}`,
          y: `0x${"22".repeat(32)}`,
        },
        interface: { interfaceId: "0x01ffc9a7", implementer: account },
        data: { key: "com.ensforge.smoke", value: "0x656e73666f726765" },
        name: names.profile,
      },
      inherited: {
        text: { key: "description", value: "Resolver inherited from the fixture root" },
      },
      dns: {
        writable: false,
        reason:
          "The Sepolia PublicResolverV2 authorizes names through the V1 NameWrapper and cannot modify V2-only names",
        zoneHash: `0x${"33".repeat(32)}`,
        recordName: `profile.${names.dns}`,
        resource: 16,
        value: "ensforge-sepolia-v2",
        wire: dnsTxtRecord(`profile.${names.dns}`, "ensforge-sepolia-v2"),
      },
    },
  };
};

export const jsonReplacer = (_key, value) => (typeof value === "bigint" ? value.toString() : value);
