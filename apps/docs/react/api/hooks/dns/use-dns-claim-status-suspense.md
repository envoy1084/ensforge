---
title: useDnsClaimStatusSuspense
description: Suspense hook for fetching dns claim status.
---

# useDnsClaimStatusSuspense

Suspense hook for fetching dns claim status.

## Import

```tsx
import { useDnsClaimStatusSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useDnsClaimStatusSuspense } from "@ensforge/react";

function Component() {
  const result = useDnsClaimStatusSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetDnsClaimStatusParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
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
type Result = ReturnType<typeof useDnsClaimStatusSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getDnsClaimStatusAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getDnsClaimStatusAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getDnsClaimStatus`](/core/api/actions/dns/get-dns-claim-status)
- [`sdk.dns.getDnsClaimStatus`](/sdk/api/dns/get-dns-claim-status)
