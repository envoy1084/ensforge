import { describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { expect } from "vitest";

import { getOwner, getPrimaryName, readBatch } from "../../../src/index.js";
import { getIntegrationDevnet } from "../setup/devnet.js";

describe("primary name resolution integration", () => {
  it.effect("returns a forward-verified v1 primary name", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.reverse.verifiedV1;
      const result = yield* getPrimaryName.effect(devnet.configs.v1, {
        address: fixture.address,
      });

      expect(result).toEqual({ name: fixture.name, match: true });
    }),
  );

  it.effect("returns a forward-verified v2 primary name", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.reverse.verifiedV2;
      const result = yield* getPrimaryName.effect(devnet.configs.v2, {
        address: fixture.address,
      });

      expect(result).toEqual({ name: fixture.name, match: true });
    }),
  );

  it.effect("returns an automatically named and forward-verified contract", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.reverse.verifiedContract;
      const result = yield* getPrimaryName.effect(devnet.configs.v2, {
        address: fixture.address,
      });

      expect(result).toEqual({ name: fixture.name, match: true });
    }),
  );

  it.effect("rejects unverified and missing reverse records", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixtures = [devnet.fixtures.reverse.unverified, devnet.fixtures.reverse.missing];
      const results = yield* Effect.all(
        fixtures.map((fixture) =>
          getPrimaryName.effect(devnet.configs.v2, { address: fixture.address }),
        ),
        { concurrency: "unbounded" },
      );

      expect(results).toEqual([null, null]);
    }),
  );

  it.effect("rejects malformed Ethereum addresses", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const error = yield* Effect.flip(
        getPrimaryName.effect(devnet.configs.v2, { address: "0x1234" }),
      );

      expect(error).toMatchObject({ _tag: "CodecError", code: "INVALID_ADDRESS" });
    }),
  );

  it.effect("supports verified primary names inside semantic read batches", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.reverse.verifiedV2;
      if (fixture.name === undefined) {
        return yield* Effect.die(new Error("The verified reverse fixture has no name"));
      }
      const name = fixture.name;
      const result = yield* readBatch.effect(devnet.configs.v2, {
        owner: getOwner.request({ name }),
        primaryName: getPrimaryName.request({ address: fixture.address }),
      });

      expect(result.primaryName).toEqual({
        name,
        match: true,
      });
      expect(result.owner).not.toBeNull();
    }),
  );
});
