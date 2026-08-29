---
title: useHasResolverRolesSuspense
description: Suspense hook for checking whether the name has resolver roles.
---

# useHasResolverRolesSuspense

Suspense hook for checking whether the name has resolver roles.

## Import

```tsx
import { useHasResolverRolesSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useHasResolverRolesSuspense({
    name: "example.eth",
    account: {},
    roles: 1n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useHasResolverRolesSuspense>[0];
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

### record

`ResolverRecord | undefined`

Value used for `record` by this operation.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useHasResolverRolesSuspense>;
```

## Effect Atom

```ts
import { hasResolverRolesAtom } from "@ensforge/react/atoms";

const atom = hasResolverRolesAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`hasResolverRoles`](/core/api/actions/capabilities/has-resolver-roles)
- [`sdk.capabilities.hasResolverRoles`](/sdk/api/capabilities/has-resolver-roles)
