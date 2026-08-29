---
title: useData
description: Hook for fetching data.
---

# useData

Hook for fetching data.

## Import

```tsx
import { useData } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useData({
    name: "example.eth",
    key: "url",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useData>[0];
```

### name

`string`

ENS name used by the query or mutation.

### key

`string`

Record key.

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
type Result = ReturnType<typeof useData>;
```

## Effect Atom

```ts
import { getDataAtom } from "@ensforge/react/atoms";

const atom = getDataAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getData`](/core/api/actions/records/get-data)
- [`sdk.records.getData`](/sdk/api/records/get-data)
