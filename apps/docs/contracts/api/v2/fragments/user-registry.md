---
title: User Registry
description: Focused, tree-shakable ABI fragments for User Registry.
---

# User Registry

Focused, tree-shakable ABI fragments for User Registry.

## Import

```ts
import { userRegistryV2InitializeAbi, userRegistryV2SetParentAbi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: userRegistryV2SetParentAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                        | Description                                             |
| ----------------------------- | ------------------------------------------------------- |
| `userRegistryV2InitializeAbi` | Immutable ABI value with viem-compatible literal types. |
| `userRegistryV2SetParentAbi`  | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof userRegistryV2InitializeAbi;
```

## Compose fragments

```ts
const abi = [...userRegistryV2SetParentAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
