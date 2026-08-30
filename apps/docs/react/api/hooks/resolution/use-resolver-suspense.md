---
title: useResolverSuspense
description: Suspense hook for fetching resolver.
---

# useResolverSuspense

Suspense hook for fetching resolver.

## Import

```tsx
import { useResolverSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useResolverSuspense } from "@ensforge/react";

function Component() {
  const result = useResolverSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetResolverParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
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

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useResolverSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getResolverAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getResolverAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getResolver`](/core/api/actions/resolution/get-resolver)
- [`sdk.resolution.getResolver`](/sdk/api/resolution/get-resolver)
