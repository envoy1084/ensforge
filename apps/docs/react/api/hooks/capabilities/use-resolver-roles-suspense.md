---
title: useResolverRolesSuspense
description: Suspense hook for fetching resolver roles.
---

# useResolverRolesSuspense

Suspense hook for fetching resolver roles.

## Import

```tsx
import { useResolverRolesSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useResolverRolesSuspense({
    name: "example.eth",
    account: {},
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useResolverRolesSuspense>[0];
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

### record

`ResolverRecord | undefined`

Value used for `record` by this operation.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useResolverRolesSuspense>;
```

## Effect Atom

```ts
import { getResolverRolesAtom } from "@ensforge/react/atoms";

const atom = getResolverRolesAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getResolverRoles`](/core/api/actions/capabilities/get-resolver-roles)
- [`sdk.capabilities.getResolverRoles`](/sdk/api/capabilities/get-resolver-roles)
