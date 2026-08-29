---
title: Default Reverse Registrar Adapter
description: Complete ABI for the Default Reverse Registrar Adapter contract.
---

# Default Reverse Registrar Adapter

Complete ABI for the Default Reverse Registrar Adapter contract.

## Import

```ts
import { defaultReverseRegistrarAdapterV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: defaultReverseRegistrarAdapterV2Abi,
  client: publicClient,
});
```

## Exports

| Export                                | Description                                             |
| ------------------------------------- | ------------------------------------------------------- |
| `defaultReverseRegistrarAdapterV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
