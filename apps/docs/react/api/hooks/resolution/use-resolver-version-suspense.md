---
title: useResolverVersionSuspense
description: Suspense hook for fetching resolver version.
---

# useResolverVersionSuspense

Suspense hook for fetching resolver version.

## Import

```tsx
import { useResolverVersionSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useResolverVersionSuspense } from "@ensforge/react";

function Component() {
  const result = useResolverVersionSuspense({
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
import type { GetResolverVersionParameters } from "@ensforge/sdk/resolution";
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
type Result = ReturnType<typeof useResolverVersionSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getResolverVersionAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getResolverVersionAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getResolverVersion`](/core/api/actions/resolution/get-resolver-version)
- [`sdk.resolution.getResolverVersion`](/sdk/api/resolution/get-resolver-version)
