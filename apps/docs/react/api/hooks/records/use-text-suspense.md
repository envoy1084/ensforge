---
title: useTextSuspense
description: Suspense hook for fetching text.
---

# useTextSuspense

Suspense hook for fetching text.

## Import

```tsx
import { useTextSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useTextSuspense } from "@ensforge/react";

function Component() {
  const result = useTextSuspense({
    name: "example.eth",
    key: "url",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetTextParameters } from "@ensforge/sdk/records";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### key

`string`

Record key.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useTextSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getTextAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getTextAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getText`](/core/api/actions/records/get-text)
- [`sdk.records.getText`](/sdk/api/records/get-text)
