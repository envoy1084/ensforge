---
title: useResolverCapabilities
description: Hook for fetching resolver capabilities.
---

# useResolverCapabilities

Hook for fetching resolver capabilities.

## Import

```tsx
import { useResolverCapabilities } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useResolverCapabilities({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useResolverCapabilities>[0];
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
type Result = ReturnType<typeof useResolverCapabilities>;
```

## Effect Atom

```ts
import { getResolverCapabilitiesAtom } from "@ensforge/react/atoms";

const atom = getResolverCapabilitiesAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getResolverCapabilities`](/core/api/actions/capabilities/get-resolver-capabilities)
- [`sdk.capabilities.getResolverCapabilities`](/sdk/api/capabilities/get-resolver-capabilities)
