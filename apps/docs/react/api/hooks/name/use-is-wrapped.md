---
title: useIsWrapped
description: Hook for checking whether the name is wrapped.
---

# useIsWrapped

Hook for checking whether the name is wrapped.

## Import

```tsx
import { useIsWrapped } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useIsWrapped } from "@ensforge/react";

function Component() {
  const result = useIsWrapped({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

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
type Result = ReturnType<typeof useIsWrapped>;
```

<!--@include: @/shared/react/atom-result.md-->

## Effect Atom

```ts
import { isWrappedAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = isWrappedAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`isWrapped`](/core/api/actions/name/is-wrapped)
- [`sdk.name.isWrapped`](/sdk/api/name/is-wrapped)
