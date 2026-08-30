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

::: code-group

```tsx [component.tsx]
import { useZoneHashSuspense } from "@ensforge/react";

function Component() {
  const result = useZoneHashSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetZoneHashParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useZoneHashSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getZoneHashAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getZoneHashAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getZoneHash`](/core/api/actions/dns/get-zone-hash)
- [`sdk.dns.getZoneHash`](/sdk/api/dns/get-zone-hash)
