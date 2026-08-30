---
title: Standard Rent Price Oracle
description: Complete ABI for the Standard Rent Price Oracle contract.
---

# Standard Rent Price Oracle

Complete ABI for the Standard Rent Price Oracle contract.

## Import

```ts
import { standardRentPriceOracleV2Abi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: standardRentPriceOracleV2Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                         | Description                                             |
| ------------------------------ | ------------------------------------------------------- |
| `standardRentPriceOracleV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof standardRentPriceOracleV2Abi;
```
