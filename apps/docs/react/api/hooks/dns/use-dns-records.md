---
title: useDnsRecords
description: Hook for fetching dns records.
---

# useDnsRecords

Hook for fetching dns records.

## Import

```tsx
import { useDnsRecords } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useDnsRecords({
    name: "example.eth",
    records: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useDnsRecords>[0];
```

### name

`string`

ENS name used by the query or mutation.

### records

`ReadonlyArray<DnsRecordQuery>`

Records selected, read, or written.

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
type Result = ReturnType<typeof useDnsRecords>;
```

## Effect Atom

```ts
import { getDnsRecordsAtom } from "@ensforge/react/atoms";

const atom = getDnsRecordsAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getDnsRecords`](/core/api/actions/dns/get-dns-records)
- [`sdk.dns.getDnsRecords`](/sdk/api/dns/get-dns-records)
