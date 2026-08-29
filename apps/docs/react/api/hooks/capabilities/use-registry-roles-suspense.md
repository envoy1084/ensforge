---
title: useRegistryRolesSuspense
description: Suspense hook for fetching registry roles.
---

# useRegistryRolesSuspense

Suspense hook for fetching registry roles.

## Import

```tsx
import { useRegistryRolesSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useRegistryRolesSuspense({
    name: "example.eth",
    account: {},
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useRegistryRolesSuspense>[0];
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
type Result = ReturnType<typeof useRegistryRolesSuspense>;
```

## Effect Atom

```ts
import { getRegistryRolesAtom } from "@ensforge/react/atoms";

const atom = getRegistryRolesAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getRegistryRoles`](/core/api/actions/capabilities/get-registry-roles)
- [`sdk.capabilities.getRegistryRoles`](/sdk/api/capabilities/get-registry-roles)
