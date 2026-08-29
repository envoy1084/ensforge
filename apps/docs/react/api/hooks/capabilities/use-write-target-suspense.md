---
title: useWriteTargetSuspense
description: Suspense hook for fetching write target.
---

# useWriteTargetSuspense

Suspense hook for fetching write target.

## Import

```tsx
import { useWriteTargetSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useWriteTargetSuspense({
    name: "example.eth",
    operation: {},
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useWriteTargetSuspense>[0];
```

### name

`string`

ENS name used by the query or mutation.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

### operation

`WriteOperation`

Value used for `operation` by this operation.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useWriteTargetSuspense>;
```

## Effect Atom

```ts
import { getWriteTargetAtom } from "@ensforge/react/atoms";

const atom = getWriteTargetAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getWriteTarget`](/core/api/actions/capabilities/get-write-target)
- [`sdk.capabilities.getWriteTarget`](/sdk/api/capabilities/get-write-target)
