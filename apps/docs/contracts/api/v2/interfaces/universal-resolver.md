---
title: Universal Resolver
description: ENSv2 interface definitions for Universal Resolver.
---

# Universal Resolver

ENSv2 interface definitions for Universal Resolver.

## Import

```ts
import { universalResolverV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: universalResolverV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                            | Description                                             |
| --------------------------------- | ------------------------------------------------------- |
| `universalResolverV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
