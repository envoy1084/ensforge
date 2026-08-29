import { Effect } from "effect";

import { expectTypeOf } from "vitest";

import {
  defineAction,
  defineReadAction,
  defineWriteAction,
  getAbi,
  getAddress,
  getAddresses,
  getAvatar,
  getContentHash,
  getData,
  getExpiry,
  getInterface,
  getName,
  getPrimaryName,
  getPubkey,
  getRecords,
  getResolver,
  getText,
  getTexts,
  readBatch,
  readBatchSettled,
  resolve,
  resolveBatch,
  resolveWithResolver,
  setText,
  type EnsReadRequest,
  type EnsWriteIntent,
  type EnsforgeConfig,
  type AbiResult,
  type ExpiryResult,
  type AddressResult,
  type AvatarResult,
  type ContentHashResult,
  type DataResult,
  type GetAbiError,
  type GetAddressError,
  type GetAddressesError,
  type GetAvatarError,
  type GetContentHashError,
  type GetDataError,
  type GetExpiryError,
  type GetInterfaceError,
  type GetNameError,
  type GetPrimaryNameError,
  type GetPubkeyError,
  type GetRecordsError,
  type GetResolverError,
  type GetResolverResult,
  type GetTextError,
  type GetTextsError,
  type ReadBatchOutcome,
  type RpcError,
  type ResolveBatchError,
  type ResolveBatchResult,
  type ResolveError,
  type ResolveResult,
  type ResolveWithResolverError,
  type ResolveWithResolverResult,
  type SetTextError,
  type SetTextResult,
  type InterfaceResult,
  type NameResult,
  type PrimaryNameResult,
  type PubkeyResult,
  type GetRecordsResult,
  type TextResult,
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
expectTypeOf(
  setText(config, { name: "example.eth", key: "url", value: "https://example.com" }),
).toEqualTypeOf<Promise<SetTextResult>>();
expectTypeOf(
  setText.effect(config, { name: "example.eth", key: "url", value: "https://example.com" }),
).toEqualTypeOf<Effect.Effect<SetTextResult, SetTextError>>();
expectTypeOf(
  setText.call({ name: "example.eth", key: "url", value: "https://example.com" }),
).toEqualTypeOf<EnsWriteIntent<SetTextResult, SetTextError>>();
expectTypeOf(getExpiry(config, { name: "example.eth" })).toEqualTypeOf<
  Promise<ExpiryResult | null>
>();
expectTypeOf(getExpiry.effect(config, { name: "example.eth" })).toEqualTypeOf<
  Effect.Effect<ExpiryResult | null, GetExpiryError>
>();
expectTypeOf(getExpiry.request({ name: "example.eth" })).toEqualTypeOf<
  EnsReadRequest<ExpiryResult | null, GetExpiryError>
>();
expectTypeOf(getAbi(config, { name: "example.eth" })).toEqualTypeOf<Promise<AbiResult>>();
expectTypeOf(
  getAbi.effect(config, { name: "example.eth", contentTypes: ["json", "uri"] }),
).toEqualTypeOf<Effect.Effect<AbiResult, GetAbiError>>();
expectTypeOf(getAbi.request({ name: "example.eth" })).toEqualTypeOf<
  EnsReadRequest<AbiResult, GetAbiError>
>();
expectTypeOf(getAddress(config, { name: "example.eth" })).toEqualTypeOf<Promise<AddressResult>>();
expectTypeOf(getAddress.effect(config, { name: "example.eth" })).toEqualTypeOf<
  Effect.Effect<AddressResult, GetAddressError>
>();
expectTypeOf(getAddress.request({ name: "example.eth" })).toEqualTypeOf<
  EnsReadRequest<AddressResult, GetAddressError>
>();
expectTypeOf(getAddresses(config, { name: "example.eth", coinTypes: [60n] })).toEqualTypeOf<
  Promise<ReadonlyArray<AddressResult>>
>();
expectTypeOf(getAddresses.effect(config, { name: "example.eth", coinTypes: [60n] })).toEqualTypeOf<
  Effect.Effect<ReadonlyArray<AddressResult>, GetAddressesError>
>();
expectTypeOf(getAvatar(config, { name: "example.eth" })).toEqualTypeOf<Promise<AvatarResult>>();
expectTypeOf(
  getAvatar.effect(config, {
    name: "example.eth",
    gatewayUrls: { ipfs: "https://ipfs.example" },
  }),
).toEqualTypeOf<Effect.Effect<AvatarResult, GetAvatarError>>();
expectTypeOf(getAvatar.request({ name: "example.eth" })).toEqualTypeOf<
  EnsReadRequest<AvatarResult, GetAvatarError>
>();
expectTypeOf(getContentHash(config, { name: "example.eth" })).toEqualTypeOf<
  Promise<ContentHashResult>
>();
expectTypeOf(getContentHash.effect(config, { name: "example.eth" })).toEqualTypeOf<
  Effect.Effect<ContentHashResult, GetContentHashError>
>();
expectTypeOf(getContentHash.request({ name: "example.eth" })).toEqualTypeOf<
  EnsReadRequest<ContentHashResult, GetContentHashError>
>();
expectTypeOf(getData(config, { name: "example.eth", key: "com.example.data" })).toEqualTypeOf<
  Promise<DataResult>
>();
expectTypeOf(
  getData.effect(config, { name: "example.eth", key: "com.example.data" }),
).toEqualTypeOf<Effect.Effect<DataResult, GetDataError>>();
expectTypeOf(getData.request({ name: "example.eth", key: "com.example.data" })).toEqualTypeOf<
  EnsReadRequest<DataResult, GetDataError>
>();
expectTypeOf(
  getInterface(config, { name: "example.eth", interfaceId: "0x01ffc9a7" }),
).toEqualTypeOf<Promise<InterfaceResult>>();
expectTypeOf(
  getInterface.effect(config, { name: "example.eth", interfaceId: "0x01ffc9a7" }),
).toEqualTypeOf<Effect.Effect<InterfaceResult, GetInterfaceError>>();
expectTypeOf(
  getInterface.request({ name: "example.eth", interfaceId: "0x01ffc9a7" }),
).toEqualTypeOf<EnsReadRequest<InterfaceResult, GetInterfaceError>>();
expectTypeOf(getPubkey(config, { name: "example.eth" })).toEqualTypeOf<Promise<PubkeyResult>>();
expectTypeOf(getPubkey.effect(config, { name: "example.eth" })).toEqualTypeOf<
  Effect.Effect<PubkeyResult, GetPubkeyError>
>();
expectTypeOf(getPubkey.request({ name: "example.eth" })).toEqualTypeOf<
  EnsReadRequest<PubkeyResult, GetPubkeyError>
>();
const selectedRecords = {
  addresses: [60n],
  avatar: true,
  texts: ["email"],
} as const;
expectTypeOf(getRecords(config, { name: "example.eth", records: selectedRecords })).toEqualTypeOf<
  Promise<
    GetRecordsResult<{
      readonly addresses: readonly [60n];
      readonly avatar: true;
      readonly texts: readonly ["email"];
    }>
  >
>();
expectTypeOf(
  getRecords.effect(config, { name: "example.eth", records: selectedRecords }),
).toEqualTypeOf<Effect.Effect<GetRecordsResult<typeof selectedRecords>, GetRecordsError>>();
expectTypeOf(getRecords.request({ name: "example.eth", records: selectedRecords })).toEqualTypeOf<
  EnsReadRequest<GetRecordsResult<typeof selectedRecords>, GetRecordsError>
>();
const profile = {} as GetRecordsResult<typeof selectedRecords>;
expectTypeOf(profile.avatar).toEqualTypeOf<AvatarResult>();
expectTypeOf(profile.addresses).toEqualTypeOf<ReadonlyArray<AddressResult>>();
// @ts-expect-error Unselected result fields are omitted.
const unselectedPubkey = profile.pubkey;
expectTypeOf(getName(config, { name: "1234.addr.reverse" })).toEqualTypeOf<Promise<NameResult>>();
expectTypeOf(getName.effect(config, { name: "1234.addr.reverse" })).toEqualTypeOf<
  Effect.Effect<NameResult, GetNameError>
>();
expectTypeOf(getName.request({ name: "1234.addr.reverse" })).toEqualTypeOf<
  EnsReadRequest<NameResult, GetNameError>
>();
expectTypeOf(getPrimaryName(config, { address: "0x1234" })).toEqualTypeOf<
  Promise<PrimaryNameResult>
>();
expectTypeOf(getPrimaryName.effect(config, { address: "0x1234" })).toEqualTypeOf<
  Effect.Effect<PrimaryNameResult, GetPrimaryNameError>
>();
expectTypeOf(getPrimaryName.request({ address: "0x1234" })).toEqualTypeOf<
  EnsReadRequest<PrimaryNameResult, GetPrimaryNameError>
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
expectTypeOf(getText(config, { name: "example.eth", key: "email" })).toEqualTypeOf<
  Promise<TextResult>
>();
expectTypeOf(getText.effect(config, { name: "example.eth", key: "email" })).toEqualTypeOf<
  Effect.Effect<TextResult, GetTextError>
>();
expectTypeOf(getText.request({ name: "example.eth", key: "email" })).toEqualTypeOf<
  EnsReadRequest<TextResult, GetTextError>
>();
expectTypeOf(getTexts(config, { name: "example.eth", keys: ["email"] })).toEqualTypeOf<
  Promise<ReadonlyArray<TextResult>>
>();
expectTypeOf(getTexts.effect(config, { name: "example.eth", keys: ["email"] })).toEqualTypeOf<
  Effect.Effect<ReadonlyArray<TextResult>, GetTextsError>
>();
expectTypeOf(resolve(config, { name: "example.eth", data: "0x1234" })).toEqualTypeOf<
  Promise<ResolveResult>
>();
expectTypeOf(resolve.effect(config, { name: "example.eth", data: "0x1234" })).toEqualTypeOf<
  Effect.Effect<ResolveResult, ResolveError>
>();
expectTypeOf(resolve.request({ name: "example.eth", data: "0x1234" })).toEqualTypeOf<
  EnsReadRequest<ResolveResult, ResolveError>
>();
expectTypeOf(
  resolveWithResolver(config, {
    name: "example.eth",
    data: "0x1234",
    resolverAddress: "0x1234",
  }),
).toEqualTypeOf<Promise<ResolveWithResolverResult>>();
expectTypeOf(
  resolveWithResolver.effect(config, {
    name: "example.eth",
    data: "0x1234",
    resolverAddress: "0x1234",
    gateways: ["https://gateway.example/{sender}/{data}.json"],
  }),
).toEqualTypeOf<Effect.Effect<ResolveWithResolverResult, ResolveWithResolverError>>();
expectTypeOf(
  resolveBatch(config, {
    calls: [
      { name: "alice.eth", data: "0x1234" },
      { name: "bob.eth", data: "0xabcd", resolverAddress: "0x1234", gateways: [] },
    ],
  }),
).toEqualTypeOf<Promise<ResolveBatchResult>>();
expectTypeOf(
  resolveBatch.effect(config, { calls: [{ name: "alice.eth", data: "0x1234" }] }),
).toEqualTypeOf<Effect.Effect<ResolveBatchResult, ResolveBatchError>>();

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
void unselectedPubkey;
