---
title: useMigrationTarget
description: Hook for fetching migration target.
---

# useMigrationTarget

Hook for fetching migration target.

## Import

```tsx
import { useMigrationTarget } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useMigrationTarget({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useMigrationTarget>[0];
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
type Result = ReturnType<typeof useMigrationTarget>;
```

## Effect Atom

```ts
import { getMigrationTargetAtom } from "@ensforge/react/atoms";

const atom = getMigrationTargetAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getMigrationTarget`](/core/api/actions/migration/get-migration-target)
- [`sdk.migration.getMigrationTarget`](/sdk/api/migration/get-migration-target)
