---
title: useZoneHash
description: Hook for fetching zone hash.
---

# useZoneHash

Hook for fetching zone hash.

## Import

```tsx
import { useZoneHash } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useZoneHash({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useZoneHash>[0];
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
type Result = ReturnType<typeof useZoneHash>;
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
