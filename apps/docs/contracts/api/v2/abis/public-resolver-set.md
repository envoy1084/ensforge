---
title: Public Resolver Set
description: Complete ABI for the Public Resolver Set contract.
---

# Public Resolver Set

Complete ABI for the Public Resolver Set contract.

## Import

```ts
import { publicResolverSetV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: publicResolverSetV2Abi,
  client: publicClient,
});
```

## Exports

| Export                   | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `publicResolverSetV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
