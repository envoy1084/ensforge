---
title: useTokenId
description: Hook for fetching token id.
---

# useTokenId

Hook for fetching token id.

## Import

```tsx
import { useTokenId } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useTokenId } from "@ensforge/react";

function Component() {
  const result = useTokenId({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetNameStateParameters, UseEnsAtomParameters } from "@ensforge/react";
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
type Result = ReturnType<typeof useTokenId>;
```

<!--@include: @/shared/react/atom-result.md-->

## Effect Atom

```ts
import { getTokenIdAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getTokenIdAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getTokenId`](/core/api/actions/name/get-token-id)
- [`sdk.name.getTokenId`](/sdk/api/name/get-token-id)
