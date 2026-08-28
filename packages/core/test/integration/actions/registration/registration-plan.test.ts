import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { zeroHash } from "viem";

import { getRegistrationPlan } from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

const duration = 365n * 86_400n;

describe("registration plan integration", () => {
  it.effect("composes the V2 quote, parameters, commitment, and readiness", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* getRegistrationPlan.effect(devnet.configs.v2, {
        name: `${devnet.fixtures.registration.v2.label}.eth`,
        owner: devnet.accounts.owner,
        secret: devnet.fixtures.registration.v2.secret,
        duration,
        paymentToken: devnet.fixtures.registration.paymentTokens.usdc.address,
      });

      assert.include(["commitment-pending", "ready"], result.status);
      if (
        result.status === "commitment-pending" ||
        result.status === "ready" ||
        result.status === "commitment-required" ||
        result.status === "commitment-expired"
      ) {
        assert.strictEqual(result.parameters.protocol, "v2");
        assert.strictEqual(
          result.commitment.commitment,
          devnet.fixtures.registration.v2.commitment,
        );
        assert.strictEqual(result.price.status, "available");
      }
    }),
  );

  it.effect("reports unavailable and missing-payment prerequisites without failing", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const shared = {
        owner: devnet.accounts.owner,
        secret: devnet.fixtures.registration.v2.secret,
        duration,
      } as const;
      const [unavailable, missingPayment] = yield* Effect.all(
        [
          getRegistrationPlan.effect(devnet.configs.v2, {
            ...shared,
            name: devnet.fixtures.v2.active.name,
            paymentToken: devnet.fixtures.registration.paymentTokens.usdc.address,
          }),
          getRegistrationPlan.effect(devnet.configs.v2, {
            ...shared,
            name: devnet.fixtures.v2.available.name,
          }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.strictEqual(unavailable.status, "unavailable");
      assert.strictEqual(missingPayment.status, "payment-token-required");
    }),
  );

  it.effect("reports when a fresh commitment must be submitted", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* getRegistrationPlan.effect(devnet.configs.v2, {
        name: devnet.fixtures.v2.available.name,
        owner: devnet.accounts.owner,
        secret: zeroHash,
        duration,
        paymentToken: devnet.fixtures.registration.paymentTokens.usdc.address,
      });

      assert.strictEqual(result.status, "commitment-required");
      if (result.status === "commitment-required") {
        assert.strictEqual(result.commitmentStatus.status, "not-found");
      }
    }),
  );
});
