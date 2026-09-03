---
title: useRegistriesForAddress
description: React hook that lists ENSv2 registries owned by an address.
---

# useRegistriesForAddress

React hook that lists ENSv2 registries owned by an address.

## Import

```tsx
import { useRegistriesForAddress } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRegistriesForAddress } from "@ensforge/react";

function Component() {
  const result = useRegistriesForAddress({
    address: "0x0000000000000000000000000000000000000000",
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
import type { GetRegistriesForAddressParametersType } from "@ensforge/sdk/indexer";
```

### address

`0x${string}`

Registry owner address to match.

<!--@include: @/shared/indexer/pagination-parameters.md-->

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useRegistriesForAddress>;
```

Successful `data` has type `GetRegistriesForAddressResultType`.

<!--@include: @/shared/indexer/v2-result.md-->

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useRegistriesForAddressSuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useRegistriesForAddressSuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useRegistriesForAddressSuspense({
  address: "0x0000000000000000000000000000000000000000",
  pageSize: 20,
});
```

### Parameters

`useRegistriesForAddressSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useRegistriesForAddressSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getRegistriesForAddressAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getRegistriesForAddressAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getRegistriesForAddress`](/core/api/actions/indexer/registries/get-registries-for-address)
- [`sdk.indexer.getRegistriesForAddress`](/sdk/api/indexer/registries/get-registries-for-address)
