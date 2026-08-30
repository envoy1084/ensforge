---
title: Wrapped ETH Registrar Controller
description: Complete ABI for the Wrapped ETH Registrar Controller contract.
---

# Wrapped ETH Registrar Controller

Complete ABI for the Wrapped ETH Registrar Controller contract.

## Import

```ts
import { wrappedEthRegistrarControllerV1Abi } from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: wrappedEthRegistrarControllerV1Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                               | Description                                             |
| ------------------------------------ | ------------------------------------------------------- |
| `wrappedEthRegistrarControllerV1Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof wrappedEthRegistrarControllerV1Abi;
```
