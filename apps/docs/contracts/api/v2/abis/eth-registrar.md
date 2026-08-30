---
title: ETH Registrar
description: Complete ABI for the ETH Registrar contract.
---

# ETH Registrar

Complete ABI for the ETH Registrar contract.

## Import

```ts
import { ethRegistrarV2Abi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRegistrarV2Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export              | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `ethRegistrarV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof ethRegistrarV2Abi;
```
