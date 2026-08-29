import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { createPublicClient, createWalletClient, defineChain, http } from "viem";

import {
  AuthorizationError,
  CodecError,
  getManager,
  getRegistrant,
  getRequiredAuthorization,
  getTtl,
  reclaimName,
  setManager,
  setTtl,
  transferName,
  transferRegistrant,
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

describe("ownership writes integration", () => {
  it.effect("reads and updates V1 TTL through registry and wrapper routes", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const unwrapped = devnet.fixtures.v1.writeReady.name;
      const wrapped = devnet.fixtures.v1.activeWrapped.name;

      yield* setTtl.effect(devnet.configs.v1, { name: unwrapped, ttl: 120n });
      yield* setTtl.effect(devnet.configs.v1, { name: wrapped, ttl: 240n });
      const [unwrappedTtl, wrappedTtl, v2Ttl] = yield* Effect.all(
        [
          getTtl.effect(devnet.configs.v1, { name: unwrapped }),
          getTtl.effect(devnet.configs.v1, { name: wrapped }),
          getTtl.effect(devnet.configs.v2, { name: devnet.fixtures.v2.active.name }),
        ] as const,
        { concurrency: "unbounded" },
      );
      yield* setTtl.effect(devnet.configs.v1, { name: unwrapped, ttl: 0n });
      yield* setTtl.effect(devnet.configs.v1, { name: wrapped, ttl: 0n });

      assert.isTrue(unwrappedTtl.supported && unwrappedTtl.ttl === 120n);
      assert.isTrue(wrappedTtl.supported && wrappedTtl.ttl === 240n);
      assert.deepEqual(v2Ttl, {
        supported: false,
        protocol: "v2",
        reason: "TTL_UNSUPPORTED",
      });
    }),
  );

  it.effect("keeps V1 manager and registrant mutations independent", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.v1.writeReady.name;
      const owner2Config = configFor(devnet, "v1", devnet.accounts.owner2);

      yield* setManager.effect(devnet.configs.v1, { name, manager: devnet.accounts.owner2 });
      const afterManager = yield* Effect.all({
        manager: getManager.effect(devnet.configs.v1, { name }),
        registrant: getRegistrant.effect(devnet.configs.v1, { name }),
      });
      yield* reclaimName.effect(devnet.configs.v1, { name, manager: devnet.accounts.owner });
      yield* transferRegistrant.effect(devnet.configs.v1, { name, to: devnet.accounts.owner2 });
      const afterRegistrant = yield* Effect.all({
        manager: getManager.effect(devnet.configs.v1, { name }),
        registrant: getRegistrant.effect(devnet.configs.v1, { name }),
      });
      yield* reclaimName.effect(owner2Config, { name, manager: devnet.accounts.owner });
      yield* transferRegistrant.effect(owner2Config, { name, to: devnet.accounts.owner });

      assert.strictEqual(afterManager.manager, devnet.accounts.owner2);
      assert.strictEqual(afterManager.registrant, devnet.accounts.owner);
      assert.strictEqual(afterRegistrant.manager, devnet.accounts.owner);
      assert.strictEqual(afterRegistrant.registrant, devnet.accounts.owner2);
    }),
  );

  it.effect("transfers complete V1 unwrapped and wrapped ownership and restores it", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const owner2Config = configFor(devnet, "v1", devnet.accounts.owner2);
      const unwrapped = devnet.fixtures.v1.noResolver.name;
      const wrapped = devnet.fixtures.v1.activeWrapped.name;

      const unwrappedTransfer = yield* transferName.effect(devnet.configs.v1, {
        name: unwrapped,
        to: devnet.accounts.owner2,
        mode: "sequential",
      });
      const wrappedTransfer = yield* transferName.effect(devnet.configs.v1, {
        name: wrapped,
        to: devnet.accounts.owner2,
      });
      yield* transferName.effect(owner2Config, { name: unwrapped, to: devnet.accounts.owner });
      yield* transferName.effect(owner2Config, { name: wrapped, to: devnet.accounts.owner });

      assert.strictEqual(unwrappedTransfer.strategy, "registrar-and-manager");
      assert.strictEqual(unwrappedTransfer.write.status, "completed");
      assert.strictEqual(unwrappedTransfer.finalState?.manager, devnet.accounts.owner2);
      assert.strictEqual(unwrappedTransfer.finalState?.registrant, devnet.accounts.owner2);
      assert.strictEqual(wrappedTransfer.strategy, "name-wrapper");
      assert.strictEqual(wrappedTransfer.finalState?.owner, devnet.accounts.owner2);
    }),
  );

  it.effect("transfers native and migrated ENSv2 tokens with transfer-role checks", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const owner2Config = configFor(devnet, "v2", devnet.accounts.owner2);
      const native = devnet.fixtures.v2.noResolver.name;
      const migrated = devnet.fixtures.migration.migratedUnlocked.name;
      const migratedWrapped = devnet.fixtures.migration.migratedLocked.name;

      const authorization = yield* getRequiredAuthorization.effect(devnet.configs.v2, {
        name: native,
        account: devnet.accounts.owner,
        operation: { type: "transfer" },
      });
      const nativeTransfer = yield* transferName.effect(devnet.configs.v2, {
        name: native,
        to: devnet.accounts.owner2,
      });
      const migratedTransfer = yield* transferName.effect(devnet.configs.v2, {
        name: migrated,
        to: devnet.accounts.owner2,
      });
      const migratedWrappedTransfer = yield* transferName.effect(devnet.configs.v2, {
        name: migratedWrapped,
        to: devnet.accounts.owner2,
      });
      yield* transferName.effect(owner2Config, { name: native, to: devnet.accounts.owner });
      yield* transferName.effect(owner2Config, { name: migrated, to: devnet.accounts.owner });
      yield* transferName.effect(owner2Config, {
        name: migratedWrapped,
        to: devnet.accounts.owner,
      });

      assert.strictEqual(authorization.authorization.status, "authorized");
      assert.deepEqual(authorization.blockers, []);
      assert.strictEqual(nativeTransfer.strategy, "v2-registry");
      assert.strictEqual(nativeTransfer.finalState?.owner, devnet.accounts.owner2);
      assert.strictEqual(migratedTransfer.strategy, "v2-registry");
      assert.strictEqual(migratedTransfer.finalState?.kind, "v2-migrated");
      assert.strictEqual(migratedTransfer.finalState?.owner, devnet.accounts.owner2);
      assert.strictEqual(migratedWrappedTransfer.strategy, "v2-registry");
      assert.strictEqual(migratedWrappedTransfer.finalState?.kind, "v2-migrated");
      assert.strictEqual(migratedWrappedTransfer.finalState?.owner, devnet.accounts.owner2);
    }),
  );

  it.effect("routes RESERVED transfers through their current V1 topology", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const owner2Config = configFor(devnet, "v2", devnet.accounts.owner2);
      const unwrapped = devnet.fixtures.migration.reservedUnwrapped.name;
      const wrapped = devnet.fixtures.migration.reservedWrapped.name;

      const first = yield* transferName.effect(devnet.configs.v2, {
        name: unwrapped,
        to: devnet.accounts.owner2,
        mode: "sequential",
      });
      const second = yield* transferName.effect(devnet.configs.v2, {
        name: wrapped,
        to: devnet.accounts.owner2,
      });
      yield* transferName.effect(owner2Config, { name: unwrapped, to: devnet.accounts.owner });
      yield* transferName.effect(owner2Config, { name: wrapped, to: devnet.accounts.owner });

      assert.strictEqual(first.protocol, "v1");
      assert.strictEqual(first.strategy, "registrar-and-manager");
      assert.strictEqual(first.finalState?.kind, "v2-reserved");
      assert.strictEqual(second.protocol, "v1");
      assert.strictEqual(second.strategy, "name-wrapper");
      assert.strictEqual(second.finalState?.kind, "v2-reserved");
    }),
  );

  it.effect("rejects unavailable ownership targets and unsafe recipients", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [registrarOperator, wrapperOperator, v2Operator] = yield* Effect.all(
        [
          getRequiredAuthorization.effect(devnet.configs.v1, {
            name: devnet.fixtures.v1.activeUnwrapped.name,
            account: devnet.accounts.operator,
            operation: { type: "transfer" },
          }),
          getRequiredAuthorization.effect(devnet.configs.v1, {
            name: devnet.fixtures.v1.activeWrapped.name,
            account: devnet.accounts.operator,
            operation: { type: "transfer" },
          }),
          getRequiredAuthorization.effect(devnet.configs.v2, {
            name: devnet.fixtures.v2.active.name,
            account: devnet.accounts.operator,
            operation: { type: "transfer" },
          }),
        ] as const,
        { concurrency: "unbounded" },
      );
      const wrappedManager = yield* setManager
        .effect(devnet.configs.v1, {
          name: devnet.fixtures.v1.activeWrapped.name,
          manager: devnet.accounts.owner2,
        })
        .pipe(Effect.flip);
      const zeroRecipient = yield* transferName
        .effect(devnet.configs.v1, {
          name: devnet.fixtures.v1.activeUnwrapped.name,
          to: "0x0000000000000000000000000000000000000000",
        })
        .pipe(Effect.flip);
      const partial = yield* transferName.effect(devnet.configs.v1, {
        name: devnet.fixtures.v1.recordWrites.name,
        to: devnet.deployments.v1.contracts.registry,
        mode: "sequential",
      });
      yield* reclaimName.effect(devnet.configs.v1, {
        name: devnet.fixtures.v1.recordWrites.name,
        manager: devnet.accounts.owner,
      });

      assert.strictEqual(registrarOperator.authorization.status, "authorized");
      assert.strictEqual(wrapperOperator.authorization.status, "authorized");
      assert.strictEqual(v2Operator.authorization.status, "authorized");
      assert.instanceOf(wrappedManager, AuthorizationError);
      assert.strictEqual(wrappedManager.code, "WRITE_TARGET_UNAVAILABLE");
      assert.instanceOf(zeroRecipient, CodecError);
      assert.strictEqual(partial.write.status, "partial");
      assert.isNull(partial.finalState);
      assert.strictEqual(partial.write.completedStages[0]?.result.calls[0]?.status, "confirmed");
      assert.strictEqual(partial.write.completedStages[0]?.result.calls[1]?.status, "not-started");
    }),
  );
});
