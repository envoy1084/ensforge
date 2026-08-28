import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { zeroHash } from "viem";

import {
  getCommitmentStatus,
  makeRegistrationCommitment,
  readBatch,
} from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

const duration = 365n * 86_400n;

describe("registration commitments integration", () => {
  it.effect("reproduces exact V1 and V2 commitment hashes", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* Effect.all(
        {
          v1: makeRegistrationCommitment.effect(devnet.configs.v1, {
            name: `${devnet.fixtures.registration.v1.label}.eth`,
            owner: devnet.accounts.owner,
            secret: devnet.fixtures.registration.v1.secret,
            duration,
          }),
          v2: makeRegistrationCommitment.effect(devnet.configs.v2, {
            name: `${devnet.fixtures.registration.v2.label}.eth`,
            owner: devnet.accounts.owner,
            secret: devnet.fixtures.registration.v2.secret,
            duration,
          }),
        },
        { concurrency: "unbounded" },
      );

      assert.strictEqual(result.v1.commitment, devnet.fixtures.registration.v1.commitment);
      assert.strictEqual(result.v2.commitment, devnet.fixtures.registration.v2.commitment);
    }),
  );

  it.effect("reads submitted and missing commitment states through batch requests", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const result = yield* readBatch.effect(devnet.configs.v2, {
        submitted: getCommitmentStatus.request({
          commitment: devnet.fixtures.registration.v2.commitment,
        }),
        missing: getCommitmentStatus.request({ commitment: zeroHash }),
      });

      assert.include(["pending", "ready"], result.submitted.status);
      assert.strictEqual(result.missing.status, "not-found");
    }),
  );
});
