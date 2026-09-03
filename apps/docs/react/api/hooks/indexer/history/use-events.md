---
title: useEvents
description: React hook that lists normalized ENS events across protocol versions.
---

# useEvents

React hook that lists normalized ENS events across protocol versions.

## Import

```tsx
import { useEvents } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useEvents } from "@ensforge/react";

function Component() {
  const result = useEvents({
    filter: { kinds: ["registration", "renewal"] },
    order: { direction: "desc" },
    pageSize: 20,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="indexer.getEvents" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetEventsParametersType } from "@ensforge/sdk/indexer";
```

### filter

<!--@include: @/shared/indexer/event-filter.md-->

### order

`{ direction: "asc" | "desc" } | undefined`

Orders by chain position. Defaults to descending.

<!--@include: @/shared/indexer/pagination-parameters.md-->

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useEvents>;
```

Successful `data` has type `GetEventsResultType`.

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useEventsSuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useEventsSuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useEventsSuspense({
  filter: { kinds: ["registration", "renewal"] },
  order: { direction: "desc" },
  pageSize: 20,
});
```

### Parameters

`useEventsSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useEventsSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getEventsAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getEventsAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getEvents`](/core/api/actions/indexer/history/get-events)
- [`sdk.indexer.getEvents`](/sdk/api/indexer/history/get-events)
