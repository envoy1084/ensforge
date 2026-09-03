---
title: getNamesForAddress
description: Lists ENS names related to an Ethereum address.
---

# getNamesForAddress

Lists ENS names related to an Ethereum address.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.indexer.getNamesForAddress({
  address: "0x0000000000000000000000000000000000000000",
  relations: ["owner", "resolved-address"],
  pageSize: 20,
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="indexer.getNamesForAddress" />

## Parameters

```ts
import type { GetNamesForAddressParametersType } from "@ensforge/sdk/indexer";
```

### address

`0x${string}`

Address used for relation matching.

### relations

`readonly NameRelation[] | undefined`

Relations such as `"owner"`, `"registrant"`, `"wrapped-owner"`, or `"resolved-address"`. Defaults to effective ownership.

### filter

<!--@include: @/shared/indexer/name-filter.md-->

### order

<!--@include: @/shared/indexer/name-order.md-->

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetNamesForAddressResultType } from "@ensforge/sdk/indexer";
```

Each item contains its normalized indexed name and the address `relation` that matched.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

Enabled ENSv1 and ENSv2 sources are queried concurrently. Results are normalized, deduplicated, and merged into one stable page; partial mode records source failures in the result.

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.indexer.getNamesForAddress.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetNamesForAddressError } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getNamesForAddress`](/core/api/actions/indexer/names/get-names-for-address)

## Hook

- [`useNamesForAddress`](/react/api/hooks/indexer/names/use-names-for-address)
