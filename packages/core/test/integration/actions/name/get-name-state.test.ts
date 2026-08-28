import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { labelhash, namehash } from "viem";

import {
  getCanonicalResource,
  getManager,
  getNameState,
  getNameStatus,
  getProtocol,
  getRegistrant,
  getRegistry,
  getTokenId,
  isAvailable,
  isMigrated,
  isRenewable,
  isReserved,
  isWrapped,
  readBatch,
} from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

describe("name state integration", () => {
  it.effect("describes active unwrapped ENS v1 registrations", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.v1.activeUnwrapped;
      const state = yield* getNameState.effect(devnet.configs.v1, { name: fixture.name });

      assert.strictEqual(state.kind, "v1-unwrapped");
      assert.strictEqual(state.protocol, "v1");
      assert.strictEqual(state.status, "active");
      assert.strictEqual(state.owner, fixture.owner);
      assert.strictEqual(state.manager, fixture.owner);
      assert.strictEqual(state.registrant, fixture.owner);
      assert.strictEqual(state.registry, devnet.deployments.v1.contracts.registry);
      assert.strictEqual(state.tokenId, BigInt(labelhash("v1-unwrapped")));
      assert.isNull(state.resource);
      assert.isFalse(state.wrapped);
      assert.isFalse(state.migrated);
      assert.isFalse(state.available);
      assert.isTrue(state.renewable);
    }),
  );

  it.effect("describes wrapped ENS v1 names and wrapper token ownership", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.v1.activeWrapped;
      const state = yield* getNameState.effect(devnet.configs.v1, { name: fixture.name });

      assert.strictEqual(state.kind, "v1-wrapped");
      assert.strictEqual(state.owner, fixture.owner);
      assert.strictEqual(state.manager, fixture.owner);
      assert.strictEqual(state.registrant, devnet.deployments.v1.contracts.nameWrapper);
      assert.strictEqual(state.tokenId, BigInt(namehash(fixture.name)));
      assert.isTrue(state.wrapped);
      assert.isTrue(state.renewable);
    }),
  );

  it.effect("classifies ENS v1 availability and lifecycle boundaries", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [available, grace, expired] = yield* Effect.all(
        [
          getNameState.effect(devnet.configs.v1, { name: devnet.fixtures.v1.available.name }),
          getNameState.effect(devnet.configs.v1, { name: devnet.fixtures.v1.grace.name }),
          getNameState.effect(devnet.configs.v1, { name: devnet.fixtures.v1.expired.name }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.strictEqual(available.kind, "available");
      assert.strictEqual(available.status, "available");
      assert.isTrue(available.available);
      assert.isFalse(available.renewable);
      assert.strictEqual(grace.status, "grace");
      assert.isFalse(grace.available);
      assert.isTrue(grace.renewable);
      assert.strictEqual(expired.status, "expired");
      assert.isTrue(expired.available);
      assert.isFalse(expired.renewable);
      assert.strictEqual(expired.owner, devnet.fixtures.v1.expired.owner);
    }),
  );

  it.effect("describes native ENS v2 registry identity", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.v2.active;
      const state = yield* getNameState.effect(devnet.configs.v2, { name: fixture.name });

      assert.strictEqual(state.kind, "v2-native");
      assert.strictEqual(state.protocol, "v2");
      assert.strictEqual(state.status, "active");
      assert.strictEqual(state.owner, fixture.owner);
      assert.strictEqual(state.manager, fixture.owner);
      assert.isNull(state.registrant);
      assert.strictEqual(state.registry, devnet.deployments.v2.contracts.ethRegistry);
      assert.isNotNull(state.tokenId);
      assert.isNotNull(state.resource);
      assert.isFalse(state.wrapped);
      assert.isFalse(state.migrated);
      assert.isFalse(state.available);
      assert.isTrue(state.renewable);
    }),
  );

  it.effect("distinguishes unlocked and locked ENS v2 migrations", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [unlocked, locked] = yield* Effect.all(
        [
          getNameState.effect(devnet.configs.v2, {
            name: devnet.fixtures.migration.migratedUnlocked.name,
          }),
          getNameState.effect(devnet.configs.v2, {
            name: devnet.fixtures.migration.migratedLocked.name,
          }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.strictEqual(unlocked.kind, "v2-migrated");
      assert.isTrue(unlocked.migrated);
      assert.isFalse(unlocked.wrapped);
      assert.strictEqual(locked.kind, "v2-migrated");
      assert.isTrue(locked.migrated);
      assert.isTrue(locked.wrapped);
    }),
  );

  it.effect("keeps RESERVED names on their ENS v1 ownership route", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.migration.reservedWrapped;
      const [state, reserved, protocol] = yield* Effect.all(
        [
          getNameState.effect(devnet.configs.v2, { name: fixture.name }),
          isReserved.effect(devnet.configs.v2, { name: fixture.name }),
          getProtocol.effect(devnet.configs.v2, { name: fixture.name }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.strictEqual(state.kind, "v2-reserved");
      assert.strictEqual(state.protocol, "v1");
      assert.strictEqual(state.status, "reserved");
      assert.strictEqual(state.owner, fixture.owner);
      assert.strictEqual(state.registry, devnet.deployments.v1.contracts.registry);
      assert.isTrue(state.wrapped);
      assert.isFalse(state.migrated);
      assert.isFalse(state.available);
      assert.isTrue(state.renewable);
      assert.isNotNull(state.resource);
      assert.strictEqual(state.tokenId, BigInt(namehash(fixture.name)));
      assert.isTrue(reserved);
      assert.strictEqual(protocol, "v1");
    }),
  );

  it.effect("classifies native ENS v2 available, grace, and expired states", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [available, grace, expired] = yield* Effect.all(
        [
          getNameState.effect(devnet.configs.v2, { name: devnet.fixtures.v2.available.name }),
          getNameState.effect(devnet.configs.v2, { name: devnet.fixtures.v2.grace.name }),
          getNameState.effect(devnet.configs.v2, { name: devnet.fixtures.v2.expired.name }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.strictEqual(available.kind, "available");
      assert.strictEqual(available.status, "available");
      assert.isTrue(available.available);
      assert.strictEqual(grace.status, "grace");
      assert.isTrue(grace.renewable);
      assert.isFalse(grace.available);
      assert.strictEqual(expired.status, "expired");
      assert.isFalse(expired.renewable);
      assert.isTrue(expired.available);
    }),
  );

  it.effect("exposes every focused state action through typed batch requests", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.migration.migratedLocked;
      const parameters = { name: fixture.name };
      const result = yield* readBatch.effect(devnet.configs.v2, {
        manager: getManager.request(parameters),
        registrant: getRegistrant.request(parameters),
        status: getNameStatus.request(parameters),
        protocol: getProtocol.request(parameters),
        registry: getRegistry.request(parameters),
        resource: getCanonicalResource.request(parameters),
        tokenId: getTokenId.request(parameters),
        wrapped: isWrapped.request(parameters),
        migrated: isMigrated.request(parameters),
        available: isAvailable.request(parameters),
        renewable: isRenewable.request(parameters),
        reserved: isReserved.request(parameters),
      });

      assert.strictEqual(result.manager, fixture.owner);
      assert.isNull(result.registrant);
      assert.strictEqual(result.status, "active");
      assert.strictEqual(result.protocol, "v2");
      assert.strictEqual(result.registry, devnet.deployments.v2.contracts.ethRegistry);
      assert.isNotNull(result.resource);
      assert.isNotNull(result.tokenId);
      assert.isTrue(result.wrapped);
      assert.isTrue(result.migrated);
      assert.isFalse(result.available);
      assert.isTrue(result.renewable);
      assert.isFalse(result.reserved);
    }),
  );
});
