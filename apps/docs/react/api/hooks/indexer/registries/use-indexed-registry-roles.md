---
title: useIndexedRegistryRoles
description: React hook that lists ENSv2 registry role assignments.
---

# useIndexedRegistryRoles

React hook that lists ENSv2 registry role assignments.

## Import

```tsx
import { useIndexedRegistryRoles } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useIndexedRegistryRoles } from "@ensforge/react";

function Component() {
  const result = useIndexedRegistryRoles({
    registry: "0x0000000000000000000000000000000000000000",
    filter: { active: true },
    pageSize: 20,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetRegistryRolesParametersType } from "@ensforge/sdk/indexer";
```

### registry

`0x${string}`

Registry contract whose assignments should be queried.

### filter

<!--@include: @/shared/indexer/v2-role-filter.md-->

<!--@include: @/shared/indexer/pagination-parameters.md-->

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useIndexedRegistryRoles>;
```

Successful `data` has type `GetRegistryRolesResultType`.

<!--@include: @/shared/indexer/v2-result.md-->

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useIndexedRegistryRolesSuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useIndexedRegistryRolesSuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useIndexedRegistryRolesSuspense({
  registry: "0x0000000000000000000000000000000000000000",
  filter: { active: true },
  pageSize: 20,
});
```

### Parameters

`useIndexedRegistryRolesSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useIndexedRegistryRolesSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getIndexedRegistryRolesAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getIndexedRegistryRolesAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getRegistryRoles`](/core/api/actions/indexer/registries/get-registry-roles)
- [`sdk.indexer.getRegistryRoles`](/sdk/api/indexer/registries/get-registry-roles)
