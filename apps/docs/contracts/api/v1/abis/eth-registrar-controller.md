---
title: ETH Registrar Controller
description: Complete ABI for the ETH Registrar Controller contract.
---

# ETH Registrar Controller

Complete ABI for the ETH Registrar Controller contract.

## Import

```ts
import {
  ethRegistrarControllerV1InterfaceAbi,
  ethRegistrarControllerV1Abi,
} from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRegistrarControllerV1InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                                 | Description                                             |
| -------------------------------------- | ------------------------------------------------------- |
| `ethRegistrarControllerV1InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarControllerV1Abi`          | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
