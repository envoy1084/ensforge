---
title: Reverse Registrar
description: Complete ABI for the Reverse Registrar contract.
---

# Reverse Registrar

Complete ABI for the Reverse Registrar contract.

## Import

```ts
import { reverseRegistrarV1InterfaceAbi, reverseRegistrarV1Abi } from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: reverseRegistrarV1InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                           | Description                                             |
| -------------------------------- | ------------------------------------------------------- |
| `reverseRegistrarV1InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |
| `reverseRegistrarV1Abi`          | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
