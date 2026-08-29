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

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: standardRentPriceOracleV2IsPaymentTokenAbi,
  client: publicClient,
});
```

## Exports

| Export                                       | Description                                             |
| -------------------------------------------- | ------------------------------------------------------- |
| `standardRentPriceOracleV2IsPaymentTokenAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
