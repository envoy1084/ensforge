---
title: useReadBatch
description: Hook for running read batch.
---

# useReadBatch

Hook for running read batch.

## Import

```tsx
import { useReadBatch } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useReadBatch({});

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useReadBatch>[0];
```

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useReadBatch>;
```

## Effect Atom

```ts
import { readBatchAtom } from "@ensforge/react/atoms";

const atom = readBatchAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`readBatch`](/core/api/actions/batch/read-batch)
- [`sdk.batch.readBatch`](/sdk/api/batch/read-batch)
