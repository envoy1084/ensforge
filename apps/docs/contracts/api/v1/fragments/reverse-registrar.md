---
title: Reverse Registrar
description: Focused, tree-shakable ABI fragments for Reverse Registrar.
---

# Reverse Registrar

Focused, tree-shakable ABI fragments for Reverse Registrar.

## Import

```ts
import {
  reverseRegistrarV1DefaultResolverAbi,
  reverseRegistrarV1SetNameAbi,
  reverseRegistrarV1SetNameForAddrAbi,
} from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: reverseRegistrarV1DefaultResolverAbi,
  client: publicClient,
});
```

## Exports

| Export                                 | Description                                             |
| -------------------------------------- | ------------------------------------------------------- |
| `reverseRegistrarV1DefaultResolverAbi` | Immutable ABI value with viem-compatible literal types. |
| `reverseRegistrarV1SetNameAbi`         | Immutable ABI value with viem-compatible literal types. |
| `reverseRegistrarV1SetNameForAddrAbi`  | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
