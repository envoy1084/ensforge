---
title: useResolvedNamesForAddress
description: React hook that lists names whose indexed resolved address matches an Ethereum address.
---

# useResolvedNamesForAddress

React hook that lists names whose indexed resolved address matches an Ethereum address.

## Import

```tsx
import { useResolvedNamesForAddress } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useResolvedNamesForAddress } from "@ensforge/react";

function Component() {
  const result = useResolvedNamesForAddress({
    address: "0x0000000000000000000000000000000000000000",
    pageSize: 20,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="indexer.getResolvedNamesForAddress" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetResolvedNamesForAddressParametersType } from "@ensforge/sdk/indexer";
```

### address

`0x${string}`

Address matched against indexed resolution data.

### filter

<!--@include: @/shared/indexer/name-filter.md-->

### order

<!--@include: @/shared/indexer/name-order.md-->

<!--@include: @/shared/indexer/pagination-parameters.md-->

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useResolvedNamesForAddress>;
```

Successful `data` has type `GetResolvedNamesForAddressResultType`.

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useResolvedNamesForAddressSuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useResolvedNamesForAddressSuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useResolvedNamesForAddressSuspense({
  address: "0x0000000000000000000000000000000000000000",
  pageSize: 20,
});
```

### Parameters

`useResolvedNamesForAddressSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useResolvedNamesForAddressSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getResolvedNamesForAddressAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getResolvedNamesForAddressAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getResolvedNamesForAddress`](/core/api/actions/indexer/names/get-resolved-names-for-address)
- [`sdk.indexer.getResolvedNamesForAddress`](/sdk/api/indexer/names/get-resolved-names-for-address)
