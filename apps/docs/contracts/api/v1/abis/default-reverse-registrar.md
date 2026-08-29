---
title: Default Reverse Registrar
description: Complete ABI for the Default Reverse Registrar contract.
---

# Default Reverse Registrar

Complete ABI for the Default Reverse Registrar contract.

## Import

```ts
import {
  defaultReverseRegistrarV1InterfaceAbi,
  defaultReverseRegistrarV1Abi,
} from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: defaultReverseRegistrarV1InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                                  | Description                                             |
| --------------------------------------- | ------------------------------------------------------- |
| `defaultReverseRegistrarV1InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |
| `defaultReverseRegistrarV1Abi`          | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
