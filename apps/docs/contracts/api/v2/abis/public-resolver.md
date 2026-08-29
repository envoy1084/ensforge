---
title: Public Resolver
description: Complete ABI for the Public Resolver contract.
---

# Public Resolver

Complete ABI for the Public Resolver contract.

## Import

```ts
import { publicResolverV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: publicResolverV2Abi,
  client: publicClient,
});
```

## Exports

| Export                | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `publicResolverV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
