---
title: useMigrationPlanSuspense
description: Suspense hook for fetching migration plan.
---

# useMigrationPlanSuspense

Suspense hook for fetching migration plan.

## Import

```tsx
import { useMigrationPlanSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useMigrationPlanSuspense({
    name: "example.eth",
    account: {},
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useMigrationPlanSuspense>[0];
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

### account

`EthereumAddress`

Account used for authorization and execution.

### owner

`EthereumAddress | undefined`

Address that should own the name or resource.

### resolver

`EthereumAddress | undefined`

Resolver address used by the operation.

### subregistry

`EthereumAddress | undefined`

Value used for `subregistry` by this operation.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useMigrationPlanSuspense>;
```

## Effect Atom

```ts
import { getMigrationPlanAtom } from "@ensforge/react/atoms";

const atom = getMigrationPlanAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getMigrationPlan`](/core/api/actions/migration/get-migration-plan)
- [`sdk.migration.getMigrationPlan`](/sdk/api/migration/get-migration-plan)
