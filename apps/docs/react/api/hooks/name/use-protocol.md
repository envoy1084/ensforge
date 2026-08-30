---
title: useProtocol
description: Hook for fetching protocol.
---

# useProtocol

Hook for fetching protocol.

## Import

```tsx
import { useProtocol } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useProtocol } from "@ensforge/react";

function Component() {
  const result = useProtocol({
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
type Result = ReturnType<typeof useProtocol>;
```

<!--@include: @/shared/react/atom-result.md-->

## Effect Atom

```ts
import { getProtocolAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getProtocolAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getProtocol`](/core/api/actions/name/get-protocol)
- [`sdk.name.getProtocol`](/sdk/api/name/get-protocol)
