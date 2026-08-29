---
title: useAbi
description: Hook for fetching abi.
---

# useAbi

Hook for fetching abi.

## Import

```tsx
import { useAbi } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useAbi({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useAbi>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useAbi>;
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
