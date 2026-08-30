---
title: L2 Reverse Registrar
description: Complete ABI for the L2 Reverse Registrar contract.
---

# L2 Reverse Registrar

Complete ABI for the L2 Reverse Registrar contract.

## Import

```ts
import {
  l2ReverseRegistrarV1InterfaceAbi,
  l2ReverseRegistrarV1Abi,
  l2ReverseRegistrarWithMigrationV1Abi,
} from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: l2ReverseRegistrarV1InterfaceAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                 | Description                                             |
| -------------------------------------- | ------------------------------------------------------- |
| `l2ReverseRegistrarV1InterfaceAbi`     | Immutable ABI value with viem-compatible literal types. |
| `l2ReverseRegistrarV1Abi`              | Immutable ABI value with viem-compatible literal types. |
| `l2ReverseRegistrarWithMigrationV1Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof l2ReverseRegistrarV1InterfaceAbi;
```
