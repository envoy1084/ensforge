---
title: useAlias
description: Hook for fetching alias.
---

# useAlias

Hook for fetching alias.

## Import

```tsx
import { useAlias } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useAlias } from "@ensforge/react";

function Component() {
  const result = useAlias({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="resolution.getAlias" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetAliasParameters } from "@ensforge/sdk/resolution";
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
type Result = ReturnType<typeof useAlias>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useAliasSuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useAliasSuspense } from "@ensforge/react";
```

### Usage

::: code-group

```tsx [component.tsx]
import { useAliasSuspense } from "@ensforge/react";

function Component() {
  const result = useAliasSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

### Parameters

`useAliasSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetAliasParameters } from "@ensforge/sdk/resolution";
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useAliasSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getAliasAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getAliasAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getAlias`](/core/api/actions/resolution/get-alias)
- [`sdk.resolution.getAlias`](/sdk/api/resolution/get-alias)
