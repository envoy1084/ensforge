---
title: L2 Reverse Registrar
description: Complete ABI for the L2 Reverse Registrar contract.
---

# L2 Reverse Registrar

Complete ABI for the L2 Reverse Registrar contract.

## Import

```ts
import {
  l2ReverseRegistrarV1InterfaceAbi,
  l2ReverseRegistrarV1Abi,
  l2ReverseRegistrarWithMigrationV1Abi,
} from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: l2ReverseRegistrarV1InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                                 | Description                                             |
| -------------------------------------- | ------------------------------------------------------- |
| `l2ReverseRegistrarV1InterfaceAbi`     | Immutable ABI value with viem-compatible literal types. |
| `l2ReverseRegistrarV1Abi`              | Immutable ABI value with viem-compatible literal types. |
| `l2ReverseRegistrarWithMigrationV1Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
