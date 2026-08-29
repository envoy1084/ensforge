import { Effect, Stream } from "effect";

import { mainnet } from "viem/chains";
import { describe, expect, it } from "vitest";
import { createConfig as createWagmiConfig } from "wagmi";

import { Ensforge } from "../../../src/index.js";
import { makeMainnetPublicClient, testTransport } from "../fixtures/clients.js";

const actionNames = {
  batch: [
    "estimateCalls",
    "executeWritePlan",
    "getCallsStatus",
    "getWalletCapabilities",
    "prepareCalls",
    "readBatch",
    "readBatchSettled",
    "resumeCalls",
    "sendCalls",
    "simulateCalls",
  ],
  capabilities: [
    "getNameCapabilities",
    "getOperatorApproval",
    "getRecordPermissions",
    "getRegistryCapabilities",
    "getRegistryRoles",
    "getRequiredAuthorization",
    "getResolverCapabilities",
    "getResolverDelegateApproval",
    "getResolverRoles",
    "getTokenApproval",
    "getWrapperPermissions",
    "getWriteTarget",
    "hasRegistryRoles",
    "hasResolverRoles",
  ],
  dns: [
    "claimDnsName",
    "getDnsClaimStatus",
    "getDnsImportPlan",
    "getDnsRecord",
    "getDnsRecords",
    "getZoneHash",
    "hasDnsRecords",
    "importDnsName",
    "setDnsRecords",
    "setZoneHash",
  ],
  events: ["getEnsEvents", "getNameHistory", "watchEnsEvents"],
  migration: [
    "approveMigration",
    "getMigrationEligibility",
    "getMigrationPlan",
    "getMigrationStatus",
    "getMigrationTarget",
    "migrateName",
    "migrateNames",
  ],
  name: [
    "getCanonicalResource",
    "getExpiry",
    "getManager",
    "getNameState",
    "getNameStatus",
    "getOwner",
    "getProtocol",
    "getRegistrant",
    "getRegistry",
    "getTokenId",
    "isAvailable",
    "isMigrated",
    "isRenewable",
    "isReserved",
    "isWrapped",
  ],
  ownership: [
    "getTtl",
    "reclaimName",
    "setManager",
    "setTtl",
    "transferName",
    "transferRegistrant",
  ],
  permissions: [
    "approveName",
    "clearNameApproval",
    "grantRegistryRoles",
    "grantResolverRoles",
    "grantResolverRootRoles",
    "revokeRegistryRoles",
    "revokeResolverRoles",
    "revokeResolverRootRoles",
    "setOperatorApproval",
    "setRecordPermissions",
    "setResolverDelegateApproval",
  ],
  records: [
    "clearAvatar",
    "clearRecords",
    "getAbi",
    "getAddress",
    "getAddresses",
    "getAvatar",
    "getContentHash",
    "getData",
    "getInterface",
    "getName",
    "getPubkey",
    "getRecords",
    "getText",
    "getTexts",
    "setAbi",
    "setAddress",
    "setAddresses",
    "setAlias",
    "setAvatar",
    "setContentHash",
    "setData",
    "setInterface",
    "setName",
    "setPubkey",
    "setRecords",
    "setText",
    "setTexts",
  ],
  registration: [
    "approvePaymentToken",
    "approveRenewalPayment",
    "commitName",
    "completeRegistration",
    "getCommitmentStatus",
    "getRegistrationParameters",
    "getRegistrationPlan",
    "getRegistrationPrice",
    "getRenewalPrice",
    "isPaymentTokenSupported",
    "makeRegistrationCommitment",
    "registerName",
    "registerNames",
    "renewName",
    "renewNames",
  ],
  resolution: [
    "createResolver",
    "getAlias",
    "getOrCreateResolver",
    "getResolver",
    "getResolverVersion",
    "predictResolverAddress",
    "resolve",
    "resolveBatch",
    "resolveWithResolver",
    "setResolver",
    "setResolverAndRecords",
    "upgradeResolver",
  ],
  reverse: [
    "clearPrimaryName",
    "getPrimaryName",
    "setContractPrimaryName",
    "setPrimaryName",
    "setPrimaryNameForAddress",
  ],
  subnames: [
    "createSubname",
    "deleteSubname",
    "setSubnameExpiry",
    "setSubnameManager",
    "setSubnameRecord",
    "setSubnameResolver",
    "transferSubname",
  ],
  wrapping: [
    "extendSubnameExpiry",
    "getFuses",
    "getWrapperExpiry",
    "setChildFuses",
    "setFuses",
    "unwrapName",
    "wrapName",
  ],
} as const;

describe("Ensforge", () => {
  it("creates an immutable SDK with every grouped core action", () => {
    const sdk = new Ensforge({
      network: "mainnet",
      publicClient: makeMainnetPublicClient(),
    });

    expect(sdk.config.network).toBe("mainnet");
    expect(Object.isFrozen(sdk)).toBe(true);

    for (const [group, names] of Object.entries(actionNames)) {
      const namespace = Reflect.get(sdk, group) as Readonly<Record<string, unknown>>;
      expect(Object.keys(namespace)).toEqual(names);
      expect(Object.isFrozen(namespace)).toBe(true);
      for (const action of Object.values(namespace)) {
        expect(action).toBeTypeOf("function");
        expect(Object.isFrozen(action)).toBe(true);
      }
    }

    expect(Object.values(actionNames).flat()).toHaveLength(149);
  });

  it("accepts a Wagmi config", () => {
    const wagmiConfig = createWagmiConfig({
      chains: [mainnet],
      transports: { [mainnet.id]: testTransport },
    });
    const sdk = new Ensforge({ network: "mainnet", wagmiConfig });

    expect(sdk.config.publicClient.chain?.id).toBe(mainnet.id);
  });

  it("preserves Effect, read request, write intent, batch, and stream APIs", () => {
    const sdk = new Ensforge({
      network: "mainnet",
      publicClient: makeMainnetPublicClient(),
    });
    const owner = sdk.name.getOwner.request({ name: "ens.eth" });
    const records = sdk.records.getRecords.request({
      name: "ens.eth",
      records: { avatar: true, texts: ["url"] },
    });
    const batch = sdk.batch.readBatch.effect({ owner, records });
    const write = sdk.records.setText.call({
      name: "ens.eth",
      key: "url",
      value: "https://ens.domains",
    });
    const events = sdk.events.watchEnsEvents.stream({ name: "ens.eth" });

    expect(Effect.isEffect(sdk.name.getOwner.effect({ name: "ens.eth" }))).toBe(true);
    expect(Effect.isEffect(batch)).toBe(true);
    expect(write.operation).toBe("setText");
    expect(Stream.isStream(events)).toBe(true);
  });
});
