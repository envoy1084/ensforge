---
title: useRegistryRoles
description: Hook for fetching registry roles.
---

# useRegistryRoles

Hook for fetching registry roles.

## Import

```tsx
import { useRegistryRoles } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRegistryRoles } from "@ensforge/react";

function Component() {
  const result = useRegistryRoles({
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
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { AccountCapabilityParameters } from "@ensforge/sdk/capabilities";
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

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useRegistryRoles>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useRegistryRolesSuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useRegistryRolesSuspense } from "@ensforge/react";
```

### Usage

::: code-group

```tsx [component.tsx]
import { useRegistryRolesSuspense } from "@ensforge/react";

function Component() {
  const result = useRegistryRolesSuspense({
    name: "example.eth",
    account: {},
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

### Parameters

`useRegistryRolesSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { AccountCapabilityParameters } from "@ensforge/sdk/capabilities";
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useRegistryRolesSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getRegistryRolesAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getRegistryRolesAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getRegistryRoles`](/core/api/actions/capabilities/get-registry-roles)
- [`sdk.capabilities.getRegistryRoles`](/sdk/api/capabilities/get-registry-roles)
