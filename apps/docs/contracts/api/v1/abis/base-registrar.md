---
title: Base Registrar
description: Complete ABI for the Base Registrar contract.
---

# Base Registrar

Complete ABI for the Base Registrar contract.

## Import

```ts
import { baseRegistrarV1Abi } from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: baseRegistrarV1Abi,
  client: publicClient,
});
```

## Exports

| Export               | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `baseRegistrarV1Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
