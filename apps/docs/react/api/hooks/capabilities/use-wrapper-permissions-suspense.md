---
title: useWrapperPermissionsSuspense
description: Suspense hook for fetching wrapper permissions.
---

# useWrapperPermissionsSuspense

Suspense hook for fetching wrapper permissions.

## Import

```tsx
import { useWrapperPermissionsSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useWrapperPermissionsSuspense } from "@ensforge/react";

function Component() {
  const result = useWrapperPermissionsSuspense({
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
import type { AccountCapabilityParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
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

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useWrapperPermissionsSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getWrapperPermissionsAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getWrapperPermissionsAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getWrapperPermissions`](/core/api/actions/capabilities/get-wrapper-permissions)
- [`sdk.capabilities.getWrapperPermissions`](/sdk/api/capabilities/get-wrapper-permissions)
