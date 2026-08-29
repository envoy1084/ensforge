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

```tsx
function Component() {
  const result = useDnsImportPlan({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useDnsImportPlan>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useDnsImportPlan>;
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
