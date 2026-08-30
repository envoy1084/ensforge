---
title: useNameStatusSuspense
description: Suspense hook for fetching name status.
---

# useNameStatusSuspense

Suspense hook for fetching name status.

## Import

```tsx
import { useNameStatusSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useNameStatusSuspense } from "@ensforge/react";

function Component() {
  const result = useNameStatusSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
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

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useNameStatusSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getNameStatusAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getNameStatusAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getNameStatus`](/core/api/actions/name/get-name-status)
- [`sdk.name.getNameStatus`](/sdk/api/name/get-name-status)
