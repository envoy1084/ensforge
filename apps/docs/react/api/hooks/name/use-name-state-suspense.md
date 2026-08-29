---
title: useNameStateSuspense
description: Suspense hook for fetching name state.
---

# useNameStateSuspense

Suspense hook for fetching name state.

## Import

```tsx
import { useNameStateSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useNameStateSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useNameStateSuspense>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useNameStateSuspense>;
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
