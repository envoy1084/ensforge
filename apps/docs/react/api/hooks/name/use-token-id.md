---
title: useTokenId
description: Hook for fetching token id.
---

# useTokenId

Hook for fetching token id.

## Import

```tsx
import { useTokenId } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useTokenId({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useTokenId>[0];
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
type Result = ReturnType<typeof useTokenId>;
```

## Effect Atom

```ts
import { getTokenIdAtom } from "@ensforge/react/atoms";

const atom = getTokenIdAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getTokenId`](/core/api/actions/name/get-token-id)
- [`sdk.name.getTokenId`](/sdk/api/name/get-token-id)
