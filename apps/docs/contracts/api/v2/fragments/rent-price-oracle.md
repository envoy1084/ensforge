---
title: Rent Price Oracle
description: Focused, tree-shakable ABI fragments for Rent Price Oracle.
---

# Rent Price Oracle

Focused, tree-shakable ABI fragments for Rent Price Oracle.

## Import

```ts
import { standardRentPriceOracleV2IsPaymentTokenAbi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: standardRentPriceOracleV2IsPaymentTokenAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                       | Description                                             |
| -------------------------------------------- | ------------------------------------------------------- |
| `standardRentPriceOracleV2IsPaymentTokenAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof standardRentPriceOracleV2IsPaymentTokenAbi;
```

## Compose fragments

```ts
const abi = [...standardRentPriceOracleV2IsPaymentTokenAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
