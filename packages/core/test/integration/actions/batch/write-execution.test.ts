import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import type { Address } from "viem";

import {
  WalletError,
  defineWriteAction,
  estimateCalls,
  executeWritePlan,
  getWalletCapabilities,
  prepareCalls,
  sendCalls,
  simulateCalls,
} from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

const transfer = defineWriteAction(
  "integrationTransfer",
  (_config, parameters: { readonly to: Address }) => Effect.succeed(parameters.to),
  (_config, parameters) =>
    Effect.succeed({
      to: parameters.to,
      value: 0n,
    }),
);

describe("write execution integration", () => {
  it.effect("prepares, simulates, submits, and confirms a real devnet transaction", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const intent = transfer.call({ to: devnet.accounts.owner2 });
      const [prepared, simulated, estimated] = yield* Effect.all([
        prepareCalls.effect(devnet.configs.v2, { calls: [intent] }),
        simulateCalls.effect(devnet.configs.v2, { calls: [intent] }),
        estimateCalls.effect(devnet.configs.v2, { calls: [intent] }),
      ] as const);
      const result = yield* sendCalls.effect(devnet.configs.v2, {
        calls: [intent],
        mode: "sequential",
      });

      assert.strictEqual(prepared[0]?.to, devnet.accounts.owner2);
      assert.strictEqual(simulated[0]?.call.operation, "integrationTransfer");
      assert.strictEqual(estimated.calls[0]?.status, "estimated");
      assert.isTrue(estimated.totals.gas > 0n);
      assert.strictEqual(result.mode, "sequential");
      assert.strictEqual(result.status, "completed");
      assert.strictEqual(result.calls[0]?.status, "confirmed");
      assert.isNotNull(result.calls[0]?.receipt);
    }),
  );

  it.effect("detects missing EIP-5792 support and uses the automatic sequential route", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const capabilities = yield* getWalletCapabilities.effect(devnet.configs.v2, {});
      const result = yield* sendCalls.effect(devnet.configs.v2, {
        calls: [transfer.call({ to: devnet.accounts.owner2 })],
        mode: "auto",
      });

      assert.isFalse(capabilities.nativeCalls);
      assert.strictEqual(capabilities.atomicity, "unavailable");
      assert.strictEqual(result.mode, "sequential");
    }),
  );

  it.effect("rejects required native batching when the wallet does not support it", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const error = yield* sendCalls
        .effect(devnet.configs.v2, {
          calls: [transfer.call({ to: devnet.accounts.owner2 })],
          mode: "batch",
          atomicity: "required",
        })
        .pipe(Effect.flip);

      assert.instanceOf(error, WalletError);
      assert.strictEqual(error.code, "BATCH_UNSUPPORTED");
    }),
  );

  it.effect("runs confirmed call stages and returns resumable waiting progress", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const block = yield* Effect.promise(() => devnet.configs.v2.publicClient.getBlock());
      const plan = {
        id: "integration-write-plan",
        stages: [
          {
            type: "calls",
            id: "transfer",
            calls: [transfer.call({ to: devnet.accounts.owner2 })],
            mode: "sequential",
          },
          {
            type: "wait",
            id: "later",
            condition: { type: "timestamp", target: block.timestamp + 60n },
          },
        ],
      } as const;
      const progress = yield* executeWritePlan.effect(devnet.configs.v2, { plan });

      assert.strictEqual(progress.status, "waiting");
      assert.strictEqual(progress.completedStages[0]?.id, "transfer");
      assert.strictEqual(progress.currentStage, "later");
      assert.strictEqual(progress.nextActionAt, block.timestamp + 60n);
    }),
  );
});
