---
title: Enhanced Access Control
description: ENSv2 interface definitions for Enhanced Access Control.
---

# Enhanced Access Control

ENSv2 interface definitions for Enhanced Access Control.

## Import

```ts
import { enhancedAccessControlV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: enhancedAccessControlV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                                | Description                                             |
| ------------------------------------- | ------------------------------------------------------- |
| `enhancedAccessControlV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
