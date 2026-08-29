---
title: useResolverCapabilitiesSuspense
description: Suspense hook for fetching resolver capabilities.
---

# useResolverCapabilitiesSuspense

Suspense hook for fetching resolver capabilities.

## Import

```tsx
import { useResolverCapabilitiesSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useResolverCapabilitiesSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useResolverCapabilitiesSuspense>[0];
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
type Result = ReturnType<typeof useResolverCapabilitiesSuspense>;
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
