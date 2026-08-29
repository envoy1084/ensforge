---
title: useWrapperPermissionsSuspense
description: Suspense hook for fetching wrapper permissions.
---

# useWrapperPermissionsSuspense

Suspense hook for fetching wrapper permissions.

## Import

```tsx
import { useWrapperPermissionsSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useWrapperPermissionsSuspense({
    name: "example.eth",
    account: {},
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useWrapperPermissionsSuspense>[0];
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

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useWrapperPermissionsSuspense>;
```

## Effect Atom

```ts
import { getWrapperPermissionsAtom } from "@ensforge/react/atoms";

const atom = getWrapperPermissionsAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getWrapperPermissions`](/core/api/actions/capabilities/get-wrapper-permissions)
- [`sdk.capabilities.getWrapperPermissions`](/sdk/api/capabilities/get-wrapper-permissions)
