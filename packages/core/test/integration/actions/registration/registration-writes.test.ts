import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  approvePaymentToken,
  completeRegistration,
  getText,
  registerName,
  registerNames,
  RegistrationError,
} from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

const duration = 365n * 86_400n;
const v1Secret = "0x1717171717171717171717171717171717171717171717171717171717171717";
const v2Secret = "0x2727272727272727272727272727272727272727272727272727272727272727";

const advanceTime = (seconds: bigint) =>
  Effect.gen(function* () {
    const { configs } = getIntegrationDevnet();
    yield* Effect.tryPromise(() =>
      configs.v1.publicClient.request({
        method: "evm_increaseTime",
        params: [Number(seconds)],
      } as never),
    );
    yield* Effect.tryPromise(() =>
      configs.v1.publicClient.request({ method: "evm_mine", params: [] } as never),
    );
  });

describe("registration writes integration", () => {
  it.effect("enforces maxPrice before committing a registration", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const error = yield* registerName
        .effect(devnet.configs.v1, {
          name: "phase17-expensive.eth",
          owner: devnet.accounts.owner,
          secret: v1Secret,
          duration,
          maxPrice: 0n,
        })
        .pipe(Effect.flip);

      assert.instanceOf(error, RegistrationError);
      assert.strictEqual(error.code, "PRICE_EXCEEDS_MAXIMUM");
      assert.notInclude(JSON.stringify(error), v1Secret.slice(2));
    }),
  );

  it.effect("rejects low-level completion without a commitment and redacts the secret", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const error = yield* completeRegistration
        .effect(devnet.configs.v1, {
          name: "phase17-no-commitment.eth",
          owner: devnet.accounts.owner,
          secret: v1Secret,
          duration,
        })
        .pipe(Effect.flip);

      assert.instanceOf(error, RegistrationError);
      assert.strictEqual(error.code, "COMMITMENT_NOT_FOUND");
      assert.notInclude(JSON.stringify(error), v1Secret.slice(2));
    }),
  );

  it.effect("rejects duplicate names before starting a multi-name workflow", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const registration = {
        name: "phase17-duplicate.eth",
        owner: devnet.accounts.owner,
        secret: v1Secret,
        duration,
      } as const;
      const error = yield* registerNames
        .effect(devnet.configs.v1, { registrations: [registration, registration] })
        .pipe(Effect.flip);

      assert.instanceOf(error, RegistrationError);
      assert.strictEqual(error.code, "REGISTRATION_FAILED");
    }),
  );

  it.effect("resumes V1 and V2 registration after the commitment wait and writes records", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const v1Name = "phase17-v1.eth";
      const v2Name = "phase17-v2.eth";
      const paymentToken = devnet.fixtures.registration.paymentTokens.usdc.address;

      yield* approvePaymentToken.effect(devnet.configs.v2, { paymentToken, amount: 0n });
      const v1Waiting = yield* registerName.effect(devnet.configs.v1, {
        name: v1Name,
        owner: devnet.accounts.owner,
        secret: v1Secret,
        duration,
        records: [{ type: "text", key: "phase", value: "seventeen-v1" }],
      });
      const v2Waiting = yield* registerName.effect(devnet.configs.v2, {
        name: v2Name,
        owner: devnet.accounts.owner,
        secret: v2Secret,
        duration,
        paymentToken,
      });

      assert.strictEqual(v1Waiting.status, "waiting");
      assert.strictEqual(v2Waiting.status, "waiting");
      assert.isTrue(v1Waiting.committedByWorkflow);
      assert.isTrue(v2Waiting.committedByWorkflow);
      assert.isTrue(v2Waiting.paymentApprovalIncluded);

      yield* advanceTime(
        (devnet.fixtures.registration.v1.minCommitmentAge >
        devnet.fixtures.registration.v2.minCommitmentAge
          ? devnet.fixtures.registration.v1.minCommitmentAge
          : devnet.fixtures.registration.v2.minCommitmentAge) + 1n,
      );
      const v1Completed = yield* registerName.effect(devnet.configs.v1, {
        name: v1Name,
        owner: devnet.accounts.owner,
        secret: v1Secret,
        duration,
        records: [{ type: "text", key: "phase", value: "seventeen-v1" }],
        resume: v1Waiting,
      });
      const v2Completed = yield* registerName.effect(devnet.configs.v2, {
        name: v2Name,
        owner: devnet.accounts.owner,
        secret: v2Secret,
        duration,
        paymentToken,
        resume: v2Waiting,
      });
      const record = yield* getText.effect(devnet.configs.v1, { name: v1Name, key: "phase" });

      assert.strictEqual(v1Completed.status, "completed");
      assert.strictEqual(v2Completed.status, "completed");
      assert.strictEqual(v1Completed.finalState?.status, "active");
      assert.strictEqual(v2Completed.finalState?.status, "active");
      assert.strictEqual(record.value, "seventeen-v1");

      const resumedAfterRegistration = yield* registerName.effect(devnet.configs.v1, {
        name: v1Name,
        owner: devnet.accounts.owner,
        secret: v1Secret,
        duration,
        records: [{ type: "text", key: "phase", value: "seventeen-v1" }],
        resume: v1Completed,
      });
      assert.strictEqual(resumedAfterRegistration.status, "completed");
    }),
  );

  it.effect("resumes multiple independent registrations without hiding per-name progress", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const registrations = [
        {
          name: "phase17-batch-a.eth",
          owner: devnet.accounts.owner,
          secret: "0x3737373737373737373737373737373737373737373737373737373737373737" as const,
          duration,
        },
        {
          name: "phase17-batch-b.eth",
          owner: devnet.accounts.owner,
          secret: "0x4747474747474747474747474747474747474747474747474747474747474747" as const,
          duration,
        },
      ] as const;
      const waiting = yield* registerNames.effect(devnet.configs.v1, { registrations });
      assert.strictEqual(waiting.status, "waiting");
      assert.lengthOf(waiting.registrations, 2);

      yield* advanceTime(devnet.fixtures.registration.v1.minCommitmentAge + 1n);
      const completed = yield* registerNames.effect(devnet.configs.v1, {
        registrations,
        resume: waiting,
      });

      assert.strictEqual(
        completed.status,
        "completed",
        completed.registrations
          .map(
            (registration) =>
              `${registration.name}:${registration.status}:${registration.write.currentStage}:${registration.write.failure?.message}`,
          )
          .join(" | "),
      );
      assert.isTrue(
        completed.registrations.every((registration) => registration.finalState !== null),
      );
    }),
  );
});
