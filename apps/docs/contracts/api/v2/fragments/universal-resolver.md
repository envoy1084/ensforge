---
title: Universal Resolver
description: Focused, tree-shakable ABI fragments for Universal Resolver.
---

# Universal Resolver

Focused, tree-shakable ABI fragments for Universal Resolver.

## Import

```ts
import {
  universalResolverV2FindExactRegistryAbi,
  universalResolverV2FindOwnerAbi,
  universalResolverV2FindParentRegistryAbi,
  universalResolverV2FindResolverAbi,
  universalResolverV2ResolveAbi,
  universalResolverV2ReverseAbi,
  universalResolverV2InterfaceFindOwnerAbi,
  universalResolverV2InterfaceFindParentRegistryAbi,
} from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: universalResolverV2FindExactRegistryAbi,
  client: publicClient,
});
```

## Exports

| Export                                              | Description                                             |
| --------------------------------------------------- | ------------------------------------------------------- |
| `universalResolverV2FindExactRegistryAbi`           | Immutable ABI value with viem-compatible literal types. |
| `universalResolverV2FindOwnerAbi`                   | Immutable ABI value with viem-compatible literal types. |
| `universalResolverV2FindParentRegistryAbi`          | Immutable ABI value with viem-compatible literal types. |
| `universalResolverV2FindResolverAbi`                | Immutable ABI value with viem-compatible literal types. |
| `universalResolverV2ResolveAbi`                     | Immutable ABI value with viem-compatible literal types. |
| `universalResolverV2ReverseAbi`                     | Immutable ABI value with viem-compatible literal types. |
| `universalResolverV2InterfaceFindOwnerAbi`          | Immutable ABI value with viem-compatible literal types. |
| `universalResolverV2InterfaceFindParentRegistryAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
