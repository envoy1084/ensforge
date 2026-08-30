---
title: useCanonicalResourceSuspense
description: Suspense hook for fetching canonical resource.
---

# useCanonicalResourceSuspense

Suspense hook for fetching canonical resource.

## Import

```tsx
import { useCanonicalResourceSuspense } from "@ensforge/react";
```

## Usage

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
