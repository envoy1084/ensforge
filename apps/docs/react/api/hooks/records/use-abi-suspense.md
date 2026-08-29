---
title: useAbiSuspense
description: Suspense hook for fetching abi.
---

# useAbiSuspense

Suspense hook for fetching abi.

## Import

```tsx
import { useAbiSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useAbiSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useAbiSuspense>[0];
```

### name

`string`

ENS name used by the query or mutation.

### contentTypes

`ReadonlyArray<AbiContentType> | undefined`

Value used for `contentTypes` by this operation.

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
type Result = ReturnType<typeof useAbiSuspense>;
```

## Effect Atom

```ts
import { getAbiAtom } from "@ensforge/react/atoms";

const atom = getAbiAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getAbi`](/core/api/actions/records/get-abi)
- [`sdk.records.getAbi`](/sdk/api/records/get-abi)
