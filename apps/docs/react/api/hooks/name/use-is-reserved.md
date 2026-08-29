---
title: useIsReserved
description: Hook for checking whether the name is reserved.
---

# useIsReserved

Hook for checking whether the name is reserved.

## Import

```tsx
import { useIsReserved } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useIsReserved({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useIsReserved>[0];
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

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useIsReserved>;
```

## Effect Atom

```ts
import { isReservedAtom } from "@ensforge/react/atoms";

const atom = isReservedAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`isReserved`](/core/api/actions/name/is-reserved)
- [`sdk.name.isReserved`](/sdk/api/name/is-reserved)
