import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { createPublicClient, createWalletClient, defineChain, http } from "viem";

import {
  AuthorizationError,
  NameError,
  createSubname,
  deleteSubname,
  getNameState,
  getResolverCapabilities,
  getText,
  setSubnameExpiry,
  setSubnameManager,
  setSubnameRecord,
  setSubnameResolver,
  transferSubname,
} from "../../../../src/index.js";
import { createTestConfig } from "../../../../src/testing/index.js";
import { getIntegrationDevnet, type IntegrationDevnet } from "../../setup/devnet.js";

const configFor = (devnet: IntegrationDevnet, protocol: "v1" | "v2", account: `0x${string}`) => {
  const chain = defineChain({
    id: 31_337,
    name: "ensforge integration devnet",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
    rpcUrls: { default: { http: [devnet.rpcUrl] } },
    contracts: { multicall3: { address: devnet.deployments.multicall3, blockCreated: 0 } },
  });
  const transport = http(devnet.rpcUrl, { retryCount: 0, timeout: 10_000 });
  return createTestConfig({
    deployments:
      protocol === "v1"
        ? Object.freeze({ protocol: "v1", v1: devnet.deployments.v1 })
        : Object.freeze({
            protocol: "v2",
            v1: devnet.deployments.v1,
            v2: devnet.deployments.v2,
          }),
    publicClient: createPublicClient({ chain, transport }),
    walletClient: createWalletClient({ account, chain, transport }),
  });
};

describe("subname management integration", () => {
  it.effect("creates, administers, transfers, and deletes an unwrapped V1 subname", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = "phase15.v1-write-ready.eth";
      const owner2Config = configFor(devnet, "v1", devnet.accounts.owner2);
      const created = yield* createSubname.effect(devnet.configs.v1, {
        name,
        owner: devnet.accounts.owner,
        resolver: devnet.deployments.v1.contracts.publicResolver,
        ttl: 60n,
      });
      yield* setSubnameResolver.effect(devnet.configs.v1, {
        name,
        resolver: devnet.deployments.v1.contracts.publicResolver,
      });
      yield* setSubnameManager.effect(devnet.configs.v1, {
        name,
        manager: devnet.accounts.owner2,
      });
      const transferred = yield* transferSubname.effect(owner2Config, {
        name,
        to: devnet.accounts.owner,
      });
      yield* deleteSubname.effect(devnet.configs.v1, { name });
      const deleted = yield* getNameState.effect(devnet.configs.v1, { name });
      yield* createSubname.effect(devnet.configs.v1, {
        name,
        owner: devnet.accounts.owner,
      });
      yield* deleteSubname.effect(devnet.configs.v1, { name });

      assert.strictEqual(created.protocol, "v1");
      assert.strictEqual(created.finalState?.manager, devnet.accounts.owner);
      assert.strictEqual(transferred.finalState?.manager, devnet.accounts.owner);
      assert.isNull(deleted.owner);
    }),
  );

  it.effect("preserves wrapped child state while changing manager and expiry", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = "phase15.v1-wrapped.eth";
      const parent = yield* getNameState.effect(devnet.configs.v1, {
        name: devnet.fixtures.v1.activeWrapped.name,
      });
      const initialExpiry = (parent.expiry ?? 0n) - 100n;
      const created = yield* createSubname.effect(devnet.configs.v1, {
        name,
        owner: devnet.accounts.owner,
        expiry: initialExpiry,
      });
      yield* setSubnameExpiry.effect(devnet.configs.v1, {
        name,
        expiry: parent.expiry ?? initialExpiry,
      });
      yield* setSubnameManager.effect(devnet.configs.v1, {
        name,
        manager: devnet.accounts.owner2,
      });
      yield* setSubnameManager.effect(devnet.configs.v1, {
        name,
        manager: devnet.accounts.owner,
      });
      const updated = yield* getNameState.effect(devnet.configs.v1, { name });
      yield* deleteSubname.effect(devnet.configs.v1, { name });

      assert.strictEqual(created.finalState?.kind, "v1-wrapped");
      assert.strictEqual(updated.expiry, parent.expiry);
      assert.strictEqual(updated.manager, devnet.accounts.owner);
    }),
  );

  it.effect("creates and mutates a child in an existing ENSv2 subregistry", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = "phase15.ens.eth";
      const owner2Config = configFor(devnet, "v2", devnet.accounts.owner2);
      const parent = yield* getNameState.effect(devnet.configs.v2, { name: "ens.eth" });
      const expiry = (parent.expiry ?? devnet.fixtures.seededAt + 100_000n) - 10n;
      const created = yield* createSubname.effect(devnet.configs.v2, {
        name,
        owner: devnet.accounts.owner,
        resolver: devnet.deployments.v2.contracts.publicResolver,
        expiry,
      });
      yield* setSubnameExpiry.effect(devnet.configs.v2, {
        name,
        expiry: parent.expiry ?? expiry,
      });
      yield* setSubnameResolver.effect(devnet.configs.v2, {
        name,
        resolver: devnet.deployments.v2.contracts.publicResolver,
      });
      yield* setSubnameManager.effect(devnet.configs.v2, {
        name,
        manager: devnet.accounts.owner2,
      });
      yield* setSubnameManager.effect(owner2Config, { name, manager: devnet.accounts.owner });
      yield* deleteSubname.effect(devnet.configs.v2, { name });
      const deleted = yield* getNameState.effect(devnet.configs.v2, { name });

      assert.strictEqual(created.protocol, "v2");
      assert.isNull(created.createdRegistry);
      assert.strictEqual(created.finalState?.kind, "v2-native");
      assert.isNull(deleted.owner);
    }),
  );

  it.effect("deploys and attaches a missing ENSv2 subregistry before child registration", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = "phase15.v2-write-ready.eth";
      const created = yield* createSubname.effect(devnet.configs.v2, {
        name,
        owner: devnet.accounts.owner,
        resolver: devnet.deployments.v2.contracts.publicResolver,
      });
      yield* deleteSubname.effect(devnet.configs.v2, { name });

      assert.isNotNull(created.createdRegistry);
      assert.strictEqual(created.registry, created.createdRegistry);
      assert.strictEqual(created.write.status, "completed");
      assert.strictEqual(created.finalState?.kind, "v2-native");
    }),
  );

  it.effect("creates a subname with initial resolver records", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = "records.v1-write-ready.eth";
      const result = yield* setSubnameRecord.effect(devnet.configs.v1, {
        name,
        owner: devnet.accounts.owner,
        resolver: devnet.deployments.v1.contracts.publicResolver,
        ttl: 30n,
        records: [{ type: "text", key: "com.ensforge.phase15", value: "ready" }],
      });
      const text = yield* getText.effect(devnet.configs.v1, {
        name,
        key: "com.ensforge.phase15",
      });
      yield* deleteSubname.effect(devnet.configs.v1, { name });

      assert.isTrue(result.created);
      assert.strictEqual(result.finalState.manager, devnet.accounts.owner);
      assert.strictEqual(text?.value, "ready");
    }),
  );

  it.effect("inherits an ancestor resolver when the child has no resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = "inherited.v1-unwrapped.eth";
      yield* createSubname.effect(devnet.configs.v1, {
        name,
        owner: devnet.accounts.owner,
      });
      const resolver = yield* getResolverCapabilities.effect(devnet.configs.v1, { name });
      yield* deleteSubname.effect(devnet.configs.v1, { name });

      assert.strictEqual(resolver.address, devnet.deployments.v1.contracts.publicResolver);
      assert.isTrue(resolver.inherited);
    }),
  );

  it.effect("rejects callers without parent registration authority", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const operatorV1 = configFor(devnet, "v1", devnet.accounts.operator);
      const operatorV2 = configFor(devnet, "v2", devnet.accounts.operator);
      const [v1Error, v2Error] = yield* Effect.all(
        [
          createSubname
            .effect(operatorV1, {
              name: "unauthorized.v1-write-ready.eth",
              owner: devnet.accounts.operator,
            })
            .pipe(Effect.flip),
          createSubname
            .effect(operatorV2, {
              name: "unauthorized.ens.eth",
              owner: devnet.accounts.operator,
            })
            .pipe(Effect.flip),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.isDefined(v1Error);
      assert.isDefined(v2Error);
    }),
  );

  it.effect("rejects non-subnames and unsupported unwrapped V1 expiry", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const invalid = yield* createSubname
        .effect(devnet.configs.v1, {
          name: devnet.fixtures.v1.activeUnwrapped.name,
          owner: devnet.accounts.owner,
        })
        .pipe(Effect.flip);
      const expiry = yield* setSubnameExpiry
        .effect(devnet.configs.v1, {
          name: devnet.fixtures.v1.unwrappedSubname.name,
          expiry: devnet.fixtures.seededAt + 100n,
        })
        .pipe(Effect.flip);

      assert.instanceOf(invalid, NameError);
      assert.instanceOf(expiry, AuthorizationError);
    }),
  );
});
