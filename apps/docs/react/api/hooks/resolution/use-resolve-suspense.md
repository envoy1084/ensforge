---
title: useResolveSuspense
description: Suspense hook for resolving .
---

# useResolveSuspense

Suspense hook for resolving .

## Import

```tsx
import { useResolveSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useResolveSuspense({
    name: "example.eth",
    data: "0x",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useResolveSuspense>[0];
```

### name

`string`

ENS name used by the query or mutation.

### data

`string`

Raw calldata or record bytes.

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
type Result = ReturnType<typeof useResolveSuspense>;
```

## Effect Atom

```ts
import { resolveAtom } from "@ensforge/react/atoms";

const atom = resolveAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`resolve`](/core/api/actions/resolution/resolve)
- [`sdk.resolution.resolve`](/sdk/api/resolution/resolve)
