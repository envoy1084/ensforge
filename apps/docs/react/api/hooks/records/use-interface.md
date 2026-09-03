---
title: useInterface
description: Hook for fetching interface.
---

# useInterface

Hook for fetching interface.

## Import

```tsx
import { useInterface } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useInterface } from "@ensforge/react";

function Component() {
  const result = useInterface({
    name: "example.eth",
    interfaceId: "0x01ffc9a7",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="records.getInterface" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetInterfaceParameters } from "@ensforge/sdk/records";
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

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useInterface>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useInterfaceSuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useInterfaceSuspense } from "@ensforge/react";
```

### Usage

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

### Parameters

`useInterfaceSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetInterfaceParameters } from "@ensforge/sdk/records";
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

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
