---
title: Wrapper Registry
description: ENSv2 interface definitions for Wrapper Registry.
---

# Wrapper Registry

ENSv2 interface definitions for Wrapper Registry.

## Import

```ts
import { wrapperRegistryV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: wrapperRegistryV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                          | Description                                             |
| ------------------------------- | ------------------------------------------------------- |
| `wrapperRegistryV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
