---
title: useRecordPermissionsSuspense
description: Suspense hook for fetching record permissions.
---

# useRecordPermissionsSuspense

Suspense hook for fetching record permissions.

## Import

```tsx
import { useRecordPermissionsSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useRecordPermissionsSuspense({
    name: "example.eth",
    account: {},
    records: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useRecordPermissionsSuspense>[0];
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

### records

`ReadonlyArray<RecordOperation>`

Records selected, read, or written.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useRecordPermissionsSuspense>;
```

## Effect Atom

```ts
import { getRecordPermissionsAtom } from "@ensforge/react/atoms";

const atom = getRecordPermissionsAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getRecordPermissions`](/core/api/actions/capabilities/get-record-permissions)
- [`sdk.capabilities.getRecordPermissions`](/sdk/api/capabilities/get-record-permissions)
