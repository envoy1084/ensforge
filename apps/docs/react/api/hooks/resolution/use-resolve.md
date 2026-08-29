---
title: useResolve
description: Hook for resolving .
---

# useResolve

Hook for resolving .

## Import

```tsx
import { useResolve } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useResolve({
    name: "example.eth",
    data: "0x",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useResolve>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useResolve>;
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
