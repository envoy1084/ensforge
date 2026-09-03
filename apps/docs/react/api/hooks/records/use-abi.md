---
title: useAbi
description: Hook for fetching abi.
---

# useAbi

Hook for fetching abi.

## Import

```tsx
import { useAbi } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useAbi } from "@ensforge/react";

function Component() {
  const result = useAbi({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetAbiParameters } from "@ensforge/sdk/records";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### contentTypes

`ReadonlyArray<AbiContentType> | undefined`

Value used for `contentTypes` by this operation.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useAbi>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useAbiSuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useAbiSuspense } from "@ensforge/react";
```

### Usage

::: code-group

```tsx [component.tsx]
import { useAbiSuspense } from "@ensforge/react";

function Component() {
  const result = useAbiSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

### Parameters

`useAbiSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetAbiParameters } from "@ensforge/sdk/records";
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useAbiSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getAbiAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getAbiAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getAbi`](/core/api/actions/records/get-abi)
- [`sdk.records.getAbi`](/sdk/api/records/get-abi)
