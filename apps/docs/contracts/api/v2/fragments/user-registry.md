---
title: User Registry
description: Focused, tree-shakable ABI fragments for User Registry.
---

# User Registry

Focused, tree-shakable ABI fragments for User Registry.

## Import

```ts
import { userRegistryV2SetParentAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: userRegistryV2SetParentAbi,
  client: publicClient,
});
```

## Exports

| Export                       | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| `userRegistryV2SetParentAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
