---
title: useContentHash
description: Hook for fetching content hash.
---

# useContentHash

Hook for fetching content hash.

## Import

```tsx
import { useContentHash } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useContentHash({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useContentHash>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useContentHash>;
```

## Effect Atom

```ts
import { getContentHashAtom } from "@ensforge/react/atoms";

const atom = getContentHashAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getContentHash`](/core/api/actions/records/get-content-hash)
- [`sdk.records.getContentHash`](/sdk/api/records/get-content-hash)
