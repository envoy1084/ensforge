import type { Effect } from "effect";

import { expectTypeOf } from "vitest";

import {
  clearPrimaryName,
  type EnsWriteIntent,
  type EnsforgeConfig,
  setContractPrimaryName,
  setPrimaryName,
  setPrimaryNameForAddress,
  type ReverseNameWriteError,
  type ReverseNameWriteResult,
} from "../../../src/index.js";

const config = {} as EnsforgeConfig;
const address = "0x0000000000000000000000000000000000000001";

expectTypeOf(setPrimaryName.call({ name: "ens.eth" })).toEqualTypeOf<
  EnsWriteIntent<ReverseNameWriteResult, ReverseNameWriteError>
>();
expectTypeOf(clearPrimaryName.call({})).toEqualTypeOf<
  EnsWriteIntent<ReverseNameWriteResult, ReverseNameWriteError>
>();
expectTypeOf(setPrimaryNameForAddress.call({ address, name: "ens.eth" })).toEqualTypeOf<
  EnsWriteIntent<ReverseNameWriteResult, ReverseNameWriteError>
>();
expectTypeOf(setContractPrimaryName.call({ contract: address, name: "ens.eth" })).toEqualTypeOf<
  EnsWriteIntent<ReverseNameWriteResult, ReverseNameWriteError>
>();
expectTypeOf(setPrimaryName(config, { name: "ens.eth" })).toEqualTypeOf<
  Promise<ReverseNameWriteResult>
>();
expectTypeOf(setPrimaryName.effect(config, { name: "ens.eth" })).toEqualTypeOf<
  Effect.Effect<ReverseNameWriteResult, ReverseNameWriteError>
>();
