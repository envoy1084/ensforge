---
title: Public Resolver
description: Complete ABI for the Public Resolver contract.
---

# Public Resolver

Complete ABI for the Public Resolver contract.

## Import

```ts
import { publicResolverV1Abi } from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: publicResolverV1Abi,
  client: publicClient,
});
```

## Exports

| Export                | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `publicResolverV1Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
