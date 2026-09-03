---
title: useCanonicalResource
description: Hook for fetching canonical resource.
---

# useCanonicalResource

Hook for fetching canonical resource.

## Import

```tsx
import { useCanonicalResource } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useCanonicalResource } from "@ensforge/react";

function Component() {
  const result = useCanonicalResource({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="name.getCanonicalResource" />

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
type Result = ReturnType<typeof useCanonicalResource>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useCanonicalResourceSuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useCanonicalResourceSuspense } from "@ensforge/react";
```

### Usage

::: code-group

```tsx [component.tsx]
import { useCanonicalResourceSuspense } from "@ensforge/react";

function Component() {
  const result = useCanonicalResourceSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

### Parameters

`useCanonicalResourceSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetNameStateParameters } from "@ensforge/sdk/name";
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useCanonicalResourceSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getCanonicalResourceAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getCanonicalResourceAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getCanonicalResource`](/core/api/actions/name/get-canonical-resource)
- [`sdk.name.getCanonicalResource`](/sdk/api/name/get-canonical-resource)
