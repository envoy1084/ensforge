---
title: Standalone Reverse Registrar
description: Complete ABI for the Standalone Reverse Registrar contract.
---

# Standalone Reverse Registrar

Complete ABI for the Standalone Reverse Registrar contract.

## Import

```ts
import {
  standaloneReverseRegistrarV1InterfaceAbi,
  standaloneReverseRegistrarV1Abi,
} from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: standaloneReverseRegistrarV1InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                                     | Description                                             |
| ------------------------------------------ | ------------------------------------------------------- |
| `standaloneReverseRegistrarV1InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |
| `standaloneReverseRegistrarV1Abi`          | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
