import type { Effect } from "effect";

import { expectTypeOf } from "vitest";

import {
  approvePaymentToken,
  commitName,
  completeRegistration,
  registerName,
  registerNames,
  type EnsWriteIntent,
  type EnsforgeConfig,
  type RegisterNameResult,
  type RegisterNamesResult,
  type RegistrationWriteError,
  type RegistrationWriteResult,
} from "../../../src/index.js";

const config = {} as EnsforgeConfig;
const owner = "0x0000000000000000000000000000000000000001" as const;
const secret = "0x1111111111111111111111111111111111111111111111111111111111111111" as const;
const commitment = "0x2222222222222222222222222222222222222222222222222222222222222222" as const;
const registration = { name: "phase17.eth", owner, secret, duration: 31_536_000n } as const;

expectTypeOf(commitName.call({ commitment })).toEqualTypeOf<
  EnsWriteIntent<RegistrationWriteResult, RegistrationWriteError>
>();
expectTypeOf(approvePaymentToken.call({ paymentToken: owner, amount: 1n })).toEqualTypeOf<
  EnsWriteIntent<RegistrationWriteResult, RegistrationWriteError>
>();
expectTypeOf(completeRegistration.call(registration)).toEqualTypeOf<
  EnsWriteIntent<RegistrationWriteResult, RegistrationWriteError>
>();
expectTypeOf(registerName(config, registration)).toEqualTypeOf<Promise<RegisterNameResult>>();
expectTypeOf(registerName.effect(config, registration)).toEqualTypeOf<
  Effect.Effect<RegisterNameResult, RegistrationWriteError>
>();
expectTypeOf(registerNames(config, { registrations: [registration] })).toEqualTypeOf<
  Promise<RegisterNamesResult>
>();
