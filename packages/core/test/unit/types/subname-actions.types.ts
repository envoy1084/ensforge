import type { Effect } from "effect";

import { expectTypeOf } from "vitest";

import {
  createSubname,
  deleteSubname,
  setSubnameExpiry,
  setSubnameManager,
  setSubnameRecord,
  setSubnameResolver,
  transferSubname,
  type CallExecutionResult,
  type CreateSubnameResult,
  type EnsWriteIntent,
  type EnsforgeConfig,
  type SetSubnameRecordResult,
  type TransferNameResult,
  type WriteError,
} from "../../../src/index.js";

const config = {} as EnsforgeConfig;
const name = "app.example.eth";
const address = "0x0000000000000000000000000000000000000001";

expectTypeOf(createSubname(config, { name, owner: address })).toEqualTypeOf<
  Promise<CreateSubnameResult>
>();
expectTypeOf(createSubname.effect(config, { name, owner: address })).toEqualTypeOf<
  Effect.Effect<CreateSubnameResult, WriteError>
>();
expectTypeOf(deleteSubname.call({ name })).toEqualTypeOf<
  EnsWriteIntent<CallExecutionResult, WriteError>
>();
expectTypeOf(setSubnameManager.call({ name, manager: address })).toEqualTypeOf<
  EnsWriteIntent<CallExecutionResult, WriteError>
>();
expectTypeOf(setSubnameResolver.call({ name, resolver: address })).toEqualTypeOf<
  EnsWriteIntent<CallExecutionResult, WriteError>
>();
expectTypeOf(setSubnameExpiry.call({ name, expiry: 1n })).toEqualTypeOf<
  EnsWriteIntent<CallExecutionResult, WriteError>
>();
expectTypeOf(setSubnameRecord(config, { name, owner: address })).toEqualTypeOf<
  Promise<SetSubnameRecordResult>
>();
expectTypeOf(transferSubname(config, { name, to: address })).toEqualTypeOf<
  Promise<TransferNameResult>
>();
