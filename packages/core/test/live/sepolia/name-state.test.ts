import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  getCanonicalResource,
  getExpiry,
  getManager,
  getNameState,
  getNameStatus,
  getOwner,
  getProtocol,
  getRegistrant,
  getRegistry,
  getResolver,
  getTokenId,
  isAvailable,
  isMigrated,
  isRenewable,
  isReserved,
  isWrapped,
  readBatch,
} from "../../../src/index.js";
import {
  missingSepoliaName,
  sepoliaConfig,
  sepoliaFixtureAccounts,
  sepoliaNames,
} from "../setup/sepolia.js";

describe("Sepolia V1 and V2 name state", () => {
  it.effect("keeps native V2 composed and focused reads consistent", () =>
    Effect.gen(function* () {
      const parameters = { name: sepoliaNames.v2.profile };
      const state = yield* getNameState.effect(sepoliaConfig, parameters);
      const focused = yield* readBatch.effect(sepoliaConfig, {
        owner: getOwner.request(parameters),
        manager: getManager.request(parameters),
        registrant: getRegistrant.request(parameters),
        resolver: getResolver.request(parameters),
        expiry: getExpiry.request(parameters),
        status: getNameStatus.request(parameters),
        protocol: getProtocol.request(parameters),
        registry: getRegistry.request(parameters),
        resource: getCanonicalResource.request(parameters),
        tokenId: getTokenId.request(parameters),
        available: isAvailable.request(parameters),
        renewable: isRenewable.request(parameters),
        reserved: isReserved.request(parameters),
        wrapped: isWrapped.request(parameters),
        migrated: isMigrated.request(parameters),
      });

      assert.strictEqual(state.kind, "v2-native");
      assert.strictEqual(state.protocol, "v2");
      assert.strictEqual(state.status, "active");
      assert.strictEqual(focused.owner?.owner, state.owner);
      assert.strictEqual(focused.manager, state.manager);
      assert.isNull(focused.registrant);
      assert.strictEqual(focused.resolver, state.resolver);
      assert.strictEqual(focused.expiry?.expiry, state.expiry);
      assert.strictEqual(focused.status, state.status);
      assert.strictEqual(focused.protocol, state.protocol);
      assert.strictEqual(focused.registry, state.registry);
      assert.strictEqual(focused.resource, state.resource);
      assert.strictEqual(focused.tokenId, state.tokenId);
      assert.isFalse(focused.available);
      assert.isTrue(focused.renewable);
      assert.isFalse(focused.reserved);
      assert.isFalse(focused.wrapped);
      assert.isFalse(focused.migrated);
    }),
  );

  it.effect("routes an unmigrated reserved name through V1", () =>
    Effect.gen(function* () {
      const name = sepoliaNames.v1.reserved;
      const [state, owner, expiry, reserved, migrated, wrapped] = yield* Effect.all(
        [
          getNameState.effect(sepoliaConfig, { name }),
          getOwner.effect(sepoliaConfig, { name }),
          getExpiry.effect(sepoliaConfig, { name }),
          isReserved.effect(sepoliaConfig, { name }),
          isMigrated.effect(sepoliaConfig, { name }),
          isWrapped.effect(sepoliaConfig, { name }),
        ] as const,
        { concurrency: 3 },
      );

      assert.strictEqual(state.kind, "v2-reserved");
      assert.strictEqual(state.protocol, "v1");
      assert.strictEqual(state.status, "reserved");
      assert.strictEqual(owner?.protocol, "v1");
      assert.strictEqual(owner?.owner, state.owner);
      assert.strictEqual(expiry?.protocol, "v1");
      assert.strictEqual(expiry?.source, "baseRegistrar");
      assert.isTrue(reserved);
      assert.isFalse(migrated);
      assert.isTrue(wrapped);
    }),
  );

  it.effect("recognizes a migrated V2 name", () =>
    Effect.gen(function* () {
      const state = yield* getNameState.effect(sepoliaConfig, { name: sepoliaNames.migrated });

      assert.strictEqual(state.kind, "v2-migrated");
      assert.strictEqual(state.protocol, "v2");
      assert.strictEqual(state.status, "active");
      assert.isTrue(state.migrated);
      assert.isFalse(state.wrapped);
      assert.isNotNull(state.owner);
      assert.isNotNull(state.resolver);
    }),
  );

  it.effect("covers resolver inheritance, a bare name, nesting, and transferred ownership", () =>
    Effect.gen(function* () {
      const [rootResolver, inheritedResolver, bareResolver, nestedResource, transferred] =
        yield* Effect.all(
          [
            getResolver.effect(sepoliaConfig, { name: sepoliaNames.v2.root }),
            getResolver.effect(sepoliaConfig, { name: sepoliaNames.v2.inherited }),
            getResolver.effect(sepoliaConfig, { name: sepoliaNames.v2.bareRoot }),
            getCanonicalResource.effect(sepoliaConfig, { name: sepoliaNames.v2.nested }),
            getOwner.effect(sepoliaConfig, { name: sepoliaNames.v2.differentOwner }),
          ] as const,
          { concurrency: 3 },
        );

      assert.isNotNull(rootResolver);
      assert.strictEqual(inheritedResolver, rootResolver);
      assert.isNull(bareResolver);
      assert.isNotNull(nestedResource);
      assert.strictEqual(transferred?.owner, sepoliaFixtureAccounts.secondary);
    }),
  );

  it.effect("returns stable V2 availability semantics for an unknown name", () =>
    Effect.gen(function* () {
      const [state, owner, resolver, expiry] = yield* Effect.all(
        [
          getNameState.effect(sepoliaConfig, { name: missingSepoliaName }),
          getOwner.effect(sepoliaConfig, { name: missingSepoliaName }),
          getResolver.effect(sepoliaConfig, { name: missingSepoliaName }),
          getExpiry.effect(sepoliaConfig, { name: missingSepoliaName }),
        ] as const,
        { concurrency: 2 },
      );

      assert.strictEqual(state.kind, "available");
      assert.strictEqual(state.protocol, "v2");
      assert.isTrue(state.available);
      assert.isFalse(state.renewable);
      assert.isNull(owner);
      assert.isNull(resolver);
      assert.isNull(expiry);
    }),
  );
});
