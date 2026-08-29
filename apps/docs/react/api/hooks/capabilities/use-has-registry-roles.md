---
title: useHasRegistryRoles
description: Hook for checking whether the name has registry roles.
---

# useHasRegistryRoles

Hook for checking whether the name has registry roles.

## Import

```tsx
import { useHasRegistryRoles } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useHasRegistryRoles({
    name: "example.eth",
    account: {},
    roles: 1n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useHasRegistryRoles>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useHasRegistryRoles>;
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
