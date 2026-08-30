---
title: ETH Registrar
description: ENSv2 interface definitions for ETH Registrar.
---

# ETH Registrar

ENSv2 interface definitions for ETH Registrar.

## Import

```ts
import { ethRegistrarV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRegistrarV2InterfaceAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                       | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| `ethRegistrarV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

## When to use

Use these constants for ERC-165 capability detection and protocol routing. They describe interface support; they are not contract deployment addresses.

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof ethRegistrarV2InterfaceAbi;
```
