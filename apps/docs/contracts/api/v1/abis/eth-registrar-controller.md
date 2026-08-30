---
title: ETH Registrar Controller
description: Complete ABI for the ETH Registrar Controller contract.
---

# ETH Registrar Controller

Complete ABI for the ETH Registrar Controller contract.

## Import

```ts
import {
  ethRegistrarControllerV1InterfaceAbi,
  ethRegistrarControllerV1Abi,
} from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRegistrarControllerV1InterfaceAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                 | Description                                             |
| -------------------------------------- | ------------------------------------------------------- |
| `ethRegistrarControllerV1InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarControllerV1Abi`          | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof ethRegistrarControllerV1InterfaceAbi;
```
