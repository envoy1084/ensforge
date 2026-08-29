---
title: Permissioned Resolver Initializable
description: ENSv2 interface definitions for Permissioned Resolver Initializable.
---

# Permissioned Resolver Initializable

ENSv2 interface definitions for Permissioned Resolver Initializable.

## Import

```ts
import { permissionedResolverInitializableV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: permissionedResolverInitializableV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                                            | Description                                             |
| ------------------------------------------------- | ------------------------------------------------------- |
| `permissionedResolverInitializableV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
