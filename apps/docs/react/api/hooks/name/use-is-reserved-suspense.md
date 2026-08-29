---
title: useIsReservedSuspense
description: Suspense hook for checking whether the name is reserved.
---

# useIsReservedSuspense

Suspense hook for checking whether the name is reserved.

## Import

```tsx
import { useIsReservedSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useIsReservedSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useIsReservedSuspense>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useIsReservedSuspense>;
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
