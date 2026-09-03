---
title: useNameState
description: Hook for fetching name state.
---

# useNameState

Hook for fetching name state.

## Import

```tsx
import { useNameState } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useNameState } from "@ensforge/react";

function Component() {
  const result = useNameState({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="name.getNameState" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
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

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useNameState>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useNameStateSuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useNameStateSuspense } from "@ensforge/react";
```

### Usage

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

### Parameters

`useNameStateSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetNameStateParameters } from "@ensforge/sdk/name";
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

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
