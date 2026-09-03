---
title: useWrapperExpiry
description: Hook for fetching wrapper expiry.
---

# useWrapperExpiry

Hook for fetching wrapper expiry.

## Import

```tsx
import { useWrapperExpiry } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useWrapperExpiry } from "@ensforge/react";

function Component() {
  const result = useWrapperExpiry({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="wrapping.getWrapperExpiry" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { WrapperReadParameters } from "@ensforge/sdk/wrapping";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useWrapperExpiry>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useWrapperExpirySuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useWrapperExpirySuspense } from "@ensforge/react";
```

### Usage

::: code-group

```tsx [component.tsx]
import { useWrapperExpirySuspense } from "@ensforge/react";

function Component() {
  const result = useWrapperExpirySuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

### Parameters

`useWrapperExpirySuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { WrapperReadParameters } from "@ensforge/sdk/wrapping";
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useWrapperExpirySuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getWrapperExpiryAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getWrapperExpiryAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getWrapperExpiry`](/core/api/actions/wrapping/get-wrapper-expiry)
- [`sdk.wrapping.getWrapperExpiry`](/sdk/api/wrapping/get-wrapper-expiry)
