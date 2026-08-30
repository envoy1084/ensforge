---
title: useResolve
description: Hook for resolving .
---

# useResolve

Hook for resolving .

## Import

```tsx
import { useResolve } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useResolve } from "@ensforge/react";

function Component() {
  const result = useResolve({
    name: "example.eth",
    data: "0x",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { ResolveParameters, UseEnsAtomParameters } from "@ensforge/react";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### data

`string`

Raw calldata or record bytes.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useResolve>;
```

<!--@include: @/shared/react/atom-result.md-->

## Effect Atom

```ts
import { resolveAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = resolveAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`resolve`](/core/api/actions/resolution/resolve)
- [`sdk.resolution.resolve`](/sdk/api/resolution/resolve)
