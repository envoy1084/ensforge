import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { mainnetV1Deployment } from "@ensforge/contracts/deployments";

import { getRegistrationPlan, getRegistrationPrice, getRenewalPrice } from "../../../src/index.js";
import { mainnetConfig, mainnetNames, missingMainnetName } from "../setup/mainnet.js";

const duration = 365n * 86_400n;
const smokeOwner = "0x000000000000000000000000000000000000dEaD";
const smokeSecret = `0x${"11".repeat(32)}` as const;

describe("Mainnet registration reads", () => {
  it.effect("quotes an available ENSv1 registration", () =>
    Effect.gen(function* () {
      const price = yield* getRegistrationPrice.effect(mainnetConfig, {
        name: missingMainnetName,
        duration,
      });

      assert.strictEqual(price.status, "available");
      if (price.status !== "available") return;
      assert.strictEqual(price.protocol, "v1");
      assert.strictEqual(price.registrar, mainnetV1Deployment.contracts.ethRegistrarController);
      assert.strictEqual(price.currency.kind, "native");
      assert.strictEqual(price.total, price.base + price.premium);
      assert.isTrue(price.total > 0n);
      assert.strictEqual(price.premium, 0n);
    }),
  );

  it.effect("prepares the read-only commitment state without a wallet", () =>
    Effect.gen(function* () {
      const plan = yield* getRegistrationPlan.effect(mainnetConfig, {
        name: missingMainnetName,
        duration,
        owner: smokeOwner,
        secret: smokeSecret,
      });

      assert.strictEqual(plan.status, "commitment-required");
      if (plan.status !== "commitment-required") return;
      assert.strictEqual(plan.parameters.protocol, "v1");
      assert.strictEqual(
        plan.parameters.registrar,
        mainnetV1Deployment.contracts.ethRegistrarController,
      );
      assert.strictEqual(plan.commitmentStatus.status, "not-found");
    }),
  );

  it.effect("routes an active name renewal through the ENSv1 controller", () =>
    Effect.gen(function* () {
      const renewal = yield* getRenewalPrice.effect(mainnetConfig, {
        name: mainnetNames.standard,
        duration,
      });

      assert.strictEqual(renewal.status, "renewable");
      if (renewal.status !== "renewable") return;
      assert.strictEqual(renewal.protocol, "v1");
      assert.strictEqual(renewal.route, "v1-controller");
      assert.strictEqual(renewal.renewer, mainnetV1Deployment.contracts.ethRegistrarController);
      assert.strictEqual(renewal.currency.kind, "native");
      assert.isTrue(renewal.price > 0n);
    }),
  );
});
