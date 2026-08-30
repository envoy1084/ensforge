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

::: code-group

```tsx [component.tsx]
import { useDnsRecord } from "@ensforge/react";

function Component() {
  const result = useDnsRecord({
    name: "example.eth",
    recordName: "_ens.example.com",
    resource: 1n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetDnsRecordParameters, UseEnsAtomParameters } from "@ensforge/react";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

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

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useDnsRecord>;
```

<!--@include: @/shared/react/atom-result.md-->

## Effect Atom

```ts
import { getDnsRecordAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getDnsRecordAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getDnsRecord`](/core/api/actions/dns/get-dns-record)
- [`sdk.dns.getDnsRecord`](/sdk/api/dns/get-dns-record)
