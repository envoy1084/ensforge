---
title: Standard Registry
description: Focused, tree-shakable ABI fragments for Standard Registry.
---

# Standard Registry

Focused, tree-shakable ABI fragments for Standard Registry.

## Import

```ts
import { standardRegistryV2SetResolverAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: standardRegistryV2SetResolverAbi,
  client: publicClient,
});
```

## Exports

| Export                             | Description                                             |
| ---------------------------------- | ------------------------------------------------------- |
| `standardRegistryV2SetResolverAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
