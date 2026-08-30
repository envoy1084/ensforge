---
title: useWriteTargetSuspense
description: Suspense hook for fetching write target.
---

# useWriteTargetSuspense

Suspense hook for fetching write target.

## Import

```tsx
import { useWriteTargetSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useWriteTargetSuspense } from "@ensforge/react";

function Component() {
  const result = useWriteTargetSuspense({
    name: "example.eth",
    operation: {},
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetWriteTargetParameters } from "@ensforge/sdk/capabilities";
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

### operation

`WriteOperation`

Value used for `operation` by this operation.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useWriteTargetSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getWriteTargetAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getWriteTargetAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getWriteTarget`](/core/api/actions/capabilities/get-write-target)
- [`sdk.capabilities.getWriteTarget`](/sdk/api/capabilities/get-write-target)
