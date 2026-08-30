import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { sepoliaV2Deployment } from "@ensforge/contracts/deployments";

import {
  getOwner,
  getRegistrationParameters,
  getRegistrationPlan,
  getRegistrationPrice,
  getRenewalPrice,
  isPaymentTokenSupported,
} from "../../../src/index.js";
import { sepoliaConfig, sepoliaNames } from "../setup/sepolia.js";

const duration = 365n * 86_400n;
const smokeSecret = `0x${"42".repeat(32)}` as const;

describe("Sepolia V2 registration and transition renewal reads", () => {
  it.effect("reads V2 registrar parameters and supported payment metadata", () =>
    Effect.gen(function* () {
      const [parameters, supported, unsupported] = yield* Effect.all(
        [
          getRegistrationParameters.effect(sepoliaConfig, {}),
          isPaymentTokenSupported.effect(sepoliaConfig, {
            paymentToken: sepoliaV2Deployment.testTokens.usdc,
          }),
          isPaymentTokenSupported.effect(sepoliaConfig, {
            paymentToken: "0x000000000000000000000000000000000000dEaD",
          }),
        ] as const,
        { concurrency: 3 },
      );

      assert.strictEqual(parameters.protocol, "v2");
      assert.strictEqual(parameters.registrar, sepoliaV2Deployment.contracts.ethRegistrar);
      assert.isTrue(parameters.minimumRegistrationDuration > 0n);
      assert.isTrue(parameters.minimumRenewalDuration > 0n);
      assert.isTrue(parameters.maximumCommitmentAge > parameters.minimumCommitmentAge);
      assert.isTrue(supported.supported);
      if (supported.supported) {
        assert.strictEqual(supported.token, sepoliaV2Deployment.testTokens.usdc);
        assert.strictEqual(supported.decimals, 6);
      }
      assert.isFalse(unsupported.supported);
    }),
  );

  it.effect("quotes an available V2 name and prepares its commitment state", () =>
    Effect.gen(function* () {
      const owner = yield* getOwner.effect(sepoliaConfig, { name: sepoliaNames.v2.profile });
      if (owner?.owner === null || owner === null) {
        return yield* Effect.die(new Error("Sepolia profile has no owner"));
      }

      const [price, plan] = yield* Effect.all(
        [
          getRegistrationPrice.effect(sepoliaConfig, {
            name: sepoliaNames.v2.available,
            duration,
            paymentToken: sepoliaV2Deployment.testTokens.usdc,
          }),
          getRegistrationPlan.effect(sepoliaConfig, {
            name: sepoliaNames.v2.available,
            duration,
            owner: owner.owner,
            secret: smokeSecret,
            paymentToken: sepoliaV2Deployment.testTokens.usdc,
          }),
        ] as const,
        { concurrency: 2 },
      );

      assert.strictEqual(price.status, "available");
      if (price.status === "available") {
        assert.strictEqual(price.protocol, "v2");
        assert.strictEqual(price.registrar, sepoliaV2Deployment.contracts.ethRegistrar);
        assert.strictEqual(price.currency.kind, "erc20");
        assert.strictEqual(price.total, price.base + price.premium);
        assert.isTrue(price.total > 0n);
      }
      assert.strictEqual(plan.status, "commitment-required");
      if (plan.status === "commitment-required") {
        assert.strictEqual(plan.parameters.protocol, "v2");
        assert.strictEqual(plan.commitmentStatus.status, "not-found");
      }
    }),
  );

  it.effect("routes native V2 and reserved V1 renewals through their deployed renewers", () =>
    Effect.gen(function* () {
      const [native, reserved] = yield* Effect.all(
        [
          getRenewalPrice.effect(sepoliaConfig, {
            name: sepoliaNames.v2.root,
            duration,
            paymentToken: sepoliaV2Deployment.testTokens.usdc,
          }),
          getRenewalPrice.effect(sepoliaConfig, {
            name: sepoliaNames.v1.reserved,
            duration,
            paymentToken: sepoliaV2Deployment.testTokens.usdc,
          }),
        ] as const,
        { concurrency: 2 },
      );

      assert.strictEqual(native.status, "renewable");
      if (native.status === "renewable") {
        assert.strictEqual(native.protocol, "v2");
        assert.strictEqual(native.route, "v2-registrar");
        assert.strictEqual(native.renewer, sepoliaV2Deployment.contracts.ethRegistrar);
      }
      assert.strictEqual(reserved.status, "renewable");
      if (reserved.status === "renewable") {
        assert.strictEqual(reserved.protocol, "v1");
        assert.strictEqual(reserved.route, "v1-renewer");
        assert.strictEqual(reserved.renewer, sepoliaV2Deployment.migration.ethRenewerV1);
      }
    }),
  );
});
