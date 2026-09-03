---
title: useIndexedRecords
description: React hook that returns indexed resolver bindings and record inventories for one name.
---

# useIndexedRecords

React hook that returns indexed resolver bindings and record inventories for one name.

## Import

```tsx
import { useIndexedRecords } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useIndexedRecords } from "@ensforge/react";

function Component() {
  const result = useIndexedRecords({ name: "example.eth" });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetIndexedRecordsParameters } from "@ensforge/sdk/indexer";
```

### name

`string | undefined`

ENS name to look up. Provide either `name` or `namehash`; names are normalized before querying.

### namehash

`` `0x${string}` | undefined ``

Namehash to use when the plaintext name is unavailable. Provide either `namehash` or `name`.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useIndexedRecords>;
```

Successful `data` has type `GetIndexedRecordsResult`.

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useIndexedRecordsSuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useIndexedRecordsSuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useIndexedRecordsSuspense({ name: "example.eth" });
```

### Parameters

`useIndexedRecordsSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useIndexedRecordsSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getIndexedRecordsAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getIndexedRecordsAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getIndexedRecords`](/core/api/actions/indexer/records/get-indexed-records)
- [`sdk.indexer.getIndexedRecords`](/sdk/api/indexer/records/get-indexed-records)
