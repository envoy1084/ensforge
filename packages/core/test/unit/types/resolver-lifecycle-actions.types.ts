import type { Effect } from "effect";

import { expectTypeOf } from "vitest";

import {
  createResolver,
  getOrCreateResolver,
  predictResolverAddress,
  setResolver,
  setResolverAndRecords,
  upgradeResolver,
  type CreateResolverResult,
  type EnsWriteIntent,
  type EnsforgeConfig,
  type EthereumAddress,
  type GetOrCreateResolverResult,
  type SetResolverAndRecordsResult,
  type SetResolverError,
  type SetResolverResult,
  type UpgradeResolverResult,
  type WriteError,
} from "../../../src/index.js";

const config = {} as EnsforgeConfig;
const resolver = "0x0000000000000000000000000000000000000001";
const name = "example.eth";

expectTypeOf(setResolver(config, { name, resolver })).toEqualTypeOf<Promise<SetResolverResult>>();
expectTypeOf(setResolver.effect(config, { name, resolver })).toEqualTypeOf<
  Effect.Effect<SetResolverResult, SetResolverError>
>();
expectTypeOf(setResolver.call({ name, resolver })).toEqualTypeOf<
  EnsWriteIntent<SetResolverResult, SetResolverError>
>();

expectTypeOf(createResolver(config, { salt: 1n })).toEqualTypeOf<Promise<CreateResolverResult>>();
expectTypeOf(predictResolverAddress(config, { salt: 1n })).toEqualTypeOf<
  Promise<EthereumAddress>
>();
expectTypeOf(getOrCreateResolver(config, { name })).toEqualTypeOf<
  Promise<GetOrCreateResolverResult>
>();
expectTypeOf(upgradeResolver(config, { name })).toEqualTypeOf<Promise<UpgradeResolverResult>>();

const workflow = {
  name,
  records: [{ type: "text" as const, key: "url", value: "https://example.com" }],
};
expectTypeOf(setResolverAndRecords(config, workflow)).toEqualTypeOf<
  Promise<SetResolverAndRecordsResult>
>();
expectTypeOf(setResolverAndRecords.effect(config, workflow)).toEqualTypeOf<
  Effect.Effect<SetResolverAndRecordsResult, WriteError>
>();
