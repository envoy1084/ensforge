---
title: L2 Reverse Registrar
description: ENSv2 interface definitions for L2 Reverse Registrar.
---

# L2 Reverse Registrar

ENSv2 interface definitions for L2 Reverse Registrar.

## Import

```ts
import { l2ReverseRegistrarV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: l2ReverseRegistrarV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                             | Description                                             |
| ---------------------------------- | ------------------------------------------------------- |
| `l2ReverseRegistrarV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
