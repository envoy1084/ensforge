---
title: useRecordPermissions
description: Hook for fetching record permissions.
---

# useRecordPermissions

Hook for fetching record permissions.

## Import

```tsx
import { useRecordPermissions } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useRecordPermissions({
    name: "example.eth",
    account: {},
    records: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useRecordPermissions>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useRecordPermissions>;
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
