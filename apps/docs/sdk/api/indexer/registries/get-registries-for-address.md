---
title: getRegistriesForAddress
description: Lists ENSv2 registries owned by an address.
---

# getRegistriesForAddress

Lists ENSv2 registries owned by an address.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.indexer.getRegistriesForAddress({
  address: "0x0000000000000000000000000000000000000000",
  pageSize: 20,
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="indexer.getRegistriesForAddress" />

## Parameters

```ts
import type { GetRegistriesForAddressParametersType } from "@ensforge/sdk/indexer";
```

### address

`0x${string}`

Registry owner address to match.

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetRegistriesForAddressResultType } from "@ensforge/sdk/indexer";
```

When supported, `value` is a page of registries with managed names, ownership, parent, creation metadata, and aggregate counts.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

<!--@include: @/shared/indexer/v2-result.md-->

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.indexer.getRegistriesForAddress.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetRegistriesForAddressError } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getRegistriesForAddress`](/core/api/actions/indexer/registries/get-registries-for-address)

## Hook

- [`useRegistriesForAddress`](/react/api/hooks/indexer/registries/use-registries-for-address)
