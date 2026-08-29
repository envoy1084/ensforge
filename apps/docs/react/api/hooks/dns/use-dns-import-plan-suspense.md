---
title: useDnsImportPlanSuspense
description: Suspense hook for fetching dns import plan.
---

# useDnsImportPlanSuspense

Suspense hook for fetching dns import plan.

## Import

```tsx
import { useDnsImportPlanSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useDnsImportPlanSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useDnsImportPlanSuspense>[0];
```

### name

`string`

ENS name used by the query or mutation.

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
type Result = ReturnType<typeof useDnsImportPlanSuspense>;
```

## Effect Atom

```ts
import { getDnsImportPlanAtom } from "@ensforge/react/atoms";

const atom = getDnsImportPlanAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getDnsImportPlan`](/core/api/actions/dns/get-dns-import-plan)
- [`sdk.dns.getDnsImportPlan`](/sdk/api/dns/get-dns-import-plan)
