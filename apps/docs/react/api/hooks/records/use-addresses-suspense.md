---
title: useAddressesSuspense
description: Suspense hook for fetching addresses.
---

# useAddressesSuspense

Suspense hook for fetching addresses.

## Import

```tsx
import { useAddressesSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useAddressesSuspense({
    name: "example.eth",
    coinTypes: [60n],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useAddressesSuspense>[0];
```

### name

`string`

ENS name used by the query or mutation.

### coinTypes

`ReadonlyArray<bigint>`

SLIP-44 coin types to resolve.

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
type Result = ReturnType<typeof useAddressesSuspense>;
```

## Effect Atom

```ts
import { getAddressesAtom } from "@ensforge/react/atoms";

const atom = getAddressesAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getAddresses`](/core/api/actions/records/get-addresses)
- [`sdk.records.getAddresses`](/sdk/api/records/get-addresses)
