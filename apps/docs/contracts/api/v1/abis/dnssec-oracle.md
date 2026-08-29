---
title: DNSSEC Oracle
description: Complete ABI for the DNSSEC Oracle contract.
---

# DNSSEC Oracle

Complete ABI for the DNSSEC Oracle contract.

## Import

```ts
import { dnssecOracleV1InterfaceAbi, dnssecOracleV1Abi } from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: dnssecOracleV1InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                       | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| `dnssecOracleV1InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |
| `dnssecOracleV1Abi`          | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
