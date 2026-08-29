---
title: useCanonicalResourceSuspense
description: Suspense hook for fetching canonical resource.
---

# useCanonicalResourceSuspense

Suspense hook for fetching canonical resource.

## Import

```tsx
import { useCanonicalResourceSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useCanonicalResourceSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useCanonicalResourceSuspense>[0];
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
type Result = ReturnType<typeof useCanonicalResourceSuspense>;
```

## Effect Atom

```ts
import { getCanonicalResourceAtom } from "@ensforge/react/atoms";

const atom = getCanonicalResourceAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getCanonicalResource`](/core/api/actions/name/get-canonical-resource)
- [`sdk.name.getCanonicalResource`](/sdk/api/name/get-canonical-resource)
