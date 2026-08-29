---
title: useRegistry
description: Hook for fetching registry.
---

# useRegistry

Hook for fetching registry.

## Import

```tsx
import { useRegistry } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useRegistry({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useRegistry>[0];
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
type Result = ReturnType<typeof useRegistry>;
```

## Effect Atom

```ts
import { getRegistryAtom } from "@ensforge/react/atoms";

const atom = getRegistryAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getRegistry`](/core/api/actions/name/get-registry)
- [`sdk.name.getRegistry`](/sdk/api/name/get-registry)
