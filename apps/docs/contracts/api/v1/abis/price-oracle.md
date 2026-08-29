---
title: Price Oracle
description: Complete ABI for the Price Oracle contract.
---

# Price Oracle

Complete ABI for the Price Oracle contract.

## Import

```ts
import {
  priceOracleV1Abi,
  stablePriceOracleV1Abi,
  exponentialPremiumPriceOracleV1Abi,
  linearPremiumPriceOracleV1InterfaceAbi,
  linearPremiumPriceOracleV1Abi,
} from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: priceOracleV1Abi,
  client: publicClient,
});
```

## Exports

| Export                                   | Description                                             |
| ---------------------------------------- | ------------------------------------------------------- |
| `priceOracleV1Abi`                       | Immutable ABI value with viem-compatible literal types. |
| `stablePriceOracleV1Abi`                 | Immutable ABI value with viem-compatible literal types. |
| `exponentialPremiumPriceOracleV1Abi`     | Immutable ABI value with viem-compatible literal types. |
| `linearPremiumPriceOracleV1InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |
| `linearPremiumPriceOracleV1Abi`          | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
