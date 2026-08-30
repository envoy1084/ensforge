import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { getAddress, getExpiry, getOwner, getResolver, readBatch } from "../../../src/index.js";
import { mainnetConfig, mainnetNames } from "../setup/mainnet.js";

describe("Mainnet semantic batching", () => {
  it.effect("matches individual standard-name reads", () =>
    Effect.gen(function* () {
      const individual = yield* Effect.all(
        {
          owner: getOwner.effect(mainnetConfig, { name: mainnetNames.standard }),
          resolver: getResolver.effect(mainnetConfig, { name: mainnetNames.standard }),
          address: getAddress.effect(mainnetConfig, { name: mainnetNames.standard }),
          expiry: getExpiry.effect(mainnetConfig, { name: mainnetNames.standard }),
        },
        { concurrency: 2 },
      );
      const batched = yield* readBatch.effect(mainnetConfig, {
        owner: getOwner.request({ name: mainnetNames.standard }),
        resolver: getResolver.request({ name: mainnetNames.standard }),
        address: getAddress.request({ name: mainnetNames.standard }),
        expiry: getExpiry.request({ name: mainnetNames.standard }),
      });

      assert.deepStrictEqual(batched, individual);
    }),
  );

  it.effect("mixes onchain and CCIP-Read resolution in one batch", () =>
    Effect.gen(function* () {
      const result = yield* readBatch.effect(mainnetConfig, {
        universalResolver: getAddress.request({ name: mainnetNames.universalResolver }),
        ccipRead: getAddress.request({ name: mainnetNames.ccipRead }),
        owner: getOwner.request({ name: mainnetNames.standard }),
        resolver: getResolver.request({ name: mainnetNames.standard }),
      });

      assert.strictEqual(
        result.universalResolver.address,
        "0x2222222222222222222222222222222222222222",
      );
      assert.strictEqual(result.ccipRead.address, "0x779981590E7Ccc0CFAe8040Ce7151324747cDb97");
      assert.isNotNull(result.owner);
      assert.isNotNull(result.resolver);
    }),
  );
});
