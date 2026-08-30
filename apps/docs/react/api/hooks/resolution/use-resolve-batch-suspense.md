---
title: useResolveBatchSuspense
description: Suspense hook for resolving batch.
---

# useResolveBatchSuspense

Suspense hook for resolving batch.

## Import

```tsx
import { useResolveBatchSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useResolveBatchSuspense } from "@ensforge/react";

function Component() {
  const result = useResolveBatchSuspense({
    calls: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { ResolveBatchParameters } from "@ensforge/sdk/resolution";
```

### calls

`ReadonlyArray<ResolveBatchCall>`

Read requests or write intents included in the operation.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useResolveBatchSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { resolveBatchAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = resolveBatchAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`resolveBatch`](/core/api/actions/resolution/resolve-batch)
- [`sdk.resolution.resolveBatch`](/sdk/api/resolution/resolve-batch)
