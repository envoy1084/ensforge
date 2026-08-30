---
title: useHasResolverRoles
description: Hook for checking whether the name has resolver roles.
---

# useHasResolverRoles

Hook for checking whether the name has resolver roles.

## Import

```tsx
import { useHasResolverRoles } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useHasResolverRoles } from "@ensforge/react";

function Component() {
  const result = useHasResolverRoles({
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
import type { HasResolverRolesParameters, UseEnsAtomParameters } from "@ensforge/react";
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

### record

`ResolverRecord | undefined`

Value used for `record` by this operation.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useHasResolverRoles>;
```

<!--@include: @/shared/react/atom-result.md-->

## Effect Atom

```ts
import { hasResolverRolesAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = hasResolverRolesAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`hasResolverRoles`](/core/api/actions/capabilities/has-resolver-roles)
- [`sdk.capabilities.hasResolverRoles`](/sdk/api/capabilities/has-resolver-roles)
