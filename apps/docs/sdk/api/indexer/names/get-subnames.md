---
title: getSubnames
description: Lists direct indexed subnames of an ENS name.
---

# getSubnames

Lists direct indexed subnames of an ENS name.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.indexer.getSubnames({
  name: "example.eth",
  pageSize: 20,
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetSubnamesParametersType } from "@ensforge/sdk/indexer";
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
import type { GetSubnamesResultType } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

Enabled ENSv1 and ENSv2 sources are queried concurrently. Results are normalized, deduplicated, and merged into one stable page; partial mode records source failures in the result.

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.indexer.getSubnames.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetSubnamesError } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getSubnames`](/core/api/actions/indexer/names/get-subnames)

## Hook

- [`useSubnames`](/react/api/hooks/indexer/names/use-subnames)
