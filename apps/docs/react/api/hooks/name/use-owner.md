---
title: useOwner
description: Hook for fetching owner.
---

# useOwner

Hook for fetching owner.

## Import

```tsx
import { useOwner } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useOwner({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useOwner>[0];
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
type Result = ReturnType<typeof useOwner>;
```

## Effect Atom

```ts
import { getOwnerAtom } from "@ensforge/react/atoms";

const atom = getOwnerAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getOwner`](/core/api/actions/name/get-owner)
- [`sdk.name.getOwner`](/sdk/api/name/get-owner)
