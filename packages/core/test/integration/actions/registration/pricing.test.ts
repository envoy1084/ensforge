import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  getRegistrationParameters,
  getRegistrationPrice,
  getRenewalPrice,
  isPaymentTokenSupported,
  readBatch,
} from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

const duration = 365n * 86_400n;

describe("registration pricing integration", () => {
  it.effect("reads ENS v1 native registration pricing and parameters", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [price, parameters] = yield* Effect.all(
        [
          getRegistrationPrice.effect(devnet.configs.v1, {
            name: devnet.fixtures.v1.available.name,
            duration,
          }),
          getRegistrationParameters.effect(devnet.configs.v1, {}),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.strictEqual(price.status, "available");
      if (price.status === "available") {
        assert.strictEqual(price.protocol, "v1");
        assert.strictEqual(price.currency.kind, "native");
        assert.strictEqual(price.total, price.base + price.premium);
        assert.isTrue(price.total > 0n);
      }
      assert.strictEqual(parameters.protocol, "v1");
      assert.strictEqual(
        parameters.registrar,
        devnet.deployments.v1.contracts.ethRegistrarController,
      );
      assert.strictEqual(parameters.priceOracle, devnet.deployments.v1.contracts.priceOracle);
      assert.strictEqual(parameters.payment.kind, "native");
      assert.isTrue(parameters.minimumRegistrationDuration > 0n);
    }),
  );

  it.effect("reads ENS v2 ERC-20 registration pricing and token support", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const paymentToken = devnet.fixtures.registration.paymentTokens.usdc.address;
      const result = yield* readBatch.effect(devnet.configs.v2, {
        parameters: getRegistrationParameters.request({}),
        support: isPaymentTokenSupported.request({ paymentToken }),
        price: getRegistrationPrice.request({
          name: devnet.fixtures.v2.available.name,
          duration,
          paymentToken,
        }),
      });

      assert.strictEqual(result.parameters.protocol, "v2");
      assert.strictEqual(result.parameters.payment.kind, "erc20");
      assert.isTrue(result.support.supported);
      if (result.support.supported) assert.strictEqual(result.support.decimals, 6);
      assert.strictEqual(result.price.status, "available");
      if (result.price.status === "available") {
        assert.strictEqual(result.price.currency.kind, "erc20");
        assert.strictEqual(result.price.total, result.price.base + result.price.premium);
        assert.isTrue(result.price.total > 0n);
      }
    }),
  );

  it.effect("returns explicit payment and availability states", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [missingToken, unsupportedToken, unavailable] = yield* Effect.all(
        [
          getRegistrationPrice.effect(devnet.configs.v2, {
            name: devnet.fixtures.v2.available.name,
            duration,
          }),
          isPaymentTokenSupported.effect(devnet.configs.v2, {
            paymentToken: devnet.accounts.unauthorized,
          }),
          getRegistrationPrice.effect(devnet.configs.v2, {
            name: devnet.fixtures.v2.active.name,
            duration,
            paymentToken: devnet.fixtures.registration.paymentTokens.usdc.address,
          }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.strictEqual(missingToken.status, "payment-token-required");
      assert.isFalse(unsupportedToken.supported);
      assert.strictEqual(unavailable.status, "unavailable");
    }),
  );

  it.effect("routes V1, V2, and RESERVED renewal quotes", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const paymentToken = devnet.fixtures.registration.paymentTokens.usdc.address;
      const [v1, v2, grace, reserved, expired] = yield* Effect.all(
        [
          getRenewalPrice.effect(devnet.configs.v1, {
            name: devnet.fixtures.v1.activeUnwrapped.name,
            duration,
          }),
          getRenewalPrice.effect(devnet.configs.v2, {
            name: devnet.fixtures.v2.active.name,
            duration,
            paymentToken,
          }),
          getRenewalPrice.effect(devnet.configs.v2, {
            name: devnet.fixtures.v2.grace.name,
            duration,
            paymentToken,
          }),
          getRenewalPrice.effect(devnet.configs.v2, {
            name: devnet.fixtures.migration.reservedWrapped.name,
            duration,
            paymentToken,
          }),
          getRenewalPrice.effect(devnet.configs.v2, {
            name: devnet.fixtures.v2.expired.name,
            duration,
            paymentToken,
          }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.strictEqual(v1.status, "renewable");
      if (v1.status === "renewable") assert.strictEqual(v1.route, "v1-controller");
      assert.strictEqual(v2.status, "renewable");
      if (v2.status === "renewable") assert.strictEqual(v2.route, "v2-registrar");
      assert.strictEqual(grace.status, "renewable");
      if (grace.status === "renewable") assert.strictEqual(grace.route, "v2-registrar");
      assert.strictEqual(reserved.status, "renewable");
      if (reserved.status === "renewable") assert.strictEqual(reserved.route, "v1-renewer");
      assert.strictEqual(expired.status, "not-renewable");
    }),
  );
});
