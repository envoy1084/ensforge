---
title: useAddresses
description: Hook for fetching addresses.
---

# useAddresses

Hook for fetching addresses.

## Import

```tsx
import { useAddresses } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useAddresses({
    name: "example.eth",
    coinTypes: [60n],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useAddresses>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useAddresses>;
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
