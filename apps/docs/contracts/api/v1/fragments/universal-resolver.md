---
title: Universal Resolver
description: Focused, tree-shakable ABI fragments for Universal Resolver.
---

# Universal Resolver

Focused, tree-shakable ABI fragments for Universal Resolver.

## Import

```ts
import {
  universalResolverV1ResolveAbi,
  universalResolverV1ReverseAbi,
} from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: universalResolverV1ResolveAbi,
  client: publicClient,
});
```

## Exports

| Export                          | Description                                             |
| ------------------------------- | ------------------------------------------------------- |
| `universalResolverV1ResolveAbi` | Immutable ABI value with viem-compatible literal types. |
| `universalResolverV1ReverseAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
