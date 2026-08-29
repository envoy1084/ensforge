---
title: useWriteTarget
description: Hook for fetching write target.
---

# useWriteTarget

Hook for fetching write target.

## Import

```tsx
import { useWriteTarget } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useWriteTarget({
    name: "example.eth",
    operation: {},
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useWriteTarget>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useWriteTarget>;
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
