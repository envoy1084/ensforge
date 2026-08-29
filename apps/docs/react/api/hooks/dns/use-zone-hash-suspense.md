---
title: useZoneHashSuspense
description: Suspense hook for fetching zone hash.
---

# useZoneHashSuspense

Suspense hook for fetching zone hash.

## Import

```tsx
import { useZoneHashSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useZoneHashSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useZoneHashSuspense>[0];
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
type Result = ReturnType<typeof useZoneHashSuspense>;
```

## Effect Atom

```ts
import { getZoneHashAtom } from "@ensforge/react/atoms";

const atom = getZoneHashAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getZoneHash`](/core/api/actions/dns/get-zone-hash)
- [`sdk.dns.getZoneHash`](/sdk/api/dns/get-zone-hash)
