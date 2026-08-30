---
title: Default Reverse Registrar
description: Complete ABI for the Default Reverse Registrar contract.
---

# Default Reverse Registrar

Complete ABI for the Default Reverse Registrar contract.

## Import

```ts
import {
  defaultReverseRegistrarV1InterfaceAbi,
  defaultReverseRegistrarV1Abi,
} from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: defaultReverseRegistrarV1InterfaceAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                  | Description                                             |
| --------------------------------------- | ------------------------------------------------------- |
| `defaultReverseRegistrarV1InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |
| `defaultReverseRegistrarV1Abi`          | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof defaultReverseRegistrarV1InterfaceAbi;
```
