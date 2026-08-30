---
title: useTextsSuspense
description: Suspense hook for fetching texts.
---

# useTextsSuspense

Suspense hook for fetching texts.

## Import

```tsx
import { useTextsSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useTextsSuspense } from "@ensforge/react";

function Component() {
  const result = useTextsSuspense({
    name: "example.eth",
    keys: ["url"],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetTextsParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### keys

`ReadonlyArray<string>`

Record keys to read.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useTextsSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getTextsAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getTextsAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getTexts`](/core/api/actions/records/get-texts)
- [`sdk.records.getTexts`](/sdk/api/records/get-texts)
