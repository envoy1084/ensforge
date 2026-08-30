---
title: Standalone Reverse Registrar
description: Complete ABI for the Standalone Reverse Registrar contract.
---

# Standalone Reverse Registrar

Complete ABI for the Standalone Reverse Registrar contract.

## Import

```ts
import {
  standaloneReverseRegistrarV1InterfaceAbi,
  standaloneReverseRegistrarV1Abi,
} from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: standaloneReverseRegistrarV1InterfaceAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                     | Description                                             |
| ------------------------------------------ | ------------------------------------------------------- |
| `standaloneReverseRegistrarV1InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |
| `standaloneReverseRegistrarV1Abi`          | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof standaloneReverseRegistrarV1InterfaceAbi;
```
