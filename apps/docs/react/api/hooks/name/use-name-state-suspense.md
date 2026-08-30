---
title: useNameStateSuspense
description: Suspense hook for fetching name state.
---

# useNameStateSuspense

Suspense hook for fetching name state.

## Import

```tsx
import { useNameStateSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useNameStateSuspense } from "@ensforge/react";

function Component() {
  const result = useNameStateSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetNameStateParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
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
type Result = ReturnType<typeof useNameStateSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getNameStateAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getNameStateAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getNameState`](/core/api/actions/name/get-name-state)
- [`sdk.name.getNameState`](/sdk/api/name/get-name-state)
