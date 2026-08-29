---
title: useHasDnsRecords
description: Hook for checking whether the name has dns records.
---

# useHasDnsRecords

Hook for checking whether the name has dns records.

## Import

```tsx
import { useHasDnsRecords } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useHasDnsRecords({
    name: "example.eth",
    recordName: "_ens.example.com",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useHasDnsRecords>[0];
```

### name

`string`

ENS name used by the query or mutation.

### recordName

`string`

DNS record owner name.

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
type Result = ReturnType<typeof useHasDnsRecords>;
```

## Effect Atom

```ts
import { hasDnsRecordsAtom } from "@ensforge/react/atoms";

const atom = hasDnsRecordsAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`hasDnsRecords`](/core/api/actions/dns/has-dns-records)
- [`sdk.dns.hasDnsRecords`](/sdk/api/dns/has-dns-records)
