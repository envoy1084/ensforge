---
title: useRegistrySuspense
description: Suspense hook for fetching registry.
---

# useRegistrySuspense

Suspense hook for fetching registry.

## Import

```tsx
import { useRegistrySuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRegistrySuspense } from "@ensforge/react";

function Component() {
  const result = useRegistrySuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetNameStateParameters } from "@ensforge/sdk/name";
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

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useRegistrySuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getRegistryAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getRegistryAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getRegistry`](/core/api/actions/name/get-registry)
- [`sdk.name.getRegistry`](/sdk/api/name/get-registry)
