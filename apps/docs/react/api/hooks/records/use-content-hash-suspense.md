---
title: useContentHashSuspense
description: Suspense hook for fetching content hash.
---

# useContentHashSuspense

Suspense hook for fetching content hash.

## Import

```tsx
import { useContentHashSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useContentHashSuspense } from "@ensforge/react";

function Component() {
  const result = useContentHashSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetContentHashParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
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
type Result = ReturnType<typeof useContentHashSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getContentHashAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getContentHashAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getContentHash`](/core/api/actions/records/get-content-hash)
- [`sdk.records.getContentHash`](/sdk/api/records/get-content-hash)
