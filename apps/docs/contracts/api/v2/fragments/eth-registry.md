---
title: ETH Registry
description: Focused, tree-shakable ABI fragments for ETH Registry.
---

# ETH Registry

Focused, tree-shakable ABI fragments for ETH Registry.

## Import

```ts
import { ethRegistryV2GetStateAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRegistryV2GetStateAbi,
  client: publicClient,
});
```

## Exports

| Export                     | Description                                             |
| -------------------------- | ------------------------------------------------------- |
| `ethRegistryV2GetStateAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
