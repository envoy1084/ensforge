---
title: useIsAvailable
description: Hook for checking whether the name is available.
---

# useIsAvailable

Hook for checking whether the name is available.

## Import

```tsx
import { useIsAvailable } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useIsAvailable({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useIsAvailable>[0];
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
type Result = ReturnType<typeof useIsAvailable>;
```

## Effect Atom

```ts
import { isAvailableAtom } from "@ensforge/react/atoms";

const atom = isAvailableAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`isAvailable`](/core/api/actions/name/is-available)
- [`sdk.name.isAvailable`](/sdk/api/name/is-available)
