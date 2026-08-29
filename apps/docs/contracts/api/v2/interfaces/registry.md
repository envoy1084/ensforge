---
title: Registry
description: ENSv2 interface definitions for Registry.
---

# Registry

ENSv2 interface definitions for Registry.

## Import

```ts
import { registryV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: registryV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                   | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `registryV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
