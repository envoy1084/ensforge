---
title: useDnsRecordSuspense
description: Suspense hook for fetching dns record.
---

# useDnsRecordSuspense

Suspense hook for fetching dns record.

## Import

```tsx
import { useDnsRecordSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useDnsRecordSuspense({
    name: "example.eth",
    recordName: "_ens.example.com",
    resource: 1n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useDnsRecordSuspense>[0];
```

### name

`string`

ENS name used by the query or mutation.

### recordName

`string`

DNS record owner name.

### resource

`DnsResource`

ENSv2 resource identifier or DNS resource type.

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
type Result = ReturnType<typeof useDnsRecordSuspense>;
```

## Effect Atom

```ts
import { getDnsRecordAtom } from "@ensforge/react/atoms";

const atom = getDnsRecordAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getDnsRecord`](/core/api/actions/dns/get-dns-record)
- [`sdk.dns.getDnsRecord`](/sdk/api/dns/get-dns-record)
