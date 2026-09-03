---
title: useRegistryLabels
description: React hook that lists ENSv2 names managed by or referring to a registry.
---

# useRegistryLabels

React hook that lists ENSv2 names managed by or referring to a registry.

## Import

```tsx
import { useRegistryLabels } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRegistryLabels } from "@ensforge/react";

function Component() {
  const result = useRegistryLabels({
    address: "0x0000000000000000000000000000000000000000",
    relationship: "label",
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
import type { GetRegistryLabelsParametersType } from "@ensforge/sdk/indexer";
```

### address

`0x${string}`

Registry contract address.

### relationship

`"label" | "referenced-by" | undefined`

Selects directly managed labels, names referring to the registry, or both when omitted.

<!--@include: @/shared/indexer/pagination-parameters.md-->

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useRegistryLabels>;
```

Successful `data` has type `GetRegistryLabelsResultType`.

<!--@include: @/shared/indexer/v2-result.md-->

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useRegistryLabelsSuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useRegistryLabelsSuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useRegistryLabelsSuspense({
  address: "0x0000000000000000000000000000000000000000",
  relationship: "label",
  pageSize: 20,
});
```

### Parameters

`useRegistryLabelsSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useRegistryLabelsSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getRegistryLabelsAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getRegistryLabelsAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getRegistryLabels`](/core/api/actions/indexer/registries/get-registry-labels)
- [`sdk.indexer.getRegistryLabels`](/sdk/api/indexer/registries/get-registry-labels)
