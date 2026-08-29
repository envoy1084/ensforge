---
title: Authorization
description: Focused, tree-shakable ABI fragments for Authorization.
---

# Authorization

Focused, tree-shakable ABI fragments for Authorization.

## Import

```ts
import {
  permissionedRegistryV2RoleMutationAbi,
  permissionedResolverV2RootRoleMutationAbi,
} from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: permissionedRegistryV2RoleMutationAbi,
  client: publicClient,
});
```

## Exports

| Export                                      | Description                                             |
| ------------------------------------------- | ------------------------------------------------------- |
| `permissionedRegistryV2RoleMutationAbi`     | Immutable ABI value with viem-compatible literal types. |
| `permissionedResolverV2RootRoleMutationAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
