import type { Effect } from "effect";

import { expectTypeOf } from "vitest";

import {
  claimDnsName,
  type ClaimDnsNameError,
  type ClaimDnsNameResult,
  type EnsWriteIntent,
  type EnsforgeConfig,
  importDnsName,
  type ImportDnsNameResult,
  type WriteError,
} from "../../../src/index.js";

const config = {} as EnsforgeConfig;
const parameters = {
  name: "ens.xyz",
  proof: [{ rrset: "0x1234", sig: "0xabcd" }],
} as const;

expectTypeOf(claimDnsName.call(parameters)).toEqualTypeOf<
  EnsWriteIntent<ClaimDnsNameResult, ClaimDnsNameError>
>();
expectTypeOf(claimDnsName(config, parameters)).toEqualTypeOf<Promise<ClaimDnsNameResult>>();
expectTypeOf(claimDnsName.effect(config, parameters)).toEqualTypeOf<
  Effect.Effect<ClaimDnsNameResult, ClaimDnsNameError>
>();
expectTypeOf(importDnsName(config, parameters)).toEqualTypeOf<Promise<ImportDnsNameResult>>();
expectTypeOf(importDnsName.effect(config, parameters)).toEqualTypeOf<
  Effect.Effect<ImportDnsNameResult, WriteError>
>();
