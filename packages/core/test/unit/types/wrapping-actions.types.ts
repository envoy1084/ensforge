import type { Effect } from "effect";

import { expectTypeOf } from "vitest";

import {
  extendSubnameExpiry,
  getFuses,
  getWrapperExpiry,
  setChildFuses,
  setFuses,
  unwrapName,
  wrapName,
  type EnsReadRequest,
  type EnsWriteIntent,
  type EnsforgeConfig,
  type GetFusesResult,
  type GetWrapperExpiryResult,
  type WrapperReadError,
  type WrapNameResult,
  type WrapperWriteError,
  type WrapperWriteResult,
} from "../../../src/index.js";

const config = {} as EnsforgeConfig;
const name = "sub.example.eth";
const address = "0x0000000000000000000000000000000000000001";

expectTypeOf(getFuses(config, { name })).toEqualTypeOf<Promise<GetFusesResult>>();
expectTypeOf(getFuses.request({ name })).toEqualTypeOf<
  EnsReadRequest<GetFusesResult, WrapperReadError>
>();
expectTypeOf(getWrapperExpiry(config, { name })).toEqualTypeOf<Promise<GetWrapperExpiryResult>>();
expectTypeOf(wrapName(config, { name, owner: address })).toEqualTypeOf<Promise<WrapNameResult>>();
expectTypeOf(wrapName.effect(config, { name, owner: address })).toEqualTypeOf<
  Effect.Effect<WrapNameResult, WrapperWriteError>
>();
expectTypeOf(unwrapName.call({ name, manager: address })).toEqualTypeOf<
  EnsWriteIntent<WrapperWriteResult, WrapperWriteError>
>();
expectTypeOf(setFuses.call({ name, fuses: ["cannotTransfer"] })).toEqualTypeOf<
  EnsWriteIntent<WrapperWriteResult, WrapperWriteError>
>();
expectTypeOf(
  setChildFuses.call({ name, fuses: ["parentCannotControl"], expiry: 1n }),
).toEqualTypeOf<EnsWriteIntent<WrapperWriteResult, WrapperWriteError>>();
expectTypeOf(extendSubnameExpiry.call({ name, expiry: 2n })).toEqualTypeOf<
  EnsWriteIntent<WrapperWriteResult, WrapperWriteError>
>();
