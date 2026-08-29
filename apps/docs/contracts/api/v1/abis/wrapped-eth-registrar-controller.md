---
title: Wrapped ETH Registrar Controller
description: Complete ABI for the Wrapped ETH Registrar Controller contract.
---

# Wrapped ETH Registrar Controller

Complete ABI for the Wrapped ETH Registrar Controller contract.

## Import

```ts
import { wrappedEthRegistrarControllerV1Abi } from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: wrappedEthRegistrarControllerV1Abi,
  client: publicClient,
});
```

## Exports

| Export                               | Description                                             |
| ------------------------------------ | ------------------------------------------------------- |
| `wrappedEthRegistrarControllerV1Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
