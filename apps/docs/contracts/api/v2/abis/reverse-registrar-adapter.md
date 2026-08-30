---
title: Reverse Registrar Adapter
description: Complete ABI for the Reverse Registrar Adapter contract.
---

# Reverse Registrar Adapter

Complete ABI for the Reverse Registrar Adapter contract.

## Import

```ts
import { reverseRegistrarAdapterV2Abi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: reverseRegistrarAdapterV2Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                         | Description                                             |
| ------------------------------ | ------------------------------------------------------- |
| `reverseRegistrarAdapterV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof reverseRegistrarAdapterV2Abi;
```
