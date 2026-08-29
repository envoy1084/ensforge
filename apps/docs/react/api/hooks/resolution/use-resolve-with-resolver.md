---
title: useResolveWithResolver
description: Hook for resolving with resolver.
---

# useResolveWithResolver

Hook for resolving with resolver.

## Import

```tsx
import { useResolveWithResolver } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useResolveWithResolver({
    name: "example.eth",
    data: "0x",
    resolverAddress: "0x0000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useResolveWithResolver>[0];
```

### name

`string`

ENS name used by the query or mutation.

### data

`string`

Raw calldata or record bytes.

### resolverAddress

`string`

Explicit resolver contract.

### gateways

`ReadonlyArray<string> | undefined`

DNS gateway endpoints.

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
type Result = ReturnType<typeof useResolveWithResolver>;
```

## Effect Atom

```ts
import { resolveWithResolverAtom } from "@ensforge/react/atoms";

const atom = resolveWithResolverAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`resolveWithResolver`](/core/api/actions/resolution/resolve-with-resolver)
- [`sdk.resolution.resolveWithResolver`](/sdk/api/resolution/resolve-with-resolver)
