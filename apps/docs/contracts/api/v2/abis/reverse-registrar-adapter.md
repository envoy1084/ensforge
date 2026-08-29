---
title: Reverse Registrar Adapter
description: Complete ABI for the Reverse Registrar Adapter contract.
---

# Reverse Registrar Adapter

Complete ABI for the Reverse Registrar Adapter contract.

## Import

```ts
import { reverseRegistrarAdapterV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: reverseRegistrarAdapterV2Abi,
  client: publicClient,
});
```

## Exports

| Export                         | Description                                             |
| ------------------------------ | ------------------------------------------------------- |
| `reverseRegistrarAdapterV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
