---
title: useResolveBatch
description: Hook for resolving batch.
---

# useResolveBatch

Hook for resolving batch.

## Import

```tsx
import { useResolveBatch } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useResolveBatch({
    calls: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useResolveBatch>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useResolveBatch>;
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
