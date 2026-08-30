---
title: Reverse Registrar
description: Complete ABI for the Reverse Registrar contract.
---

# Reverse Registrar

Complete ABI for the Reverse Registrar contract.

## Import

```ts
import { reverseRegistrarV1InterfaceAbi, reverseRegistrarV1Abi } from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: reverseRegistrarV1InterfaceAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                           | Description                                             |
| -------------------------------- | ------------------------------------------------------- |
| `reverseRegistrarV1InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |
| `reverseRegistrarV1Abi`          | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof reverseRegistrarV1InterfaceAbi;
```
