---
title: ETH Registry
description: Focused, tree-shakable ABI fragments for ETH Registry.
---

# ETH Registry

Focused, tree-shakable ABI fragments for ETH Registry.

## Import

```ts
import { ethRegistryV2GetStateAbi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRegistryV2GetStateAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                     | Description                                             |
| -------------------------- | ------------------------------------------------------- |
| `ethRegistryV2GetStateAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof ethRegistryV2GetStateAbi;
```

## Compose fragments

```ts
const abi = [...ethRegistryV2GetStateAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
