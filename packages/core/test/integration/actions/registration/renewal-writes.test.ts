import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { ethRegistrarV2Abi, ethRenewerV1Abi } from "@ensforge/contracts/v2";
import { encodeFunctionData, zeroHash } from "viem";

import {
  approvePaymentToken,
  approveRenewalPayment,
  getExpiry,
  prepareCalls,
  renewName,
  renewNames,
  RenewalError,
} from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

const duration = 30n * 86_400n;

describe("renewal writes integration", () => {
  it.effect("rejects unavailable names and enforces maxPrice", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const unavailable = yield* renewName
        .effect(devnet.configs.v1, {
          name: devnet.fixtures.v1.available.name,
          duration,
        })
        .pipe(Effect.flip);
      const expensive = yield* renewName
        .effect(devnet.configs.v1, {
          name: devnet.fixtures.v1.activeUnwrapped.name,
          duration,
          maxPrice: 0n,
        })
        .pipe(Effect.flip);

      assert.instanceOf(unavailable, RenewalError);
      assert.strictEqual(unavailable.code, "NAME_NOT_RENEWABLE");
      assert.instanceOf(expensive, RenewalError);
      assert.strictEqual(expensive.code, "PRICE_EXCEEDS_MAXIMUM");
    }),
  );

  it.effect("uses the deployed flat renewal ABI", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const paymentToken = devnet.fixtures.registration.paymentTokens.dai.address;
      const nativeName = devnet.fixtures.v2.renewalBatch.name;
      const reservedName = devnet.fixtures.migration.renewalReservedBatch.name;
      const calls = yield* prepareCalls.effect(devnet.configs.v2, {
        calls: [
          renewName.call({ name: nativeName, duration, paymentToken }),
          renewName.call({ name: reservedName, duration, paymentToken }),
        ],
      });

      assert.strictEqual(
        calls[0]?.data,
        encodeFunctionData({
          abi: ethRegistrarV2Abi,
          functionName: "renew",
          args: [nativeName.slice(0, -4), duration, paymentToken, zeroHash],
        }),
      );
      assert.strictEqual(
        calls[1]?.data,
        encodeFunctionData({
          abi: ethRenewerV1Abi,
          functionName: "renew",
          args: [reservedName.slice(0, -4), duration, paymentToken, zeroHash],
        }),
      );
    }),
  );

  it.effect("renews V1 with native ETH and supports completed resumption", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.v1.renewal.name;
      const before = yield* getExpiry.effect(devnet.configs.v1, { name });
      const renewed = yield* renewName.effect(devnet.configs.v1, { name, duration });
      const resumed = yield* renewName.effect(devnet.configs.v1, {
        name,
        duration,
        resume: renewed,
      });

      assert.strictEqual(
        renewed.status,
        "completed",
        `${renewed.write.currentStage}: ${renewed.write.failure?.message}`,
      );
      assert.strictEqual(renewed.route, "v1-controller");
      assert.strictEqual(renewed.currency.kind, "native");
      assert.strictEqual(renewed.previousExpiry, before?.expiry ?? null);
      assert.strictEqual(renewed.newExpiry, (before?.expiry ?? 0n) + duration);
      assert.strictEqual(resumed.newExpiry, renewed.newExpiry);
    }),
  );

  it.effect("renews a V1 name during its grace period", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.v1.renewalGrace.name;
      const before = yield* getExpiry.effect(devnet.configs.v1, { name });
      const renewed = yield* renewName.effect(devnet.configs.v1, { name, duration });

      assert.strictEqual(
        renewed.status,
        "completed",
        `${renewed.write.currentStage}: ${renewed.write.failure?.message}`,
      );
      assert.strictEqual(renewed.previousExpiry, before?.expiry ?? null);
      assert.strictEqual(renewed.newExpiry, (before?.expiry ?? 0n) + duration);
    }),
  );

  it.effect("adds a confirmed ERC-20 approval before V2 renewal", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.v2.renewal.name;
      const paymentToken = devnet.fixtures.registration.paymentTokens.usdc.address;
      const before = yield* getExpiry.effect(devnet.configs.v2, { name });
      yield* approvePaymentToken.effect(devnet.configs.v2, { paymentToken, amount: 0n });
      const renewed = yield* renewName.effect(devnet.configs.v2, {
        name,
        duration,
        paymentToken,
      });
      assert.strictEqual(
        renewed.status,
        "completed",
        `${renewed.write.currentStage}: ${renewed.write.failure?.message}`,
      );
      assert.strictEqual(renewed.route, "v2-registrar");
      assert.isTrue(renewed.approval.required);
      assert.strictEqual(renewed.approval.spender, devnet.deployments.v2.contracts.ethRegistrar);
      assert.strictEqual(renewed.newExpiry, (before?.expiry ?? 0n) + duration);
    }),
  );

  it.effect("renews a RESERVED name through ETHRenewerV1 and synchronizes V1 expiry", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.migration.renewalReserved.name;
      const paymentToken = devnet.fixtures.registration.paymentTokens.usdc.address;
      const before = yield* getExpiry.effect(devnet.configs.v2, { name });
      yield* approveRenewalPayment.effect(devnet.configs.v2, {
        name,
        duration,
        paymentToken,
        amount: 0n,
      });
      const renewed = yield* renewName.effect(devnet.configs.v2, {
        name,
        duration,
        paymentToken,
      });
      assert.strictEqual(
        renewed.status,
        "completed",
        `${renewed.write.currentStage}: ${renewed.write.failure?.message}`,
      );
      assert.strictEqual(renewed.route, "v1-renewer");
      assert.isTrue(renewed.approval.required);
      assert.strictEqual(renewed.approval.spender, devnet.deployments.v2.migration.ethRenewerV1);
      assert.strictEqual(renewed.newExpiry, (before?.expiry ?? 0n) + duration);
    }),
  );

  it.effect("uses V1 bulk renewal for compatible names", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const names = [
        devnet.fixtures.v1.renewalBatchOne.name,
        devnet.fixtures.v1.renewalBatchTwo.name,
      ] as const;
      const before = yield* Effect.forEach(names, (name) =>
        getExpiry.effect(devnet.configs.v1, { name }),
      );
      const result = yield* renewNames.effect(devnet.configs.v1, {
        renewals: names.map((name) => ({ name, duration })),
      });

      assert.strictEqual(
        result.status,
        "completed",
        `${result.write.currentStage}: ${result.write.failure?.message}`,
      );
      assert.lengthOf(result.write.completedStages, 1);
      assert.isTrue(
        result.renewals.every(
          (renewal, index) => renewal.newExpiry === (before[index]?.expiry ?? 0n) + duration,
        ),
      );
    }),
  );

  it.effect("groups V2 and RESERVED renewals by contract and resumes completed progress", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const paymentToken = devnet.fixtures.registration.paymentTokens.dai.address;
      const renewals = [
        { name: devnet.fixtures.v2.renewalBatch.name, duration, paymentToken },
        { name: devnet.fixtures.migration.renewalReservedBatch.name, duration, paymentToken },
      ] as const;
      yield* approvePaymentToken.effect(devnet.configs.v2, { paymentToken, amount: 0n });
      yield* approveRenewalPayment.effect(devnet.configs.v2, {
        ...renewals[1],
        amount: 0n,
      });
      const result = yield* renewNames.effect(devnet.configs.v2, { renewals });
      const resumed = yield* renewNames.effect(devnet.configs.v2, {
        renewals,
        resume: result,
      });

      assert.strictEqual(
        result.status,
        "completed",
        `${result.write.currentStage}: ${result.write.failure?.message}`,
      );
      assert.lengthOf(
        result.approvals.filter((approval) => approval.required),
        2,
      );
      assert.deepEqual(
        result.renewals.map((renewal) => renewal.route),
        ["v2-registrar", "v1-renewer"],
      );
      assert.strictEqual(resumed.status, "completed");
    }),
  );
});
