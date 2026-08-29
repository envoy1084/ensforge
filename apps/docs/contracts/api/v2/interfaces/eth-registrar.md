---
title: ETH Registrar
description: ENSv2 interface definitions for ETH Registrar.
---

# ETH Registrar

ENSv2 interface definitions for ETH Registrar.

## Import

```ts
import { ethRegistrarV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRegistrarV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                       | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| `ethRegistrarV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
