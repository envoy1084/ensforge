import { Effect } from "effect";

import { defineAction } from "../../action/action.js";
import type { EnsforgeConfig } from "../../config/config.js";
import { WritePlanError } from "../../errors/write-plan-error.js";
import { provideConfig } from "../../internal/config/context.js";
import { viemErrorToEffectError } from "../../internal/errors/viem-error.js";
import { PublicClientService } from "../../internal/services/public-client.js";
import { executeSequential } from "../../internal/write/execute-sequential.js";
import type {
  CallExecutionResult,
  ExecuteWritePlanParameters,
  WriteError,
  WritePlanProgress,
  WriteStage,
  WriteStageResult,
  WriteWaitCondition,
} from "../../write/types.js";
import { sendCalls } from "./send-calls.js";

const waitIsComplete = Effect.fn("waitIsComplete")(function* (condition: WriteWaitCondition) {
  const { client } = yield* PublicClientService;
  const block = yield* Effect.tryPromise({
    try: () => client.getBlock({ blockTag: "latest" }),
    catch: (cause) => viemErrorToEffectError(cause, "getBlock"),
  });
  return condition.type === "block"
    ? block.number !== null && block.number >= condition.target
    : block.timestamp >= condition.target;
});

const validatePlan = (parameters: ExecuteWritePlanParameters): WritePlanError | undefined => {
  if (parameters.plan.stages.length === 0) {
    return new WritePlanError({
      code: "INVALID_CALL_PLAN",
      message: "A write plan must contain at least one stage",
      cause: parameters.plan,
    });
  }
  const ids = new Set(parameters.plan.stages.map((stage) => stage.id));
  if (ids.size !== parameters.plan.stages.length) {
    return new WritePlanError({
      code: "INVALID_CALL_PLAN",
      message: "Write plan stage identifiers must be unique",
      cause: parameters.plan,
    });
  }
  if (parameters.resume !== undefined && parameters.resume.planId !== parameters.plan.id) {
    return new WritePlanError({
      code: "INVALID_CALL_PLAN",
      message: "Write progress belongs to a different plan",
      cause: parameters.resume,
    });
  }
  const callStageIds = parameters.plan.stages
    .filter((stage) => stage.type === "calls")
    .map((stage) => stage.id);
  for (const [index, completed] of (parameters.resume?.completedStages ?? []).entries()) {
    if (callStageIds[index] !== completed.id) {
      return new WritePlanError({
        code: "INVALID_CALL_PLAN",
        message: "Write progress is not a valid prefix of the supplied plan",
        cause: parameters.resume,
      });
    }
  }
  return undefined;
};

const stageParameters = (
  stage: Extract<WriteStage, { readonly type: "calls" }>,
  parameters: ExecuteWritePlanParameters,
) => ({
  calls: stage.calls,
  mode: stage.mode ?? "auto",
  atomicity: stage.atomicity ?? "preferred",
  confirmation: stage.confirmation ?? ({ type: "confirmed" } as const),
  ...(parameters.walletClient === undefined ? {} : { walletClient: parameters.walletClient }),
  ...(parameters.account === undefined ? {} : { account: parameters.account }),
});

const executeWritePlanEffect = Effect.fn("ensforge.executeWritePlan")(function* (
  config: EnsforgeConfig,
  parameters: ExecuteWritePlanParameters,
): Effect.fn.Return<WritePlanProgress, WriteError> {
  const invalid = validatePlan(parameters);
  if (invalid !== undefined) return yield* invalid;

  const completed = [...(parameters.resume?.completedStages ?? [])];
  const completedIds = new Set(
    completed
      .filter((stage) => stage.result.mode !== "sequential" || stage.result.status !== "partial")
      .map((stage) => stage.id),
  );

  for (const stage of parameters.plan.stages) {
    if (stage.type === "wait") {
      const ready = yield* provideConfig(config, waitIsComplete(stage.condition));
      if (!ready) {
        return {
          planId: parameters.plan.id,
          status: "waiting",
          completedStages: completed,
          currentStage: stage.id,
          nextActionAt: stage.condition.target,
          failure: null,
        };
      }
      continue;
    }
    if (completedIds.has(stage.id)) continue;

    const previousIndex = completed.findIndex((result) => result.id === stage.id);
    const previous = previousIndex === -1 ? undefined : completed[previousIndex];
    const partial =
      previous?.result.mode === "sequential" && previous.result.status === "partial"
        ? previous.result
        : undefined;
    const confirmed = partial?.calls.filter((call) => call.status !== "not-started") ?? [];
    const remainingCalls = stage.calls.slice(confirmed.length);
    const result =
      partial === undefined
        ? yield* sendCalls.effect(config, stageParameters(stage, parameters))
        : yield* executeSequential(
            config,
            { ...stageParameters(stage, parameters), calls: remainingCalls, mode: "sequential" },
            confirmed.length,
          ).pipe(
            Effect.map((resumed) => ({
              mode: "sequential" as const,
              atomic: false as const,
              status: resumed.status,
              calls: [...confirmed, ...resumed.calls] as ReadonlyArray<CallExecutionResult>,
              failure: resumed.failure,
            })),
          );
    const stageResult = { id: stage.id, result } satisfies WriteStageResult;
    if (previousIndex === -1) completed.push(stageResult);
    else completed[previousIndex] = stageResult;
    if (result.mode === "sequential" && result.status === "partial") {
      return {
        planId: parameters.plan.id,
        status: "partial",
        completedStages: completed,
        currentStage: stage.id,
        nextActionAt: null,
        failure: result.failure,
      };
    }
  }

  return {
    planId: parameters.plan.id,
    status: "completed",
    completedStages: completed,
    currentStage: null,
    nextActionAt: null,
    failure: null,
  };
});

export const executeWritePlan = defineAction<
  ExecuteWritePlanParameters,
  WritePlanProgress,
  WriteError
>(executeWritePlanEffect);
