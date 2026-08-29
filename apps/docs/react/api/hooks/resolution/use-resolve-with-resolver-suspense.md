---
title: useResolveWithResolverSuspense
description: Suspense hook for resolving with resolver.
---

# useResolveWithResolverSuspense

Suspense hook for resolving with resolver.

## Import

```tsx
import { useResolveWithResolverSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useResolveWithResolverSuspense({
    name: "example.eth",
    data: "0x",
    resolverAddress: "0x0000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useResolveWithResolverSuspense>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useResolveWithResolverSuspense>;
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
