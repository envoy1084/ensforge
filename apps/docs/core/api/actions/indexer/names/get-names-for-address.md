---
title: getNamesForAddress
description: Lists ENS names related to an Ethereum address.
---

# getNamesForAddress

Lists ENS names related to an Ethereum address.

## Import

```ts
import { getNamesForAddress } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { getNamesForAddress } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await getNamesForAddress(config, {
  address: "0x0000000000000000000000000000000000000000",
  relations: ["owner", "resolved-address"],
  pageSize: 20,
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="indexer.getNamesForAddress" />

## Parameters

```ts
import type { GetNamesForAddressParametersType } from "@ensforge/core/indexer";
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
import type { GetNamesForAddressResultType } from "@ensforge/core/indexer";
```

Each item contains its normalized indexed name and the address `relation` that matched.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

Enabled ENSv1 and ENSv2 sources are queried concurrently. Results are normalized, deduplicated, and merged into one stable page; partial mode records source failures in the result.

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getNamesForAddress.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetNamesForAddressError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.getNamesForAddress`](/sdk/api/indexer/names/get-names-for-address)
- [`useNamesForAddress`](/react/api/hooks/indexer/names/use-names-for-address)
