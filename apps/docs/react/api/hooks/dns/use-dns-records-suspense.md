---
title: useDnsRecordsSuspense
description: Suspense hook for fetching dns records.
---

# useDnsRecordsSuspense

Suspense hook for fetching dns records.

## Import

```tsx
import { useDnsRecordsSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useDnsRecordsSuspense({
    name: "example.eth",
    records: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useDnsRecordsSuspense>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useDnsRecordsSuspense>;
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
