---
title: useResolverRoles
description: Hook for fetching resolver roles.
---

# useResolverRoles

Hook for fetching resolver roles.

## Import

```tsx
import { useResolverRoles } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useResolverRoles({
    name: "example.eth",
    account: {},
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useResolverRoles>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useResolverRoles>;
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
