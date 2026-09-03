---
title: useIndexedNameHistory
description: React hook that lists normalized indexed history for one ENS name.
---

# useIndexedNameHistory

React hook that lists normalized indexed history for one ENS name.

## Import

```tsx
import { useIndexedNameHistory } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useIndexedNameHistory } from "@ensforge/react";

function Component() {
  const result = useIndexedNameHistory({
    name: "example.eth",
    kinds: ["transfer", "resolver", "record"],
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
import type { GetNameHistoryParameters } from "@ensforge/sdk/indexer";
```

### name

`string | undefined`

ENS name to look up. Provide either `name` or `namehash`; names are normalized before querying.

### namehash

`` `0x${string}` | undefined ``

Namehash to use when the plaintext name is unavailable. Provide either `namehash` or `name`.

### kinds

`readonly IndexedEventKind[] | undefined`

Semantic event kinds to include. Omitting it includes every compatible kind.

<!--@include: @/shared/indexer/pagination-parameters.md-->

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useIndexedNameHistory>;
```

Successful `data` has type `GetNameHistoryResult`.

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useIndexedNameHistorySuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useIndexedNameHistorySuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useIndexedNameHistorySuspense({
  name: "example.eth",
  kinds: ["transfer", "resolver", "record"],
  pageSize: 20,
});
```

### Parameters

`useIndexedNameHistorySuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useIndexedNameHistorySuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getIndexedNameHistoryAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getIndexedNameHistoryAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getNameHistory`](/core/api/actions/indexer/history/get-name-history)
- [`sdk.indexer.getNameHistory`](/sdk/api/indexer/history/get-name-history)
