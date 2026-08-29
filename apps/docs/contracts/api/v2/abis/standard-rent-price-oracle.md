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

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: standardRentPriceOracleV2Abi,
  client: publicClient,
});
```

## Exports

| Export                         | Description                                             |
| ------------------------------ | ------------------------------------------------------- |
| `standardRentPriceOracleV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
