---
title: Tokenized Registry
description: Focused, tree-shakable ABI fragments for Tokenized Registry.
---

# Tokenized Registry

Focused, tree-shakable ABI fragments for Tokenized Registry.

## Import

```ts
import { tokenizedRegistryV2InterfaceSafeTransferFromAbi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: tokenizedRegistryV2InterfaceSafeTransferFromAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                            | Description                                             |
| ------------------------------------------------- | ------------------------------------------------------- |
| `tokenizedRegistryV2InterfaceSafeTransferFromAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof tokenizedRegistryV2InterfaceSafeTransferFromAbi;
```

## Compose fragments

```ts
const abi = [...tokenizedRegistryV2InterfaceSafeTransferFromAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
