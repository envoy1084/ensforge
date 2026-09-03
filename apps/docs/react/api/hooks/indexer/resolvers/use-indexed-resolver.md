---
title: useIndexedResolver
description: React hook that returns indexed resolver metadata and name bindings.
---

# useIndexedResolver

React hook that returns indexed resolver metadata and name bindings.

## Import

```tsx
import { useIndexedResolver } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useIndexedResolver } from "@ensforge/react";

function Component() {
  const result = useIndexedResolver({
    address: "0x0000000000000000000000000000000000000000",
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetIndexedResolverParametersType } from "@ensforge/sdk/indexer";
```

### address

`` `0x${string}` ``

Resolver contract address.

### protocol

`"v1" | "v2" | undefined`

Restricts the lookup to one protocol.

### name

`string | undefined`

Optionally focuses the result on one name binding. Cannot be combined with `namehash`.

### namehash

`` `0x${string}` | undefined ``

Optionally focuses the result on one namehash. Cannot be combined with `name`.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useIndexedResolver>;
```

Successful `data` has type `GetIndexedResolverResultType`.

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useIndexedResolverSuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useIndexedResolverSuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useIndexedResolverSuspense({
  address: "0x0000000000000000000000000000000000000000",
  name: "example.eth",
});
```

### Parameters

`useIndexedResolverSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useIndexedResolverSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getIndexedResolverAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getIndexedResolverAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getIndexedResolver`](/core/api/actions/indexer/resolvers/get-indexed-resolver)
- [`sdk.indexer.getIndexedResolver`](/sdk/api/indexer/resolvers/get-indexed-resolver)
