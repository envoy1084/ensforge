---
title: Resolution
description: Focused, tree-shakable ABI fragments for Resolution.
---

# Resolution

Focused, tree-shakable ABI fragments for Resolution.

## Import

```ts
import {
  universalResolverV2ResolveWithResolverAbi,
  wrapperRegistryV2SetResolverAbi,
} from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: universalResolverV2ResolveWithResolverAbi,
  client: publicClient,
});
```

## Exports

| Export                                      | Description                                             |
| ------------------------------------------- | ------------------------------------------------------- |
| `universalResolverV2ResolveWithResolverAbi` | Immutable ABI value with viem-compatible literal types. |
| `wrapperRegistryV2SetResolverAbi`           | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
