---
title: useDataSuspense
description: Suspense hook for fetching data.
---

# useDataSuspense

Suspense hook for fetching data.

## Import

```tsx
import { useDataSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useDataSuspense } from "@ensforge/react";

function Component() {
  const result = useDataSuspense({
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
import type { GetDataParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
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
type Result = ReturnType<typeof useDataSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getDataAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getDataAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getData`](/core/api/actions/records/get-data)
- [`sdk.records.getData`](/sdk/api/records/get-data)
