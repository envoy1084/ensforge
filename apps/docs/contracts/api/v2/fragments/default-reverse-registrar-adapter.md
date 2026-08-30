---
title: Default Reverse Registrar Adapter
description: Focused, tree-shakable ABI fragments for Default Reverse Registrar Adapter.
---

# Default Reverse Registrar Adapter

Focused, tree-shakable ABI fragments for Default Reverse Registrar Adapter.

## Import

```ts
import { defaultReverseRegistrarAdapterV2SetNameAbi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: defaultReverseRegistrarAdapterV2SetNameAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                       | Description                                             |
| -------------------------------------------- | ------------------------------------------------------- |
| `defaultReverseRegistrarAdapterV2SetNameAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof defaultReverseRegistrarAdapterV2SetNameAbi;
```

## Compose fragments

```ts
const abi = [...defaultReverseRegistrarAdapterV2SetNameAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
