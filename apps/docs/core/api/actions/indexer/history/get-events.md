---
title: getEvents
description: Lists normalized ENS events across protocol versions.
---

# getEvents

Lists normalized ENS events across protocol versions.

## Import

```ts
import { getEvents } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { getEvents } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await getEvents(config, {
  filter: { kinds: ["registration", "renewal"] },
  order: { direction: "desc" },
  pageSize: 20,
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetEventsParametersType } from "@ensforge/core/indexer";
```

### filter

<!--@include: @/shared/indexer/event-filter.md-->

### order

`{ direction: "asc" | "desc" } | undefined`

Orders by chain position. Defaults to descending.

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetEventsResultType } from "@ensforge/core/indexer";
```

Items are discriminated by semantic `kind` and contain normalized chain position, protocol, name identity, raw metadata, and kind-specific fields.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

Compatible events from enabled ENSv1 and ENSv2 sources are normalized and merged by chain position.

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getEvents.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetEventsError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.getEvents`](/sdk/api/indexer/history/get-events)
- [`useEvents`](/react/api/hooks/indexer/history/use-events)
