---
title: Reverse Registrar Adapter
description: ENSv2 interface definitions for Reverse Registrar Adapter.
---

# Reverse Registrar Adapter

ENSv2 interface definitions for Reverse Registrar Adapter.

## Import

```ts
import { reverseRegistrarAdapterV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: reverseRegistrarAdapterV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                                  | Description                                             |
| --------------------------------------- | ------------------------------------------------------- |
| `reverseRegistrarAdapterV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
