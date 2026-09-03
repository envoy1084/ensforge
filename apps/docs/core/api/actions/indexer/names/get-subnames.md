---
title: getSubnames
description: Lists direct indexed subnames of an ENS name.
---

# getSubnames

Lists direct indexed subnames of an ENS name.

## Import

```ts
import { getSubnames } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { getSubnames } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await getSubnames(config, {
  name: "example.eth",
  pageSize: 20,
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="indexer.getSubnames" />

## Parameters

```ts
import type { GetSubnamesParametersType } from "@ensforge/core/indexer";
```

### name

`string`

Parent ENS name. Only direct children are returned.

### filter

<!--@include: @/shared/indexer/name-filter.md-->

### order

<!--@include: @/shared/indexer/name-order.md-->

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetSubnamesResultType } from "@ensforge/core/indexer";
```

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

Enabled ENSv1 and ENSv2 sources are queried concurrently. Results are normalized, deduplicated, and merged into one stable page; partial mode records source failures in the result.

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getSubnames.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetSubnamesError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.getSubnames`](/sdk/api/indexer/names/get-subnames)
- [`useSubnames`](/react/api/hooks/indexer/names/use-subnames)
