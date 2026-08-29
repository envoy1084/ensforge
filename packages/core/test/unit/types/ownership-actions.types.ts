import type { Effect } from "effect";

import { expectTypeOf } from "vitest";

import {
  getTtl,
  reclaimName,
  setManager,
  setTtl,
  transferName,
  transferRegistrant,
  type CallExecutionResult,
  type EnsWriteIntent,
  type EnsforgeConfig,
  type GetTtlResult,
  type GetTtlError,
  type TransferNameResult,
  type WriteError,
} from "../../../src/index.js";

const config = {} as EnsforgeConfig;
const name = "example.eth";
const address = "0x0000000000000000000000000000000000000001";

expectTypeOf(getTtl(config, { name })).toEqualTypeOf<Promise<GetTtlResult>>();
expectTypeOf(getTtl.effect(config, { name })).toEqualTypeOf<
  Effect.Effect<GetTtlResult, GetTtlError>
>();
expectTypeOf(setTtl.call({ name, ttl: 60n })).toEqualTypeOf<
  EnsWriteIntent<CallExecutionResult, WriteError>
>();
expectTypeOf(setManager.call({ name, manager: address })).toEqualTypeOf<
  EnsWriteIntent<CallExecutionResult, WriteError>
>();
expectTypeOf(transferRegistrant.call({ name, to: address })).toEqualTypeOf<
  EnsWriteIntent<CallExecutionResult, WriteError>
>();
expectTypeOf(reclaimName.call({ name, manager: address })).toEqualTypeOf<
  EnsWriteIntent<CallExecutionResult, WriteError>
>();
expectTypeOf(transferName(config, { name, to: address })).toEqualTypeOf<
  Promise<TransferNameResult>
>();
expectTypeOf(transferName.effect(config, { name, to: address })).toEqualTypeOf<
  Effect.Effect<TransferNameResult, WriteError>
>();
