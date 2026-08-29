---
title: useAddress
description: Hook for fetching address.
---

# useAddress

Hook for fetching address.

## Import

```tsx
import { useAddress } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useAddress({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useAddress>[0];
```

### name

`string`

ENS name used by the query or mutation.

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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useAddress>;
```

## Effect Atom

```ts
import { getAddressAtom } from "@ensforge/react/atoms";

const atom = getAddressAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getAddress`](/core/api/actions/records/get-address)
- [`sdk.records.getAddress`](/sdk/api/records/get-address)
