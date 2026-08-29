---
title: Temporal Registry
description: ENSv2 interface definitions for Temporal Registry.
---

# Temporal Registry

ENSv2 interface definitions for Temporal Registry.

## Import

```ts
import { temporalRegistryV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: temporalRegistryV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                           | Description                                             |
| -------------------------------- | ------------------------------------------------------- |
| `temporalRegistryV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
