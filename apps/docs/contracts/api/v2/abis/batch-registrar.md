---
title: Batch Registrar
description: Complete ABI for the Batch Registrar contract.
---

# Batch Registrar

Complete ABI for the Batch Registrar contract.

## Import

```ts
import { batchRegistrarV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: batchRegistrarV2Abi,
  client: publicClient,
});
```

## Exports

| Export                | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `batchRegistrarV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
