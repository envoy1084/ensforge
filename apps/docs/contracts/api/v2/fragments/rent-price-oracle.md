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

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use the smallest fragment that contains the function or event you need. Fragments include the custom errors required to decode relevant reverts and can be composed with other fragments when one call site needs several capabilities.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof standardRentPriceOracleV2IsPaymentTokenAbi;
```

## Compose fragments

```ts
const abi = [...standardRentPriceOracleV2IsPaymentTokenAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
