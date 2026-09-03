---
title: useResolverMetadata
description: React hook that returns the latest indexed ENSIP-16 metadata publication for a resolver.
---

# useResolverMetadata

React hook that returns the latest indexed ENSIP-16 metadata publication for a resolver.

## Import

```tsx
import { useResolverMetadata } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useResolverMetadata } from "@ensforge/react";

function Component() {
  const result = useResolverMetadata({ resolver: "0x0000000000000000000000000000000000000000" });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="indexer.getResolverMetadata" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetResolverMetadataParametersType } from "@ensforge/sdk/indexer";
```

### resolver

`` `0x${string}` ``

Resolver contract whose latest metadata publication should be returned.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useResolverMetadata>;
```

Successful `data` has type `GetResolverMetadataResultType`.

<!--@include: @/shared/indexer/v2-result.md-->

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useResolverMetadataSuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useResolverMetadataSuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useResolverMetadataSuspense({
  resolver: "0x0000000000000000000000000000000000000000",
});
```

### Parameters

`useResolverMetadataSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useResolverMetadataSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getResolverMetadataAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getResolverMetadataAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getResolverMetadata`](/core/api/actions/indexer/resolvers/get-resolver-metadata)
- [`sdk.indexer.getResolverMetadata`](/sdk/api/indexer/resolvers/get-resolver-metadata)
