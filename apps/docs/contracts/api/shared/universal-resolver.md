---
title: Universal Resolver
description: Shared contract definition for Universal Resolver.
---

# Universal Resolver

Shared contract definition for Universal Resolver.

## Import

```ts
import { universalResolverFindResolverAbi } from "@ensforge/contracts/shared";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: universalResolverFindResolverAbi,
  client: publicClient,
});
```

## Exports

| Export                             | Description                                             |
| ---------------------------------- | ------------------------------------------------------- |
| `universalResolverFindResolverAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/shared`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
