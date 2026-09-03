---
title: useIndexedRegistry
description: React hook that returns indexed metadata for one ENSv2 registry.
---

# useIndexedRegistry

React hook that returns indexed metadata for one ENSv2 registry.

## Import

```tsx
import { useIndexedRegistry } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useIndexedRegistry } from "@ensforge/react";

function Component() {
  const result = useIndexedRegistry({ name: "example.eth" });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="indexer.getRegistry" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetRegistryParametersType } from "@ensforge/sdk/indexer";
```

### address

`` `0x${string}` | undefined ``

Registry contract address. Provide either `address` or `name`.

### name

`string | undefined`

Managed ENS name. Provide either `name` or `address`.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useIndexedRegistry>;
```

Successful `data` has type `GetRegistryResultType`.

<!--@include: @/shared/indexer/v2-result.md-->

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useIndexedRegistrySuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useIndexedRegistrySuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useIndexedRegistrySuspense({ name: "example.eth" });
```

### Parameters

`useIndexedRegistrySuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useIndexedRegistrySuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getIndexedRegistryAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getIndexedRegistryAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getRegistry`](/core/api/actions/indexer/registries/get-registry)
- [`sdk.indexer.getRegistry`](/sdk/api/indexer/registries/get-registry)
