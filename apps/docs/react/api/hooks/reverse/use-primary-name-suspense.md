---
title: usePrimaryNameSuspense
description: Suspense hook for fetching primary name.
---

# usePrimaryNameSuspense

Suspense hook for fetching primary name.

## Import

```tsx
import { usePrimaryNameSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = usePrimaryNameSuspense({
    address: "0x0000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof usePrimaryNameSuspense>[0];
```

### address

`string`

Address used by the operation.

### coinType

`bigint | undefined`

SLIP-44 coin type. Optional address reads default to `60n`.

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
type Result = ReturnType<typeof usePrimaryNameSuspense>;
```

## Effect Atom

```ts
import { getPrimaryNameAtom } from "@ensforge/react/atoms";

const atom = getPrimaryNameAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getPrimaryName`](/core/api/actions/reverse/get-primary-name)
- [`sdk.reverse.getPrimaryName`](/sdk/api/reverse/get-primary-name)
