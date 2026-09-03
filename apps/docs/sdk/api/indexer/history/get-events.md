---
title: getEvents
description: Lists normalized ENS events across protocol versions.
---

# getEvents

Lists normalized ENS events across protocol versions.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.indexer.getEvents({
  filter: { kinds: ["registration", "renewal"] },
  order: { direction: "desc" },
  pageSize: 20,
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetEventsParametersType } from "@ensforge/sdk/indexer";
```

### filter

<!--@include: @/shared/indexer/event-filter.md-->

### order

`{ direction: "asc" | "desc" } | undefined`

Orders by chain position. Defaults to descending.

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetEventsResultType } from "@ensforge/sdk/indexer";
```

Items are discriminated by semantic `kind` and contain normalized chain position, protocol, name identity, raw metadata, and kind-specific fields.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

Compatible events from enabled ENSv1 and ENSv2 sources are normalized and merged by chain position.

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.indexer.getEvents.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetEventsError } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getEvents`](/core/api/actions/indexer/history/get-events)

## Hook

- [`useEvents`](/react/api/hooks/indexer/history/use-events)
