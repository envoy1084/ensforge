---
title: useAddress
description: Hook for fetching address.
---

# useAddress

Hook for fetching address.

## Import

```tsx
import { useAddress } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useAddress } from "@ensforge/react";

function Component() {
  const result = useAddress({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="records.getAddress" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetAddressParameters } from "@ensforge/sdk/records";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### coinType

`bigint | undefined`

SLIP-44 coin type. Optional address reads default to `60n`.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useAddress>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useAddressSuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useAddressSuspense } from "@ensforge/react";
```

### Usage

::: code-group

```tsx [component.tsx]
import { useAddressSuspense } from "@ensforge/react";

function Component() {
  const result = useAddressSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

### Parameters

`useAddressSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetAddressParameters } from "@ensforge/sdk/records";
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useAddressSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getAddressAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getAddressAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getAddress`](/core/api/actions/records/get-address)
- [`sdk.records.getAddress`](/sdk/api/records/get-address)
