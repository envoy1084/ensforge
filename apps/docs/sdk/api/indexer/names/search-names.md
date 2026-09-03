---
title: searchNames
description: Searches indexed ENS names by label or full name.
---

# searchNames

Searches indexed ENS names by label or full name.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.indexer.searchNames({
  query: "example",
  field: "label",
  mode: "contains",
  pageSize: 20,
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { SearchNamesParametersType } from "@ensforge/sdk/indexer";
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
import type { SearchNamesResult } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

Search is pushed into every compatible enabled source and combined with the additional filters before pages are merged.

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.indexer.searchNames.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { SearchNamesError } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`searchNames`](/core/api/actions/indexer/names/search-names)

## Hook

- [`useSearchNames`](/react/api/hooks/indexer/names/use-search-names)
