---
title: Rent Price Oracle Provider
description: ENSv2 interface definitions for Rent Price Oracle Provider.
---

# Rent Price Oracle Provider

ENSv2 interface definitions for Rent Price Oracle Provider.

## Import

```ts
import { rentPriceOracleProviderV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: rentPriceOracleProviderV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                                  | Description                                             |
| --------------------------------------- | ------------------------------------------------------- |
| `rentPriceOracleProviderV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
