---
title: useResolversForAddress
description: React hook that lists ENSv2 resolvers owned by an address.
---

# useResolversForAddress

React hook that lists ENSv2 resolvers owned by an address.

## Import

```tsx
import { useResolversForAddress } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useResolversForAddress } from "@ensforge/react";

function Component() {
  const result = useResolversForAddress({
    address: "0x0000000000000000000000000000000000000000",
    pageSize: 20,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="indexer.getResolversForAddress" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetResolversForAddressParametersType } from "@ensforge/sdk/indexer";
```

### address

`0x${string}`

Resolver owner address to match.

<!--@include: @/shared/indexer/pagination-parameters.md-->

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useResolversForAddress>;
```

Successful `data` has type `GetResolversForAddressResultType`.

<!--@include: @/shared/indexer/v2-result.md-->

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useResolversForAddressSuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useResolversForAddressSuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useResolversForAddressSuspense({
  address: "0x0000000000000000000000000000000000000000",
  pageSize: 20,
});
```

### Parameters

`useResolversForAddressSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useResolversForAddressSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getResolversForAddressAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getResolversForAddressAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getResolversForAddress`](/core/api/actions/indexer/resolvers/get-resolvers-for-address)
- [`sdk.indexer.getResolversForAddress`](/sdk/api/indexer/resolvers/get-resolvers-for-address)
