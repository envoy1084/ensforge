---
title: useDataSuspense
description: Suspense hook for fetching data.
---

# useDataSuspense

Suspense hook for fetching data.

## Import

```tsx
import { useDataSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useDataSuspense({
    name: "example.eth",
    key: "url",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useDataSuspense>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useDataSuspense>;
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
