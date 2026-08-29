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

```tsx
function Component() {
  const result = useResolveBatchSuspense({
    calls: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useResolveBatchSuspense>[0];
```

### calls

`ReadonlyArray<ResolveBatchCall>`

Read requests or write intents included in the operation.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useResolveBatchSuspense>;
```

## Effect Atom

```ts
import { resolveBatchAtom } from "@ensforge/react/atoms";

const atom = resolveBatchAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`resolveBatch`](/core/api/actions/resolution/resolve-batch)
- [`sdk.resolution.resolveBatch`](/sdk/api/resolution/resolve-batch)
