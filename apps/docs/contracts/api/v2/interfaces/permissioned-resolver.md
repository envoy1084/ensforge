---
title: Permissioned Resolver
description: ENSv2 interface definitions for Permissioned Resolver.
---

# Permissioned Resolver

ENSv2 interface definitions for Permissioned Resolver.

## Import

```ts
import { permissionedResolverV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: permissionedResolverV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                               | Description                                             |
| ------------------------------------ | ------------------------------------------------------- |
| `permissionedResolverV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
