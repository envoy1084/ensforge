---
title: useMigrationStatusSuspense
description: Suspense hook for fetching migration status.
---

# useMigrationStatusSuspense

Suspense hook for fetching migration status.

## Import

```tsx
import { useMigrationStatusSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useMigrationStatusSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useMigrationStatusSuspense>[0];
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
type Result = ReturnType<typeof useMigrationStatusSuspense>;
```

## Effect Atom

```ts
import { getMigrationStatusAtom } from "@ensforge/react/atoms";

const atom = getMigrationStatusAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getMigrationStatus`](/core/api/actions/migration/get-migration-status)
- [`sdk.migration.getMigrationStatus`](/sdk/api/migration/get-migration-status)
