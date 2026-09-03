---
title: getNames
description: Lists ENS names across the configured indexer sources.
---

# getNames

Lists ENS names across the configured indexer sources.

## Import

```ts
import { getNames } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { getNames } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await getNames(config, {
  filter: { protocol: "v2", includeUnreachable: false },
  order: { field: "createdAt", direction: "desc" },
  pageSize: 20,
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetNamesParametersType } from "@ensforge/core/indexer";
```

### filter

<!--@include: @/shared/indexer/name-filter.md-->

### order

<!--@include: @/shared/indexer/name-order.md-->

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetNamesResultType } from "@ensforge/core/indexer";
```

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

Enabled ENSv1 and ENSv2 sources are queried concurrently. Results are normalized, deduplicated, and merged into one stable page; partial mode records source failures in the result.

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getNames.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetNamesError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.getNames`](/sdk/api/indexer/names/get-names)
- [`useNames`](/react/api/hooks/indexer/names/use-names)
