---
title: useHasRegistryRolesSuspense
description: Suspense hook for checking whether the name has registry roles.
---

# useHasRegistryRolesSuspense

Suspense hook for checking whether the name has registry roles.

## Import

```tsx
import { useHasRegistryRolesSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useHasRegistryRolesSuspense({
    name: "example.eth",
    account: {},
    roles: 1n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useHasRegistryRolesSuspense>[0];
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

### roles

`bigint`

Role bitmask to inspect, grant, or revoke.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useHasRegistryRolesSuspense>;
```

## Effect Atom

```ts
import { hasRegistryRolesAtom } from "@ensforge/react/atoms";

const atom = hasRegistryRolesAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`hasRegistryRoles`](/core/api/actions/capabilities/has-registry-roles)
- [`sdk.capabilities.hasRegistryRoles`](/sdk/api/capabilities/has-registry-roles)
