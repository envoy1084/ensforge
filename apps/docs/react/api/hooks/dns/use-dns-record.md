---
title: useDnsRecord
description: Hook for fetching dns record.
---

# useDnsRecord

Hook for fetching dns record.

## Import

```tsx
import { useDnsRecord } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useDnsRecord({
    name: "example.eth",
    recordName: "_ens.example.com",
    resource: 1n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useDnsRecord>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useDnsRecord>;
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
