---
title: ENS V2 Resolver
description: Complete ABI for the ENS V2 Resolver contract.
---

# ENS V2 Resolver

Complete ABI for the ENS V2 Resolver contract.

## Import

```ts
import { ensV2ResolverV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ensV2ResolverV2Abi,
  client: publicClient,
});
```

## Exports

| Export               | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `ensV2ResolverV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
