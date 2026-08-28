import { describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { expect } from "vitest";

import { getPubkey } from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

describe("public key resolution integration", () => {
  it.effect("resolves a public key through the v1 Universal Resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v1;
      const result = yield* getPubkey.effect(devnet.configs.v1, { name: fixture.name });

      expect(result).toEqual(fixture.pubkey);
    }),
  );

  it.effect("resolves migrated v2 and RESERVED v1 public keys through the v2 resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [migrated, reserved] = yield* Effect.all([
        getPubkey.effect(devnet.configs.v2, { name: devnet.fixtures.records.v2.name }),
        getPubkey.effect(devnet.configs.v2, { name: devnet.fixtures.records.reserved.name }),
      ]);

      expect(migrated).toEqual(devnet.fixtures.records.v2.pubkey);
      expect(reserved).toEqual(devnet.fixtures.records.reserved.pubkey);
    }),
  );

  it.effect("returns null when the public key is unset", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* getPubkey.effect(devnet.configs.v2, {
        name: devnet.fixtures.v2.active.name,
      });

      expect(result).toBeNull();
    }),
  );

  it.effect("returns null when the name has no resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* getPubkey.effect(devnet.configs.v2, {
        name: devnet.fixtures.v2.noResolver.name,
      });

      expect(result).toBeNull();
    }),
  );
});
