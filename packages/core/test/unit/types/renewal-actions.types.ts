import type { Effect } from "effect";

import { expectTypeOf } from "vitest";

import {
  approveRenewalPayment,
  renewName,
  renewNames,
  type EnsWriteIntent,
  type EnsforgeConfig,
  type RenewNameResult,
  type RenewNamesResult,
  type WriteError,
  type CallExecutionResult,
} from "../../../src/index.js";

const config = {} as EnsforgeConfig;
const paymentToken = "0x0000000000000000000000000000000000000001" as const;
const renewal = { name: "phase18.eth", duration: 31_536_000n, paymentToken } as const;

expectTypeOf(renewName(config, renewal)).toEqualTypeOf<Promise<RenewNameResult>>();
expectTypeOf(renewName.effect(config, renewal)).toEqualTypeOf<
  Effect.Effect<RenewNameResult, WriteError>
>();
expectTypeOf(renewName.call(renewal)).toEqualTypeOf<
  EnsWriteIntent<CallExecutionResult, WriteError>
>();
expectTypeOf(approveRenewalPayment.call({ ...renewal, amount: 1n })).toEqualTypeOf<
  EnsWriteIntent<CallExecutionResult, WriteError>
>();
expectTypeOf(renewNames(config, { renewals: [renewal] })).toEqualTypeOf<
  Promise<RenewNamesResult>
>();
