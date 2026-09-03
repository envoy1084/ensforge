---
title: getNames
description: Lists ENS names across the configured indexer sources.
---

# getNames

Lists ENS names across the configured indexer sources.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.indexer.getNames({
  filter: { protocol: "v2", includeUnreachable: false },
  order: { field: "createdAt", direction: "desc" },
  pageSize: 20,
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetNamesParametersType } from "@ensforge/sdk/indexer";
```

### filter

<!--@include: @/shared/indexer/name-filter.md-->

### order

<!--@include: @/shared/indexer/name-order.md-->

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetNamesResultType } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

Enabled ENSv1 and ENSv2 sources are queried concurrently. Results are normalized, deduplicated, and merged into one stable page; partial mode records source failures in the result.

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.indexer.getNames.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetNamesError } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getNames`](/core/api/actions/indexer/names/get-names)

## Hook

- [`useNames`](/react/api/hooks/indexer/names/use-names)
