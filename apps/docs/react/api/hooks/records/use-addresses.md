---
title: useAddresses
description: Hook for fetching addresses.
---

# useAddresses

Hook for fetching addresses.

## Import

```tsx
import { useAddresses } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useAddresses } from "@ensforge/react";

function Component() {
  const result = useAddresses({
    name: "example.eth",
    coinTypes: [60n],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="records.getAddresses" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetAddressesParameters } from "@ensforge/sdk/records";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### coinTypes

`ReadonlyArray<bigint>`

SLIP-44 coin types to resolve.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useAddresses>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useAddressesSuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useAddressesSuspense } from "@ensforge/react";
```

### Usage

::: code-group

```tsx [component.tsx]
import { useAddressesSuspense } from "@ensforge/react";

function Component() {
  const result = useAddressesSuspense({
    name: "example.eth",
    coinTypes: [60n],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

### Parameters

`useAddressesSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetAddressesParameters } from "@ensforge/sdk/records";
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useAddressesSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getAddressesAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getAddressesAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getAddresses`](/core/api/actions/records/get-addresses)
- [`sdk.records.getAddresses`](/sdk/api/records/get-addresses)
