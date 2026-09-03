---
title: getResolversForAddress
description: Lists ENSv2 resolvers owned by an address.
---

# getResolversForAddress

Lists ENSv2 resolvers owned by an address.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.indexer.getResolversForAddress({
  address: "0x0000000000000000000000000000000000000000",
  pageSize: 20,
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="indexer.getResolversForAddress" />

## Parameters

```ts
import type { GetResolversForAddressParametersType } from "@ensforge/sdk/indexer";
```

### address

`0x${string}`

Resolver owner address to match.

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetResolversForAddressResultType } from "@ensforge/sdk/indexer";
```

When supported, each item contains resolver address, owner, node count, aliases, role-holder count, and source.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

<!--@include: @/shared/indexer/v2-result.md-->

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.indexer.getResolversForAddress.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetResolversForAddressError } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getResolversForAddress`](/core/api/actions/indexer/resolvers/get-resolvers-for-address)

## Hook

- [`useResolversForAddress`](/react/api/hooks/indexer/resolvers/use-resolvers-for-address)
