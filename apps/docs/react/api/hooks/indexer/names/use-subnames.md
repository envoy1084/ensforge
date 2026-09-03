---
title: useSubnames
description: React hook that lists direct indexed subnames of an ENS name.
---

# useSubnames

React hook that lists direct indexed subnames of an ENS name.

## Import

```tsx
import { useSubnames } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSubnames } from "@ensforge/react";

function Component() {
  const result = useSubnames({
    name: "example.eth",
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
import type { GetSubnamesParametersType } from "@ensforge/sdk/indexer";
```

### name

`string`

Parent ENS name. Only direct children are returned.

### filter

<!--@include: @/shared/indexer/name-filter.md-->

### order

<!--@include: @/shared/indexer/name-order.md-->

<!--@include: @/shared/indexer/pagination-parameters.md-->

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useSubnames>;
```

Successful `data` has type `GetSubnamesResultType`.

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useSubnamesSuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useSubnamesSuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useSubnamesSuspense({
  name: "example.eth",
  pageSize: 20,
});
```

### Parameters

`useSubnamesSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useSubnamesSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getSubnamesAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getSubnamesAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getSubnames`](/core/api/actions/indexer/names/get-subnames)
- [`sdk.indexer.getSubnames`](/sdk/api/indexer/names/get-subnames)
