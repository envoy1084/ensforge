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

::: code-group

```tsx [component.tsx]
import { useRecordPermissionsSuspense } from "@ensforge/react";

function Component() {
  const result = useRecordPermissionsSuspense({
    name: "example.eth",
    account: {},
    records: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetRecordPermissionsParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
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

### account

`EthereumAddress`

Account used to authorize the mutation. Defaults to the active wallet account.

### records

`ReadonlyArray<RecordOperation>`

Records selected, read, or written.

### map

`(value: Success) => Mapped | undefined`

Maps successful data for this hook without changing the value stored by the underlying atom.

### atom

`EnsAtomOptions<Failure> | undefined`

Controls retries, refreshes, disposal, and stale-while-revalidate behavior. Suspense hooks always execute and do not accept `enabled`.

| Property          | Type                         | Default       | Description                                     |
| ----------------- | ---------------------------- | ------------- | ----------------------------------------------- |
| `idleTTL`         | `Duration.Input`             | `"5 minutes"` | Retains an unused atom before it is disposed.   |
| `refreshInterval` | `false \| Duration.Input`    | `false`       | Refreshes the atom while it remains subscribed. |
| `retry`           | `false \| Schedule`          | `false`       | Retries typed failures with an Effect schedule. |
| `swr`             | `false \| EnsAtomSwrOptions` | enabled       | Configures stale-while-revalidate behavior.     |

See [Atom Options](/react/api/atom-options) for focused examples.

## Return Type

```ts
type Result = ReturnType<typeof useRecordPermissionsSuspense>;
```

Returns `EnsSuspenseAtomResult` with successful `data`, background `isWaiting` state, and `updatedAt`. Pending work suspends rendering and failures are thrown to the nearest error boundary.

## Effect Atom

```ts
import { getRecordPermissionsAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getRecordPermissionsAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getRecordPermissions`](/core/api/actions/capabilities/get-record-permissions)
- [`sdk.capabilities.getRecordPermissions`](/sdk/api/capabilities/get-record-permissions)
