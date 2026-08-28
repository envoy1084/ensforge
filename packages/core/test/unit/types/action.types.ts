import { Effect } from "effect";

import { expectTypeOf } from "vitest";

import {
  defineAction,
  defineReadAction,
  defineWriteAction,
  getExpiry,
  getResolver,
  readBatch,
  readBatchSettled,
  type EnsReadRequest,
  type EnsWriteIntent,
  type EnsforgeConfig,
  type ExpiryResult,
  type GetExpiryError,
  type GetResolverError,
  type GetResolverResult,
  type ReadBatchOutcome,
  type RpcError,
} from "../../../src/index.js";

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
expectTypeOf(getExpiry(config, { name: "example.eth" })).toEqualTypeOf<
  Promise<ExpiryResult | null>
>();
expectTypeOf(getExpiry.effect(config, { name: "example.eth" })).toEqualTypeOf<
  Effect.Effect<ExpiryResult | null, GetExpiryError>
>();
expectTypeOf(getExpiry.request({ name: "example.eth" })).toEqualTypeOf<
  EnsReadRequest<ExpiryResult | null, GetExpiryError>
>();
expectTypeOf(getResolver(config, { name: "example.eth" })).toEqualTypeOf<
  Promise<GetResolverResult>
>();
expectTypeOf(getResolver.effect(config, { name: "example.eth" })).toEqualTypeOf<
  Effect.Effect<GetResolverResult, GetResolverError>
>();
expectTypeOf(getResolver.request({ name: "example.eth" })).toEqualTypeOf<
  EnsReadRequest<GetResolverResult, GetResolverError>
>();

const readRequest = readAction.request({ value: 1 });
const writeIntent = writeAction.call({ value: 1 });
const batchRequests = {
  value: readRequest,
  label: defineReadAction((_: EnsforgeConfig, value: string) => Effect.succeed(value)).request(
    "ens",
  ),
} as const;

expectTypeOf(readBatch(config, batchRequests)).toEqualTypeOf<
  Promise<{ readonly value: number; readonly label: string }>
>();
expectTypeOf(readBatch.effect(config, batchRequests)).toEqualTypeOf<
  Effect.Effect<{ readonly value: number; readonly label: string }, TestFailure | RpcError>
>();
expectTypeOf(readBatchSettled(config, batchRequests)).toEqualTypeOf<
  Promise<{
    readonly value: ReadBatchOutcome<number, TestFailure>;
    readonly label: ReadBatchOutcome<string, never>;
  }>
>();

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
