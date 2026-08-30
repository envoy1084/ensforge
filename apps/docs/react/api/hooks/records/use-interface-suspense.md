---
title: useInterfaceSuspense
description: Suspense hook for fetching interface.
---

# useInterfaceSuspense

Suspense hook for fetching interface.

## Import

```tsx
import { useInterfaceSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useInterfaceSuspense } from "@ensforge/react";

function Component() {
  const result = useInterfaceSuspense({
    name: "example.eth",
    interfaceId: "0x01ffc9a7",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetInterfaceParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### interfaceId

`string`

Four-byte ERC-165 interface identifier.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useInterfaceSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getInterfaceAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getInterfaceAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getInterface`](/core/api/actions/records/get-interface)
- [`sdk.records.getInterface`](/sdk/api/records/get-interface)
