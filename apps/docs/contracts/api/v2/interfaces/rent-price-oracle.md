---
title: Rent Price Oracle
description: ENSv2 interface definitions for Rent Price Oracle.
---

# Rent Price Oracle

ENSv2 interface definitions for Rent Price Oracle.

## Import

```ts
import { rentPriceOracleV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: rentPriceOracleV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                          | Description                                             |
| ------------------------------- | ------------------------------------------------------- |
| `rentPriceOracleV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
