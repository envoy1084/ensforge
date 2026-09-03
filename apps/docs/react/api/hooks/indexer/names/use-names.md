---
title: useNames
description: React hook that lists ENS names across the configured indexer sources.
---

# useNames

React hook that lists ENS names across the configured indexer sources.

## Import

```tsx
import { useNames } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useNames } from "@ensforge/react";

function Component() {
  const result = useNames({
    filter: { protocol: "v2", includeUnreachable: false },
    order: { field: "createdAt", direction: "desc" },
    pageSize: 20,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetNamesParametersType } from "@ensforge/sdk/indexer";
```

### filter

<!--@include: @/shared/indexer/name-filter.md-->

### order

<!--@include: @/shared/indexer/name-order.md-->

<!--@include: @/shared/indexer/pagination-parameters.md-->

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useNames>;
```

Successful `data` has type `GetNamesResultType`.

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useNamesSuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useNamesSuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useNamesSuspense({
  filter: { protocol: "v2", includeUnreachable: false },
  order: { field: "createdAt", direction: "desc" },
  pageSize: 20,
});
```

### Parameters

`useNamesSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useNamesSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getNamesAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getNamesAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getNames`](/core/api/actions/indexer/names/get-names)
- [`sdk.indexer.getNames`](/sdk/api/indexer/names/get-names)
