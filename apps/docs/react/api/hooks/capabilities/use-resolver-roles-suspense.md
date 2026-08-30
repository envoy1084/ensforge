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

::: code-group

```tsx [component.tsx]
import { useResolverRolesSuspense } from "@ensforge/react";

function Component() {
  const result = useResolverRolesSuspense({
    name: "example.eth",
    account: {},
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetResolverRolesParameters } from "@ensforge/sdk/capabilities";
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

### record

`ResolverRecord | undefined`

Value used for `record` by this operation.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useResolverRolesSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getResolverRolesAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getResolverRolesAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getResolverRoles`](/core/api/actions/capabilities/get-resolver-roles)
- [`sdk.capabilities.getResolverRoles`](/sdk/api/capabilities/get-resolver-roles)
