---
title: useResolverVersionSuspense
description: Suspense hook for fetching resolver version.
---

# useResolverVersionSuspense

Suspense hook for fetching resolver version.

## Import

```tsx
import { useResolverVersionSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useResolverVersionSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useResolverVersionSuspense>[0];
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
type Result = ReturnType<typeof useResolverVersionSuspense>;
```

## Effect Atom

```ts
import { getResolverVersionAtom } from "@ensforge/react/atoms";

const atom = getResolverVersionAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getResolverVersion`](/core/api/actions/resolution/get-resolver-version)
- [`sdk.resolution.getResolverVersion`](/sdk/api/resolution/get-resolver-version)
