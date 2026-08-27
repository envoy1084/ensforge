import { Effect } from "effect";

import { expectTypeOf } from "vitest";

import {
  defineAction,
  defineReadAction,
  defineWriteAction,
  type EnsReadRequest,
  type EnsWriteIntent,
  type EnsforgeConfig,
} from "../../src/index.js";

type TestFailure = { readonly _tag: "TestFailure" };

const config = {} as EnsforgeConfig;
const implementation = (_: EnsforgeConfig, input: { readonly value: number }) =>
  Effect.succeed(input.value).pipe(Effect.mapError((): TestFailure => ({ _tag: "TestFailure" })));

const action = defineAction(implementation);
const readAction = defineReadAction(implementation);
const writeAction = defineWriteAction("setValue", implementation);

expectTypeOf(action(config, { value: 1 })).toEqualTypeOf<Promise<number>>();
expectTypeOf(action.effect(config, { value: 1 })).toEqualTypeOf<
  Effect.Effect<number, TestFailure>
>();
expectTypeOf(readAction.request({ value: 1 })).toEqualTypeOf<EnsReadRequest<number, TestFailure>>();
expectTypeOf(writeAction.call({ value: 1 })).toEqualTypeOf<EnsWriteIntent<number, TestFailure>>();

const readRequest = readAction.request({ value: 1 });
const writeIntent = writeAction.call({ value: 1 });

// @ts-expect-error Read requests and write intents are intentionally incompatible.
const invalidReadRequest: EnsReadRequest<number, TestFailure> = writeIntent;
// @ts-expect-error Write intents and read requests are intentionally incompatible.
const invalidWriteIntent: EnsWriteIntent<number, TestFailure> = readRequest;
// @ts-expect-error Action extensions are readonly.
readAction.request = (_parameters) => readRequest;
// @ts-expect-error The canonical Effect implementation is readonly.
action.effect = implementation;

void invalidReadRequest;
void invalidWriteIntent;
