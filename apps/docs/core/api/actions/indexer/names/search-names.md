---
title: searchNames
description: Searches indexed ENS names by label or full name.
---

# searchNames

Searches indexed ENS names by label or full name.

## Import

```ts
import { searchNames } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { searchNames } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await searchNames(config, {
  query: "example",
  field: "label",
  mode: "contains",
  pageSize: 20,
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { SearchNamesParametersType } from "@ensforge/core/indexer";
```

### query

`string`

Non-empty search text.

### field

`"name" | "label" | undefined`

Field to search. Defaults to `"label"`.

### mode

`"contains" | "starts-with" | "ends-with" | undefined`

Matching strategy. Defaults to `"contains"`.

### filter

<!--@include: @/shared/indexer/name-filter.md-->

### order

<!--@include: @/shared/indexer/name-order.md-->

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { SearchNamesResult } from "@ensforge/core/indexer";
```

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

Search is pushed into every compatible enabled source and combined with the additional filters before pages are merged.

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = searchNames.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { SearchNamesError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.searchNames`](/sdk/api/indexer/names/search-names)
- [`useSearchNames`](/react/api/hooks/indexer/names/use-search-names)
