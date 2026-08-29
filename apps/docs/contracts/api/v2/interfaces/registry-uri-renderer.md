---
title: Registry URI Renderer
description: ENSv2 interface definitions for Registry URI Renderer.
---

# Registry URI Renderer

ENSv2 interface definitions for Registry URI Renderer.

## Import

```ts
import { registryUriRendererV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: registryUriRendererV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                              | Description                                             |
| ----------------------------------- | ------------------------------------------------------- |
| `registryUriRendererV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
