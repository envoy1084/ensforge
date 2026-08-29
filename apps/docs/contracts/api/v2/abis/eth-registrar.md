---
title: ETH Registrar
description: Complete ABI for the ETH Registrar contract.
---

# ETH Registrar

Complete ABI for the ETH Registrar contract.

## Import

```ts
import { ethRegistrarV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRegistrarV2Abi,
  client: publicClient,
});
```

## Exports

| Export              | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `ethRegistrarV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
