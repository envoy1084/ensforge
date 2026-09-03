---
title: useIndexerStatus
description: React hook that returns health and indexed-block metadata for every configured indexer source.
---

# useIndexerStatus

React hook that returns health and indexed-block metadata for every configured indexer source.

## Import

```tsx
import { useIndexerStatus } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useIndexerStatus } from "@ensforge/react";

function Component() {
  const result = useIndexerStatus({});

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="indexer.getIndexerStatus" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
```

This operation does not accept parameters.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useIndexerStatus>;
```

Successful `data` has type `IndexerStatusType`.

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useIndexerStatusSuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useIndexerStatusSuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useIndexerStatusSuspense({});
```

### Parameters

`useIndexerStatusSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useIndexerStatusSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getIndexerStatusAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getIndexerStatusAtom(sdk, {}, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getIndexerStatus`](/core/api/actions/indexer/get-indexer-status)
- [`sdk.indexer.getIndexerStatus`](/sdk/api/indexer/get-indexer-status)
