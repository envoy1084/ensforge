---
title: Permissioned Registry
description: ENSv2 interface definitions for Permissioned Registry.
---

# Permissioned Registry

ENSv2 interface definitions for Permissioned Registry.

## Import

```ts
import { permissionedRegistryV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: permissionedRegistryV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                               | Description                                             |
| ------------------------------------ | ------------------------------------------------------- |
| `permissionedRegistryV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
