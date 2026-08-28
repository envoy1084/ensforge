import { describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { expect } from "vitest";

import { getInterface } from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

describe("interface resolution integration", () => {
  it.effect("resolves an interface implementer through the v1 Universal Resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v1;
      const result = yield* getInterface.effect(devnet.configs.v1, {
        name: fixture.name,
        interfaceId: fixture.interface.id,
      });

      expect(result).toEqual({
        interfaceId: fixture.interface.id,
        implementer: fixture.interface.implementer,
      });
    }),
  );

  it.effect("resolves migrated v2 and RESERVED v1 interfaces through the v2 resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const migratedFixture = devnet.fixtures.records.v2;
      const reservedFixture = devnet.fixtures.records.reserved;
      const [migrated, reserved] = yield* Effect.all([
        getInterface.effect(devnet.configs.v2, {
          name: migratedFixture.name,
          interfaceId: migratedFixture.interface.id,
        }),
        getInterface.effect(devnet.configs.v2, {
          name: reservedFixture.name,
          interfaceId: reservedFixture.interface.id,
        }),
      ]);

      expect(migrated.implementer).toBe(migratedFixture.interface.implementer);
      expect(reserved.implementer).toBe(reservedFixture.interface.implementer);
    }),
  );

  it.effect("returns null when the requested interface is unsupported", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* getInterface.effect(devnet.configs.v2, {
        name: devnet.fixtures.records.v2.name,
        interfaceId: "0xffffffff",
      });

      expect(result).toEqual({ interfaceId: "0xffffffff", implementer: null });
    }),
  );

  it.effect("returns null when the name has no resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* getInterface.effect(devnet.configs.v2, {
        name: devnet.fixtures.v2.noResolver.name,
        interfaceId: "0x01ffc9a7",
      });

      expect(result).toEqual({ interfaceId: "0x01ffc9a7", implementer: null });
    }),
  );

  it.effect("rejects malformed interface IDs", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const error = yield* Effect.flip(
        getInterface.effect(devnet.configs.v2, {
          name: devnet.fixtures.records.v2.name,
          interfaceId: "0x1234",
        }),
      );

      expect(error).toMatchObject({ _tag: "CodecError", code: "INVALID_INTERFACE_ID" });
    }),
  );
});
