---
title: useTtl
description: Hook for fetching ttl.
---

# useTtl

Hook for fetching ttl.

## Import

```tsx
import { useTtl } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useTtl } from "@ensforge/react";

function Component() {
  const result = useTtl({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="ownership.getTtl" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetNameStateParameters } from "@ensforge/sdk/ownership";
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
type Result = ReturnType<typeof useTtl>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useTtlSuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useTtlSuspense } from "@ensforge/react";
```

### Usage

::: code-group

```tsx [component.tsx]
import { useTtlSuspense } from "@ensforge/react";

function Component() {
  const result = useTtlSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

### Parameters

`useTtlSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetNameStateParameters } from "@ensforge/sdk/ownership";
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useTtlSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getTtlAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getTtlAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getTtl`](/core/api/actions/ownership/get-ttl)
- [`sdk.ownership.getTtl`](/sdk/api/ownership/get-ttl)
