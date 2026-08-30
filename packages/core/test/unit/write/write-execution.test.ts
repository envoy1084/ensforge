import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { mainnetV1Deployment, type EnsV1Deployment } from "@ensforge/contracts/deployments";
import {
  InvalidRequestRpcError,
  MethodNotFoundRpcError,
  TimeoutError,
  UserRejectedRequestError,
  defineChain,
  type Address,
  type Hex,
  type PublicClient,
  type TransactionReceipt,
  type WalletClient,
} from "viem";
import { expect, vi } from "vitest";

import {
  defineWriteAction,
  executeWritePlan,
  estimateCalls,
  getWalletCapabilities,
  getCallsStatus,
  prepareCalls,
  sendCalls,
  simulateCalls,
  resumeCalls,
  TransactionError,
  WalletError,
  type WriteOptions,
} from "../../../src/index.js";
import { createTestConfig, ensTestChainId } from "../../../src/testing/index.js";

const account = "0x0000000000000000000000000000000000000001";
const target = "0x0000000000000000000000000000000000000002";
const firstHash = `0x${"1".repeat(64)}` as Hex;
const secondHash = `0x${"2".repeat(64)}` as Hex;

const chain = defineChain({
  id: ensTestChainId,
  name: "Write test",
  nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
  rpcUrls: { default: { http: ["http://127.0.0.1:8545"] } },
});
const deployment = {
  ...mainnetV1Deployment,
  id: "write-test-v1",
  chainId: ensTestChainId,
} satisfies EnsV1Deployment;

const receipt = (transactionHash: Hex) =>
  ({ status: "success", transactionHash }) as TransactionReceipt;

const makeHarness = (writes?: WriteOptions) => {
  let blockNumber = 10n;
  let timestamp = 100n;
  const publicClient = {
    chain,
    getBlock: vi.fn(async () => ({ number: blockNumber, timestamp })),
    multicall: vi.fn(),
    call: vi.fn(async () => ({ data: "0x" as Hex })),
    estimateGas: vi.fn(async () => 21_000n),
    estimateFeesPerGas: vi.fn(async () => ({
      maxFeePerGas: 10n,
      maxPriorityFeePerGas: 2n,
    })),
    waitForTransactionReceipt: vi.fn(async ({ hash }: { readonly hash: Hex }) => receipt(hash)),
  } as unknown as PublicClient;
  const walletClient = {
    account: { address: account },
    chain,
    getCapabilities: vi.fn(async () => ({ atomic: { status: "supported" as const } })),
    sendTransaction: vi
      .fn<(parameters: unknown) => Promise<Hex>>()
      .mockResolvedValueOnce(firstHash)
      .mockResolvedValueOnce(secondHash),
    sendCalls: vi.fn(async () => ({ id: "batch-1" })),
    getCallsStatus: vi.fn(async () => ({
      atomic: true,
      chainId: ensTestChainId,
      id: "batch-1",
      receipts: [receipt(firstHash)],
      status: "success" as const,
      statusCode: 200,
      version: "2.0.0",
    })),
    waitForCallsStatus: vi.fn(async () => ({
      atomic: true,
      chainId: ensTestChainId,
      receipts: [receipt(firstHash)],
      status: "success" as const,
      statusCode: 200,
      version: "2.0.0",
    })),
  } as unknown as WalletClient;
  const config = createTestConfig({
    deployments: { protocol: "v1", v1: deployment },
    publicClient,
    walletClient,
    ...(writes === undefined ? {} : { writes }),
  });
  return {
    config,
    publicClient,
    walletClient,
    setBlock: (number: bigint, time: bigint) => {
      blockNumber = number;
      timestamp = time;
    },
  };
};

const testWrite = defineWriteAction(
  "testWrite",
  (_config, parameters: { readonly to: Address; readonly data?: Hex }) =>
    Effect.succeed(parameters.to),
  (_config, parameters, context) =>
    Effect.succeed({
      to: parameters.to,
      value: 0n,
      ...(parameters.data === undefined ? {} : { data: parameters.data }),
      protocol: "v1" as const,
      account: context.account,
    }),
);

describe("write execution", () => {
  it.effect("prepares and simulates immutable semantic intents", () =>
    Effect.gen(function* () {
      const harness = makeHarness();
      const intent = testWrite.call({ to: target, data: "0x1234" });
      const [prepared, simulated] = yield* Effect.all([
        prepareCalls.effect(harness.config, { calls: [intent] }),
        simulateCalls.effect(harness.config, { calls: [intent] }),
      ] as const);

      assert.strictEqual(prepared[0]?.operation, "testWrite");
      assert.strictEqual(prepared[0]?.to, target);
      assert.strictEqual(prepared[0]?.data, "0x1234");
      assert.strictEqual(simulated[0]?.result, "0x");
      expect(harness.walletClient.sendTransaction).not.toHaveBeenCalled();
    }),
  );

  it.effect("estimates calls and aggregates maximum costs", () =>
    Effect.gen(function* () {
      const harness = makeHarness();
      const result = yield* estimateCalls.effect(harness.config, {
        calls: [testWrite.call({ to: target }), testWrite.call({ to: target })],
      });

      assert.strictEqual(result.blockNumber, 10n);
      assert.deepStrictEqual(result.fee, {
        type: "eip1559",
        maxFeePerGas: 10n,
        maxPriorityFeePerGas: 2n,
      });
      assert.deepStrictEqual(
        result.calls.map(({ status }) => status),
        ["estimated", "estimated"],
      );
      assert.deepStrictEqual(result.totals, {
        gas: 42_000n,
        fee: 420_000n,
        value: 0n,
        maximumCost: 420_000n,
      });
      expect(harness.publicClient.estimateGas).toHaveBeenCalledTimes(2);
    }),
  );

  it.effect("executes confirmed calls sequentially", () =>
    Effect.gen(function* () {
      const harness = makeHarness();
      const result = yield* sendCalls.effect(harness.config, {
        calls: [testWrite.call({ to: target }), testWrite.call({ to: target })],
        mode: "sequential",
      });

      assert.strictEqual(result.mode, "sequential");
      assert.strictEqual(result.status, "completed");
      assert.deepStrictEqual(
        result.calls.map((call) => call.status),
        ["confirmed", "confirmed"],
      );
      expect(harness.publicClient.call).toHaveBeenCalledTimes(2);
      expect(harness.walletClient.sendTransaction).toHaveBeenCalledTimes(2);
    }),
  );

  it.effect("applies configured simulation and confirmation policies", () =>
    Effect.gen(function* () {
      const harness = makeHarness({
        simulation: "skip",
        confirmation: { type: "submitted" },
      });
      const result = yield* sendCalls.effect(harness.config, {
        calls: [testWrite.call({ to: target })],
        mode: "sequential",
      });

      assert.strictEqual(result.calls[0]?.status, "submitted");
      expect(harness.publicClient.call).not.toHaveBeenCalled();
      expect(harness.publicClient.waitForTransactionReceipt).not.toHaveBeenCalled();
    }),
  );

  it.effect("retries only idempotent confirmation polling", () =>
    Effect.gen(function* () {
      const harness = makeHarness({ statusRetries: 1 });
      vi.mocked(harness.publicClient.waitForTransactionReceipt)
        .mockRejectedValueOnce(new Error("temporary receipt failure"))
        .mockResolvedValueOnce(receipt(firstHash));

      const result = yield* sendCalls.effect(harness.config, {
        calls: [testWrite.call({ to: target })],
        mode: "sequential",
      });

      assert.strictEqual(result.calls[0]?.status, "confirmed");
      expect(harness.walletClient.sendTransaction).toHaveBeenCalledOnce();
      expect(harness.publicClient.waitForTransactionReceipt).toHaveBeenCalledTimes(2);
    }),
  );

  it.effect("returns explicit partial completion after an onchain change", () =>
    Effect.gen(function* () {
      const harness = makeHarness();
      vi.mocked(harness.walletClient.sendTransaction)
        .mockReset()
        .mockResolvedValueOnce(firstHash)
        .mockRejectedValueOnce(new UserRejectedRequestError(new Error("rejected")));
      const result = yield* sendCalls.effect(harness.config, {
        calls: [testWrite.call({ to: target }), testWrite.call({ to: target })],
        mode: "sequential",
      });

      assert.strictEqual(result.mode, "sequential");
      if (result.mode !== "sequential") return;
      assert.strictEqual(result.status, "partial");
      assert.strictEqual(result.calls[0]?.status, "confirmed");
      assert.strictEqual(result.calls[1]?.status, "not-started");
      if (result.mode === "sequential") {
        assert.instanceOf(result.failure, WalletError);
      }
    }),
  );

  it.effect("fails without partial progress when the wallet rejects before submission", () =>
    Effect.gen(function* () {
      const harness = makeHarness();
      vi.mocked(harness.walletClient.sendTransaction)
        .mockReset()
        .mockRejectedValueOnce(new UserRejectedRequestError(new Error("rejected")));

      const error = yield* sendCalls
        .effect(harness.config, {
          calls: [testWrite.call({ to: target })],
          mode: "sequential",
        })
        .pipe(Effect.flip);

      assert.instanceOf(error, WalletError);
      assert.strictEqual(error.code, "USER_REJECTED");
      expect(harness.publicClient.waitForTransactionReceipt).not.toHaveBeenCalled();
    }),
  );

  it.effect("preserves a submitted transaction across timeout and plan resume", () =>
    Effect.gen(function* () {
      const harness = makeHarness();
      vi.mocked(harness.publicClient.waitForTransactionReceipt).mockRejectedValueOnce(
        new TimeoutError({ body: {}, url: "http://127.0.0.1:8545" }),
      );
      const plan = {
        id: "confirmation-resume-plan",
        stages: [
          {
            type: "calls",
            id: "write",
            mode: "sequential",
            calls: [testWrite.call({ to: target })],
          },
        ],
      } as const;

      const partial = yield* executeWritePlan.effect(harness.config, { plan });
      assert.strictEqual(partial.status, "partial");
      assert.instanceOf(partial.failure, TransactionError);
      assert.strictEqual(partial.failure.code, "CONFIRMATION_TIMEOUT");
      assert.strictEqual(partial.completedStages[0]?.result.calls[0]?.status, "submitted");
      assert.strictEqual(partial.completedStages[0]?.result.calls[0]?.hash, firstHash);

      vi.mocked(harness.publicClient.waitForTransactionReceipt).mockResolvedValueOnce(
        receipt(secondHash),
      );
      const completed = yield* executeWritePlan.effect(harness.config, { plan, resume: partial });

      assert.strictEqual(completed.status, "completed");
      assert.strictEqual(completed.completedStages[0]?.result.calls[0]?.status, "confirmed");
      assert.strictEqual(completed.completedStages[0]?.result.calls[0]?.hash, secondHash);
      expect(harness.walletClient.sendTransaction).toHaveBeenCalledOnce();
      expect(harness.publicClient.waitForTransactionReceipt).toHaveBeenCalledTimes(2);
    }),
  );

  it.effect("preserves submitted progress when its receipt reverted", () =>
    Effect.gen(function* () {
      const harness = makeHarness();
      vi.mocked(harness.publicClient.waitForTransactionReceipt).mockResolvedValueOnce({
        ...receipt(firstHash),
        status: "reverted",
      });

      const result = yield* sendCalls.effect(harness.config, {
        calls: [testWrite.call({ to: target })],
        mode: "sequential",
      });

      assert.strictEqual(result.mode, "sequential");
      if (result.mode !== "sequential") return;
      assert.strictEqual(result.status, "partial");
      assert.strictEqual(result.calls[0]?.status, "submitted");
      assert.strictEqual(result.calls[0]?.hash, firstHash);
      assert.instanceOf(result.failure, TransactionError);
      assert.strictEqual(result.failure.code, "RECEIPT_REVERTED");
    }),
  );

  it.effect("normalizes capabilities and executes a native atomic batch", () =>
    Effect.gen(function* () {
      const harness = makeHarness();
      const capabilities = yield* getWalletCapabilities.effect(harness.config, {});
      const result = yield* sendCalls.effect(harness.config, {
        calls: [testWrite.call({ to: target }), testWrite.call({ to: target })],
        mode: "batch",
        atomicity: "required",
      });

      assert.isTrue(capabilities.nativeCalls);
      assert.strictEqual(capabilities.atomicity, "supported");
      assert.strictEqual(result.mode, "batch");
      assert.isTrue(result.atomic);
      assert.strictEqual(result.status, "confirmed");
      expect(harness.walletClient.sendCalls).toHaveBeenCalledOnce();
    }),
  );

  it.effect("rejects capabilities that the wallet does not advertise", () =>
    Effect.gen(function* () {
      const harness = makeHarness();
      const error = yield* sendCalls
        .effect(harness.config, {
          calls: [testWrite.call({ to: target })],
          mode: "batch",
          capabilities: { paymasterService: { url: "https://paymaster.example" } },
        })
        .pipe(Effect.flip);

      assert.instanceOf(error, WalletError);
      assert.strictEqual(error.code, "CAPABILITY_UNAVAILABLE");
      expect(harness.walletClient.sendCalls).not.toHaveBeenCalled();
    }),
  );

  it.effect("reads and resumes a persisted native batch", () =>
    Effect.gen(function* () {
      const harness = makeHarness();
      const submitted = yield* sendCalls.effect(harness.config, {
        calls: [testWrite.call({ to: target })],
        mode: "batch",
        confirmation: { type: "submitted" },
      });
      assert.strictEqual(submitted.mode, "batch");
      if (submitted.mode !== "batch") return;

      const status = yield* getCallsStatus.effect(harness.config, { id: submitted.id });
      const resumed = yield* resumeCalls.effect(harness.config, { batch: submitted });

      assert.strictEqual(status.status, "success");
      assert.strictEqual(resumed.status, "confirmed");
      assert.strictEqual(resumed.calls[0]?.hash, firstHash);
      expect(harness.walletClient.sendCalls).toHaveBeenCalledOnce();
    }),
  );

  it.effect("does not poll an already confirmed native batch again", () =>
    Effect.gen(function* () {
      const harness = makeHarness();
      const confirmed = yield* sendCalls.effect(harness.config, {
        calls: [testWrite.call({ to: target })],
        mode: "batch",
      });
      assert.strictEqual(confirmed.mode, "batch");
      if (confirmed.mode !== "batch") return;

      const resumed = yield* resumeCalls.effect(harness.config, { batch: confirmed });

      assert.strictEqual(resumed, confirmed);
      expect(harness.walletClient.waitForCallsStatus).toHaveBeenCalledOnce();
    }),
  );

  it.effect("retries native batch status polling without resubmission", () =>
    Effect.gen(function* () {
      const harness = makeHarness({ statusRetries: 1 });
      vi.mocked(harness.walletClient.waitForCallsStatus)
        .mockRejectedValueOnce(new Error("temporary status failure"))
        .mockResolvedValueOnce({
          atomic: true,
          chainId: ensTestChainId,
          id: "batch-1",
          receipts: [receipt(firstHash)],
          status: "success",
          statusCode: 200,
          version: "2.0.0",
        });

      const result = yield* sendCalls.effect(harness.config, {
        calls: [testWrite.call({ to: target })],
        mode: "batch",
      });

      assert.strictEqual(result.mode, "batch");
      assert.strictEqual(result.status, "confirmed");
      expect(harness.walletClient.sendCalls).toHaveBeenCalledOnce();
      expect(harness.walletClient.waitForCallsStatus).toHaveBeenCalledTimes(2);
    }),
  );

  it.effect("reports failed and cross-chain native batch statuses", () =>
    Effect.gen(function* () {
      const harness = makeHarness();
      vi.mocked(harness.walletClient.waitForCallsStatus).mockResolvedValueOnce({
        atomic: true,
        chainId: ensTestChainId,
        id: "batch-1",
        receipts: [],
        status: "failure",
        statusCode: 500,
        version: "2.0.0",
      });
      const failed = yield* sendCalls
        .effect(harness.config, {
          calls: [testWrite.call({ to: target })],
          mode: "batch",
        })
        .pipe(Effect.flip);
      assert.instanceOf(failed, TransactionError);
      assert.strictEqual(failed.code, "BATCH_STATUS_FAILED");

      vi.mocked(harness.walletClient.getCallsStatus).mockResolvedValueOnce({
        atomic: true,
        chainId: 1,
        id: "batch-1",
        receipts: [],
        status: "success",
        statusCode: 200,
        version: "2.0.0",
      });
      const crossChain = yield* getCallsStatus
        .effect(harness.config, { id: "batch-1" })
        .pipe(Effect.flip);
      assert.instanceOf(crossChain, TransactionError);
      assert.strictEqual(crossChain.code, "INVALID_BATCH_STATUS");
    }),
  );

  it.effect("resumes a submitted native write-plan stage without resubmitting", () =>
    Effect.gen(function* () {
      const harness = makeHarness();
      const plan = {
        id: "native-resume-plan",
        stages: [
          {
            type: "calls",
            id: "batch",
            mode: "batch",
            confirmation: { type: "submitted" },
            calls: [testWrite.call({ to: target })],
          },
        ],
      } as const;
      const submitted = yield* executeWritePlan.effect(harness.config, { plan });
      assert.strictEqual(submitted.status, "submitted");

      const completed = yield* executeWritePlan.effect(harness.config, {
        plan: {
          ...plan,
          stages: [{ ...plan.stages[0], confirmation: { type: "confirmed" } }],
        },
        resume: submitted,
      });

      assert.strictEqual(completed.status, "completed");
      assert.strictEqual(completed.completedStages[0]?.result.status, "confirmed");
      expect(harness.walletClient.sendCalls).toHaveBeenCalledOnce();
    }),
  );

  it.effect("falls back to sequential execution when native calls are unavailable", () =>
    Effect.gen(function* () {
      const harness = makeHarness();
      vi.mocked(harness.walletClient.getCapabilities).mockRejectedValue(
        new MethodNotFoundRpcError(new Error("unsupported"), {
          method: "wallet_getCapabilities",
        }),
      );
      const result = yield* sendCalls.effect(harness.config, {
        calls: [testWrite.call({ to: target })],
        mode: "auto",
      });

      assert.strictEqual(result.mode, "sequential");
      expect(harness.walletClient.sendCalls).not.toHaveBeenCalled();
    }),
  );

  it.effect("falls back when an RPC reports wallet capabilities as an invalid request", () =>
    Effect.gen(function* () {
      const harness = makeHarness();
      vi.mocked(harness.walletClient.getCapabilities).mockRejectedValue(
        new InvalidRequestRpcError(new Error("Unsupported method: wallet_getCapabilities on eth")),
      );
      const result = yield* sendCalls.effect(harness.config, {
        calls: [testWrite.call({ to: target })],
        mode: "auto",
      });

      assert.strictEqual(result.mode, "sequential");
      expect(harness.walletClient.sendCalls).not.toHaveBeenCalled();
    }),
  );

  it.effect("returns waiting progress and resumes a staged plan", () =>
    Effect.gen(function* () {
      const harness = makeHarness();
      const plan = {
        id: "registration-like-plan",
        stages: [
          { type: "wait", id: "window", condition: { type: "timestamp", target: 200n } },
          { type: "calls", id: "write", calls: [testWrite.call({ to: target })] },
        ],
      } as const;
      const waiting = yield* executeWritePlan.effect(harness.config, { plan });
      assert.strictEqual(waiting.status, "waiting");
      assert.strictEqual(waiting.currentStage, "window");

      harness.setBlock(11n, 200n);
      const completed = yield* executeWritePlan.effect(harness.config, {
        plan,
        resume: waiting,
      });
      assert.strictEqual(completed.status, "completed");
      assert.strictEqual(completed.completedStages[0]?.id, "write");
    }),
  );

  it.effect("resumes only the unsubmitted calls of a partially completed stage", () =>
    Effect.gen(function* () {
      const harness = makeHarness();
      vi.mocked(harness.walletClient.sendTransaction)
        .mockReset()
        .mockResolvedValueOnce(firstHash)
        .mockRejectedValueOnce(new UserRejectedRequestError(new Error("rejected")));
      const plan = {
        id: "partial-plan",
        stages: [
          {
            type: "calls",
            id: "records",
            mode: "sequential",
            calls: [testWrite.call({ to: target }), testWrite.call({ to: target })],
          },
        ],
      } as const;
      const partial = yield* executeWritePlan.effect(harness.config, { plan });
      assert.strictEqual(partial.status, "partial");

      vi.mocked(harness.walletClient.sendTransaction).mockReset().mockResolvedValue(secondHash);
      const completed = yield* executeWritePlan.effect(harness.config, {
        plan,
        resume: partial,
      });

      assert.strictEqual(completed.status, "completed");
      assert.deepStrictEqual(
        completed.completedStages[0]?.result.calls.map((call) => call.status),
        ["confirmed", "confirmed"],
      );
      expect(harness.walletClient.sendTransaction).toHaveBeenCalledOnce();
    }),
  );

  it.effect("preserves completed stages when the next stage fails", () =>
    Effect.gen(function* () {
      const harness = makeHarness();
      vi.mocked(harness.walletClient.sendTransaction)
        .mockReset()
        .mockResolvedValueOnce(firstHash)
        .mockRejectedValueOnce(new UserRejectedRequestError(new Error("rejected")));
      const plan = {
        id: "dependent-stage-plan",
        stages: [
          {
            type: "calls",
            id: "deploy",
            mode: "sequential",
            calls: [testWrite.call({ to: target })],
          },
          {
            type: "calls",
            id: "configure",
            mode: "sequential",
            calls: [testWrite.call({ to: target })],
          },
        ],
      } as const;
      const partial = yield* executeWritePlan.effect(harness.config, { plan });

      assert.strictEqual(partial.status, "partial");
      assert.strictEqual(partial.currentStage, "configure");
      assert.strictEqual(partial.completedStages[0]?.id, "deploy");
      assert.instanceOf(partial.failure, WalletError);

      vi.mocked(harness.walletClient.sendTransaction).mockReset().mockResolvedValue(secondHash);
      const completed = yield* executeWritePlan.effect(harness.config, {
        plan,
        resume: partial,
      });

      assert.strictEqual(completed.status, "completed");
      assert.deepStrictEqual(
        completed.completedStages.map((stage) => stage.id),
        ["deploy", "configure"],
      );
      expect(harness.walletClient.sendTransaction).toHaveBeenCalledOnce();
    }),
  );
});
