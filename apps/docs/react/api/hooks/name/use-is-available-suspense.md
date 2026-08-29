---
title: useIsAvailableSuspense
description: Suspense hook for checking whether the name is available.
---

# useIsAvailableSuspense

Suspense hook for checking whether the name is available.

## Import

```tsx
import { useIsAvailableSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useIsAvailableSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useIsAvailableSuspense>[0];
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
type Result = ReturnType<typeof useIsAvailableSuspense>;
```

## Effect Atom

```ts
import { isAvailableAtom } from "@ensforge/react/atoms";

const atom = isAvailableAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`isAvailable`](/core/api/actions/name/is-available)
- [`sdk.name.isAvailable`](/sdk/api/name/is-available)
