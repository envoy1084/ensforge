---
title: useFusesSuspense
description: Suspense hook for fetching fuses.
---

# useFusesSuspense

Suspense hook for fetching fuses.

## Import

```tsx
import { useFusesSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useFusesSuspense } from "@ensforge/react";

function Component() {
  const result = useFusesSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { WrapperReadParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
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
type Result = ReturnType<typeof useFusesSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getFusesAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getFusesAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getFuses`](/core/api/actions/wrapping/get-fuses)
- [`sdk.wrapping.getFuses`](/sdk/api/wrapping/get-fuses)
