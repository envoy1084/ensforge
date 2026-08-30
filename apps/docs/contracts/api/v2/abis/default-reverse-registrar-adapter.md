---
title: Default Reverse Registrar Adapter
description: Complete ABI for the Default Reverse Registrar Adapter contract.
---

# Default Reverse Registrar Adapter

Complete ABI for the Default Reverse Registrar Adapter contract.

## Import

```ts
import { defaultReverseRegistrarAdapterV2Abi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: defaultReverseRegistrarAdapterV2Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                | Description                                             |
| ------------------------------------- | ------------------------------------------------------- |
| `defaultReverseRegistrarAdapterV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof defaultReverseRegistrarAdapterV2Abi;
```
