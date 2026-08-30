---
title: Graveyard
description: Complete ABI for the Graveyard contract.
---

# Graveyard

Complete ABI for the Graveyard contract.

## Import

```ts
import { graveyardV2Abi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: graveyardV2Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export           | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `graveyardV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof graveyardV2Abi;
```
