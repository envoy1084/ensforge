---
title: useSearchNames
description: React hook that searches indexed ENS names by label or full name.
---

# useSearchNames

React hook that searches indexed ENS names by label or full name.

## Import

```tsx
import { useSearchNames } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSearchNames } from "@ensforge/react";

function Component() {
  const result = useSearchNames({
    query: "example",
    field: "label",
    mode: "contains",
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

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useSearchNames>;
```

Successful `data` has type `SearchNamesResult`.

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useSearchNamesSuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useSearchNamesSuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useSearchNamesSuspense({
  query: "example",
  field: "label",
  mode: "contains",
  pageSize: 20,
});
```

### Parameters

`useSearchNamesSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useSearchNamesSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { searchNamesAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = searchNamesAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`searchNames`](/core/api/actions/indexer/names/search-names)
- [`sdk.indexer.searchNames`](/sdk/api/indexer/names/search-names)
