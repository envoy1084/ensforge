---
title: Multicall
description: Composable resolver profile ABI for Multicall records.
---

# Multicall

Composable resolver profile ABI for Multicall records.

## Import

```ts
import { multicallResolverAbi } from "@ensforge/contracts/resolver-profiles";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: multicallResolverAbi,
  client: publicClient,
});
```

## Exports

| Export                 | Description                                             |
| ---------------------- | ------------------------------------------------------- |
| `multicallResolverAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
