import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  getAddress,
  getExpiry,
  getManager,
  getNameState,
  getOwner,
  getRegistrant,
  getResolver,
  isAvailable,
  isMigrated,
  isRenewable,
  isWrapped,
  readBatch,
} from "../../../src/index.js";
import { mainnetConfig, mainnetNames, missingMainnetName } from "../setup/mainnet.js";

describe("Mainnet name state", () => {
  it.effect("keeps composed and focused ENSv1 state reads consistent", () =>
    Effect.gen(function* () {
      const state = yield* getNameState.effect(mainnetConfig, { name: mainnetNames.standard });
      const focused = yield* readBatch.effect(mainnetConfig, {
        owner: getOwner.request({ name: mainnetNames.standard }),
        manager: getManager.request({ name: mainnetNames.standard }),
        registrant: getRegistrant.request({ name: mainnetNames.standard }),
        resolver: getResolver.request({ name: mainnetNames.standard }),
        expiry: getExpiry.request({ name: mainnetNames.standard }),
        available: isAvailable.request({ name: mainnetNames.standard }),
        renewable: isRenewable.request({ name: mainnetNames.standard }),
        wrapped: isWrapped.request({ name: mainnetNames.standard }),
        migrated: isMigrated.request({ name: mainnetNames.standard }),
      });

      assert.strictEqual(state.protocol, "v1");
      assert.strictEqual(state.status, "active");
      assert.isNotNull(focused.owner);
      assert.strictEqual(focused.owner?.owner, state.owner);
      assert.strictEqual(focused.manager, state.manager);
      assert.strictEqual(focused.registrant, state.registrant);
      assert.strictEqual(focused.resolver, state.resolver);
      if (focused.expiry === null) {
        return yield* Effect.die(new Error(`${mainnetNames.standard} has no registration expiry`));
      }
      assert.strictEqual(focused.expiry.expiry, state.expiry);
      assert.isTrue(focused.expiry.expiry > BigInt(Math.floor(Date.now() / 1_000)));
      assert.strictEqual(focused.available, state.available);
      assert.strictEqual(focused.renewable, state.renewable);
      assert.strictEqual(focused.wrapped, state.wrapped);
      assert.strictEqual(focused.migrated, state.migrated);
    }),
  );

  it.effect("returns stable empty semantics for an unregistered name", () =>
    Effect.gen(function* () {
      const [state, owner, resolver, address] = yield* Effect.all(
        [
          getNameState.effect(mainnetConfig, { name: missingMainnetName }),
          getOwner.effect(mainnetConfig, { name: missingMainnetName }),
          getResolver.effect(mainnetConfig, { name: missingMainnetName }),
          getAddress.effect(mainnetConfig, { name: missingMainnetName }),
        ] as const,
        { concurrency: 2 },
      );

      assert.strictEqual(state.kind, "available");
      assert.strictEqual(state.protocol, "v1");
      assert.isTrue(state.available);
      assert.isFalse(state.renewable);
      assert.isNull(owner);
      assert.strictEqual(resolver, state.resolver);
      assert.isNull(address.address);
      assert.isNull(address.raw);
    }),
  );
});
