---
title: useManager
description: Hook for fetching manager.
---

# useManager

Hook for fetching manager.

## Import

```tsx
import { useManager } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useManager } from "@ensforge/react";

function Component() {
  const result = useManager({
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
type Result = ReturnType<typeof useManager>;
```

<!--@include: @/shared/react/atom-result.md-->

## Effect Atom

```ts
import { getManagerAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getManagerAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getManager`](/core/api/actions/name/get-manager)
- [`sdk.name.getManager`](/sdk/api/name/get-manager)
