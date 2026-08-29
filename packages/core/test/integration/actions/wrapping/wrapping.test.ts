import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { nameWrapperFuses } from "@ensforge/contracts/v1";
import { createPublicClient, createWalletClient, defineChain, http } from "viem";

import {
  AuthorizationError,
  createSubname,
  extendSubnameExpiry,
  getFuses,
  getNameState,
  getWrapperExpiry,
  setChildFuses,
  setFuses,
  setResolver,
  unwrapName,
  wrapName,
} from "../../../../src/index.js";
import { createTestConfig } from "../../../../src/testing/index.js";
import { getIntegrationDevnet, type IntegrationDevnet } from "../../setup/devnet.js";

const configFor = (devnet: IntegrationDevnet, account: `0x${string}`) => {
  const chain = defineChain({
    id: 31_337,
    name: "ensforge integration devnet",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
    rpcUrls: { default: { http: [devnet.rpcUrl] } },
    contracts: { multicall3: { address: devnet.deployments.multicall3, blockCreated: 0 } },
  });
  const transport = http(devnet.rpcUrl, { retryCount: 0, timeout: 10_000 });
  return createTestConfig({
    deployments: Object.freeze({ protocol: "v1", v1: devnet.deployments.v1 }),
    publicClient: createPublicClient({ chain, transport }),
    walletClient: createWalletClient({ account, chain, transport }),
  });
};

describe("Name Wrapper integration", () => {
  it.effect("reads V1 wrapper data and reports typed V2 unsupported results", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [fuses, expiry, v2Fuses, v2Expiry] = yield* Effect.all(
        [
          getFuses.effect(devnet.configs.v1, { name: devnet.fixtures.v1.activeWrapped.name }),
          getWrapperExpiry.effect(devnet.configs.v1, {
            name: devnet.fixtures.v1.activeWrapped.name,
          }),
          getFuses.effect(devnet.configs.v2, { name: devnet.fixtures.v2.active.name }),
          getWrapperExpiry.effect(devnet.configs.v2, { name: devnet.fixtures.v2.active.name }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.isTrue(fuses.supported && fuses.wrapped);
      assert.isTrue(expiry.supported && expiry.expiry !== null);
      assert.deepEqual(v2Fuses, {
        protocol: "v2",
        supported: false,
        reason: "FUSES_NOT_SUPPORTED",
      });
      assert.deepEqual(v2Expiry, {
        protocol: "v2",
        supported: false,
        reason: "WRAPPER_EXPIRY_NOT_SUPPORTED",
      });
    }),
  );

  it.effect("wraps and unwraps a .eth 2LD with explicit destinations", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.v1.noResolver.name;
      const wrapped = yield* wrapName.effect(devnet.configs.v1, {
        name,
        owner: devnet.accounts.owner,
        resolver: devnet.deployments.v1.contracts.publicResolver,
      });
      const wrappedState = yield* getNameState.effect(devnet.configs.v1, { name });
      yield* unwrapName.effect(devnet.configs.v1, {
        name,
        registrant: devnet.accounts.owner,
        manager: devnet.accounts.owner,
      });
      yield* setResolver.effect(devnet.configs.v1, {
        name,
        resolver: "0x0000000000000000000000000000000000000000",
      });
      const unwrappedState = yield* getNameState.effect(devnet.configs.v1, { name });

      assert.strictEqual(wrapped.strategy, "eth-2ld");
      assert.strictEqual(wrappedState.kind, "v1-wrapped");
      assert.strictEqual(unwrappedState.kind, "v1-unwrapped");
      assert.strictEqual(unwrappedState.registrant, devnet.accounts.owner);
      assert.strictEqual(unwrappedState.manager, devnet.accounts.owner);
    }),
  );

  it.effect("wraps and unwraps a registry subname", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const config = configFor(devnet, devnet.accounts.owner2);
      const name = devnet.fixtures.v1.unwrappedSubname.name;
      const wrapped = yield* wrapName.effect(config, {
        name,
        owner: devnet.accounts.owner2,
        resolver: devnet.deployments.v1.contracts.publicResolver,
      });
      assert.strictEqual(
        wrapped.write.status,
        "completed",
        wrapped.write.failure?.message ?? "wrapName did not complete",
      );
      assert.strictEqual(wrapped.finalState?.kind, "v1-wrapped");
      yield* unwrapName.effect(config, { name, manager: devnet.accounts.owner2 });
      const restored = yield* getNameState.effect(config, { name });

      assert.strictEqual(wrapped.strategy, "registry");
      assert.strictEqual(restored.kind, "v1-unwrapped");
      assert.strictEqual(restored.manager, devnet.accounts.owner2);
    }),
  );

  it.effect("burns parent and child fuses and extends an emancipated child's expiry", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const parentName = devnet.fixtures.v1.wrapperLifecycle.name;
      const childName = `phase16.${parentName}`;
      const wrappedParent = yield* wrapName.effect(devnet.configs.v1, {
        name: parentName,
        owner: devnet.accounts.owner,
        fuses: ["cannotUnwrap"],
      });
      const parentExpiry = wrappedParent.finalState?.expiry ?? 0n;
      yield* setFuses.effect(devnet.configs.v1, {
        name: parentName,
        fuses: ["cannotTransfer"],
      });
      yield* createSubname.effect(devnet.configs.v1, {
        name: childName,
        owner: devnet.accounts.owner,
        expiry: parentExpiry - 100n,
      });
      yield* setChildFuses.effect(devnet.configs.v1, {
        name: childName,
        fuses: ["parentCannotControl", "canExtendExpiry"],
        expiry: parentExpiry - 50n,
      });
      yield* extendSubnameExpiry.effect(devnet.configs.v1, {
        name: childName,
        expiry: parentExpiry,
      });
      const [parentFuses, childFuses, childExpiry] = yield* Effect.all(
        [
          getFuses.effect(devnet.configs.v1, { name: parentName }),
          getFuses.effect(devnet.configs.v1, { name: childName }),
          getWrapperExpiry.effect(devnet.configs.v1, { name: childName }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.isTrue(
        parentFuses.supported && (parentFuses.value & nameWrapperFuses.cannotTransfer) !== 0,
      );
      assert.isTrue(
        childFuses.supported &&
          childFuses.active.includes("parentCannotControl") &&
          childFuses.active.includes("canExtendExpiry"),
      );
      assert.isTrue(childExpiry.supported && childExpiry.expiry === parentExpiry);
    }),
  );

  it.effect("rejects irreversible, unauthorized, and protocol-incompatible operations", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const owner2Config = configFor(devnet, devnet.accounts.owner2);
      const unauthorized = yield* setFuses
        .effect(owner2Config, {
          name: devnet.fixtures.v1.activeWrapped.name,
          fuses: ["cannotTransfer"],
        })
        .pipe(Effect.flip);
      const v2 = yield* setFuses
        .effect(devnet.configs.v2, {
          name: devnet.fixtures.v2.active.name,
          fuses: ["cannotTransfer"],
        })
        .pipe(Effect.flip);

      assert.instanceOf(unauthorized, AuthorizationError);
      assert.strictEqual(unauthorized.code, "UNAUTHORIZED");
      assert.instanceOf(v2, AuthorizationError);
      assert.strictEqual(v2.code, "WRITE_TARGET_UNAVAILABLE");
    }),
  );
});
