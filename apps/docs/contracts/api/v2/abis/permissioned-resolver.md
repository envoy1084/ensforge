---
title: Permissioned Resolver
description: Complete ABI for the Permissioned Resolver contract.
---

# Permissioned Resolver

Complete ABI for the Permissioned Resolver contract.

## Import

```ts
import { permissionedResolverV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: permissionedResolverV2Abi,
  client: publicClient,
});
```

## Exports

| Export                      | Description                                             |
| --------------------------- | ------------------------------------------------------- |
| `permissionedResolverV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
