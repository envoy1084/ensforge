---
title: useRecordHistory
description: React hook that lists normalized resolver-record changes across ENS protocols.
---

# useRecordHistory

React hook that lists normalized resolver-record changes across ENS protocols.

## Import

```tsx
import { useRecordHistory } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRecordHistory } from "@ensforge/react";

function Component() {
  const result = useRecordHistory({
    name: "example.eth",
    filter: { kinds: ["text", "address"] },
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
import type { GetRecordHistoryParametersType } from "@ensforge/sdk/indexer";
```

### name

`string | undefined`

ENS name to look up. Provide either `name` or `namehash`; names are normalized before querying.

### namehash

`` `0x${string}` | undefined ``

Namehash to use when the plaintext name is unavailable. Provide either `namehash` or `name`.

### filter

<!--@include: @/shared/indexer/record-history-filter.md-->

### order

`{ direction: "asc" | "desc" } | undefined`

Orders by chain position. Defaults to descending.

<!--@include: @/shared/indexer/pagination-parameters.md-->

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useRecordHistory>;
```

Successful `data` has type `GetRecordHistoryResultType`.

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useRecordHistorySuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useRecordHistorySuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useRecordHistorySuspense({
  name: "example.eth",
  filter: { kinds: ["text", "address"] },
  pageSize: 20,
});
```

### Parameters

`useRecordHistorySuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useRecordHistorySuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getRecordHistoryAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getRecordHistoryAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getRecordHistory`](/core/api/actions/indexer/records/get-record-history)
- [`sdk.indexer.getRecordHistory`](/sdk/api/indexer/records/get-record-history)
