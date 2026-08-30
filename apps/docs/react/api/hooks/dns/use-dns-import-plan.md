---
title: useDnsImportPlan
description: Hook for fetching dns import plan.
---

# useDnsImportPlan

Hook for fetching dns import plan.

## Import

```tsx
import { useDnsImportPlan } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useDnsImportPlan } from "@ensforge/react";

function Component() {
  const result = useDnsImportPlan({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetDnsImportPlanParameters } from "@ensforge/sdk/dns";
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

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useDnsImportPlan>;
```

<!--@include: @/shared/react/atom-result.md-->

## Effect Atom

```ts
import { getDnsImportPlanAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getDnsImportPlanAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getDnsImportPlan`](/core/api/actions/dns/get-dns-import-plan)
- [`sdk.dns.getDnsImportPlan`](/sdk/api/dns/get-dns-import-plan)
