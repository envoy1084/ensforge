---
title: useNameState
description: Hook for fetching name state.
---

# useNameState

Hook for fetching name state.

## Import

```tsx
import { useNameState } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useNameState({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useNameState>[0];
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
type Result = ReturnType<typeof useNameState>;
```

## Effect Atom

```ts
import { getNameStateAtom } from "@ensforge/react/atoms";

const atom = getNameStateAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getNameState`](/core/api/actions/name/get-name-state)
- [`sdk.name.getNameState`](/sdk/api/name/get-name-state)
