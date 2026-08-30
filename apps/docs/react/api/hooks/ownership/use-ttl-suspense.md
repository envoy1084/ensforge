---
title: useTtlSuspense
description: Suspense hook for fetching ttl.
---

# useTtlSuspense

Suspense hook for fetching ttl.

## Import

```tsx
import { useTtlSuspense } from "@ensforge/react";
```

## Usage

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

## Parameters

```ts
import type { GetNameStateParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
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
