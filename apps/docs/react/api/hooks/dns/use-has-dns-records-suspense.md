---
title: useHasDnsRecordsSuspense
description: Suspense hook for checking whether the name has dns records.
---

# useHasDnsRecordsSuspense

Suspense hook for checking whether the name has dns records.

## Import

```tsx
import { useHasDnsRecordsSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useHasDnsRecordsSuspense } from "@ensforge/react";

function Component() {
  const result = useHasDnsRecordsSuspense({
    name: "example.eth",
    recordName: "_ens.example.com",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { HasDnsRecordsParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### recordName

`string`

DNS record owner name.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useHasDnsRecordsSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { hasDnsRecordsAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = hasDnsRecordsAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`hasDnsRecords`](/core/api/actions/dns/has-dns-records)
- [`sdk.dns.hasDnsRecords`](/sdk/api/dns/has-dns-records)
