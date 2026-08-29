---
title: useIsWrapped
description: Hook for checking whether the name is wrapped.
---

# useIsWrapped

Hook for checking whether the name is wrapped.

## Import

```tsx
import { useIsWrapped } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useIsWrapped({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useIsWrapped>[0];
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
type Result = ReturnType<typeof useIsWrapped>;
```

## Effect Atom

```ts
import { isWrappedAtom } from "@ensforge/react/atoms";

const atom = isWrappedAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`isWrapped`](/core/api/actions/name/is-wrapped)
- [`sdk.name.isWrapped`](/sdk/api/name/is-wrapped)
