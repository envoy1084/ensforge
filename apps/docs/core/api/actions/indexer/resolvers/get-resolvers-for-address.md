---
title: getResolversForAddress
description: Lists ENSv2 resolvers owned by an address.
---

# getResolversForAddress

Lists ENSv2 resolvers owned by an address.

## Import

```ts
import { getResolversForAddress } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { getResolversForAddress } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await getResolversForAddress(config, {
  address: "0x0000000000000000000000000000000000000000",
  pageSize: 20,
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="indexer.getResolversForAddress" />

## Parameters

```ts
import type { GetResolversForAddressParametersType } from "@ensforge/core/indexer";
```

### address

`0x${string}`

Resolver owner address to match.

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetResolversForAddressResultType } from "@ensforge/core/indexer";
```

When supported, each item contains resolver address, owner, node count, aliases, role-holder count, and source.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

<!--@include: @/shared/indexer/v2-result.md-->

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getResolversForAddress.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetResolversForAddressError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.getResolversForAddress`](/sdk/api/indexer/resolvers/get-resolvers-for-address)
- [`useResolversForAddress`](/react/api/hooks/indexer/resolvers/use-resolvers-for-address)
