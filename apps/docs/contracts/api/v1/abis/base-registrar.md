---
title: Base Registrar
description: Complete ABI for the Base Registrar contract.
---

# Base Registrar

Complete ABI for the Base Registrar contract.

## Import

```ts
import { baseRegistrarV1Abi } from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: baseRegistrarV1Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export               | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `baseRegistrarV1Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof baseRegistrarV1Abi;
```
