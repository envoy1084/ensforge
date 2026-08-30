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

::: code-group

```tsx [component.tsx]
import { useHasRegistryRolesSuspense } from "@ensforge/react";

function Component() {
  const result = useHasRegistryRolesSuspense({
    name: "example.eth",
    account: {},
    roles: 1n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { HasRegistryRolesParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
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

### roles

`bigint`

Role bitmask to inspect, grant, or revoke.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useHasRegistryRolesSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { hasRegistryRolesAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = hasRegistryRolesAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`hasRegistryRoles`](/core/api/actions/capabilities/has-registry-roles)
- [`sdk.capabilities.hasRegistryRoles`](/sdk/api/capabilities/has-registry-roles)
