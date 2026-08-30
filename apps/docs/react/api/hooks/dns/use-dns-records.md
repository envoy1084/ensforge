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

::: code-group

```tsx [component.tsx]
import { useDnsRecords } from "@ensforge/react";

function Component() {
  const result = useDnsRecords({
    name: "example.eth",
    records: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetDnsRecordsParameters } from "@ensforge/sdk/dns";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### records

`ReadonlyArray<DnsRecordQuery>`

Records selected, read, or written.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useDnsRecords>;
```

<!--@include: @/shared/react/atom-result.md-->

## Effect Atom

```ts
import { getDnsRecordsAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getDnsRecordsAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getDnsRecords`](/core/api/actions/dns/get-dns-records)
- [`sdk.dns.getDnsRecords`](/sdk/api/dns/get-dns-records)
