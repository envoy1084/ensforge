---
title: useRegistrationHistory
description: React hook that lists registration and renewal history for one ENS name.
---

# useRegistrationHistory

React hook that lists registration and renewal history for one ENS name.

## Import

```tsx
import { useRegistrationHistory } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRegistrationHistory } from "@ensforge/react";

function Component() {
  const result = useRegistrationHistory({
    name: "example.eth",
    pageSize: 20,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="indexer.getRegistrationHistory" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetRegistrationHistoryParameters } from "@ensforge/sdk/indexer";
```

### name

`string | undefined`

ENS name to look up. Provide either `name` or `namehash`; names are normalized before querying.

### namehash

`` `0x${string}` | undefined ``

Namehash to use when the plaintext name is unavailable. Provide either `namehash` or `name`.

<!--@include: @/shared/indexer/pagination-parameters.md-->

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useRegistrationHistory>;
```

Successful `data` has type `GetRegistrationHistoryResult`.

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useRegistrationHistorySuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useRegistrationHistorySuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useRegistrationHistorySuspense({
  name: "example.eth",
  pageSize: 20,
});
```

### Parameters

`useRegistrationHistorySuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useRegistrationHistorySuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getRegistrationHistoryAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getRegistrationHistoryAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getRegistrationHistory`](/core/api/actions/indexer/history/get-registration-history)
- [`sdk.indexer.getRegistrationHistory`](/sdk/api/indexer/history/get-registration-history)
