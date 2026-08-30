---
title: Standard Registry
description: Focused, tree-shakable ABI fragments for Standard Registry.
---

# Standard Registry

Focused, tree-shakable ABI fragments for Standard Registry.

## Import

```ts
import { standardRegistryV2SetResolverAbi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: standardRegistryV2SetResolverAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                             | Description                                             |
| ---------------------------------- | ------------------------------------------------------- |
| `standardRegistryV2SetResolverAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof standardRegistryV2SetResolverAbi;
```

## Compose fragments

```ts
const abi = [...standardRegistryV2SetResolverAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
