---
title: useNamesForAddress
description: React hook that lists ENS names related to an Ethereum address.
---

# useNamesForAddress

React hook that lists ENS names related to an Ethereum address.

## Import

```tsx
import { useNamesForAddress } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useNamesForAddress } from "@ensforge/react";

function Component() {
  const result = useNamesForAddress({
    address: "0x0000000000000000000000000000000000000000",
    relations: ["owner", "resolved-address"],
    pageSize: 20,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="indexer.getNamesForAddress" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetNamesForAddressParametersType } from "@ensforge/sdk/indexer";
```

### address

`0x${string}`

Address used for relation matching.

### relations

`readonly NameRelation[] | undefined`

Relations such as `"owner"`, `"registrant"`, `"wrapped-owner"`, or `"resolved-address"`. Defaults to effective ownership.

### filter

<!--@include: @/shared/indexer/name-filter.md-->

### order

<!--@include: @/shared/indexer/name-order.md-->

<!--@include: @/shared/indexer/pagination-parameters.md-->

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useNamesForAddress>;
```

Successful `data` has type `GetNamesForAddressResultType`.

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useNamesForAddressSuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useNamesForAddressSuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useNamesForAddressSuspense({
  address: "0x0000000000000000000000000000000000000000",
  relations: ["owner", "resolved-address"],
  pageSize: 20,
});
```

### Parameters

`useNamesForAddressSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useNamesForAddressSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getNamesForAddressAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getNamesForAddressAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getNamesForAddress`](/core/api/actions/indexer/names/get-names-for-address)
- [`sdk.indexer.getNamesForAddress`](/sdk/api/indexer/names/get-names-for-address)
