import { describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { expect } from "vitest";

import { getName, getOwner, readBatch } from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

describe("name record resolution integration", () => {
  it.effect("resolves a name record through the v1 Universal Resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v1;
      const result = yield* getName.effect(devnet.configs.v1, { name: fixture.name });

      expect(result).toEqual({ name: fixture.primaryName });
    }),
  );

  it.effect("resolves migrated v2 and RESERVED v1 name records through the v2 resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [migrated, reserved] = yield* Effect.all(
        [
          getName.effect(devnet.configs.v2, { name: devnet.fixtures.records.v2.name }),
          getName.effect(devnet.configs.v2, { name: devnet.fixtures.records.reserved.name }),
        ],
        { concurrency: "unbounded" },
      );

      expect(migrated).toEqual({ name: devnet.fixtures.records.v2.primaryName });
      expect(reserved).toEqual({ name: devnet.fixtures.records.reserved.primaryName });
    }),
  );

  it.effect("returns null for unset records and names without a resolver", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [unset, noResolver] = yield* Effect.all(
        [
          getName.effect(devnet.configs.v2, { name: devnet.fixtures.v2.active.name }),
          getName.effect(devnet.configs.v2, { name: devnet.fixtures.v2.noResolver.name }),
        ],
        { concurrency: "unbounded" },
      );

      expect(unset).toEqual({ name: null });
      expect(noResolver).toEqual({ name: null });
    }),
  );

  it.effect("supports name records inside semantic read batches", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v2;
      const result = yield* readBatch.effect(devnet.configs.v2, {
        name: getName.request({ name: fixture.name }),
        owner: getOwner.request({ name: fixture.name }),
      });

      expect(result.name).toEqual({ name: fixture.primaryName });
      expect(result.owner).not.toBeNull();
    }),
  );
});
