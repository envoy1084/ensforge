---
title: ENS V1 Resolver
description: Complete ABI for the ENS V1 Resolver contract.
---

# ENS V1 Resolver

Complete ABI for the ENS V1 Resolver contract.

## Import

```ts
import { ensV1ResolverV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ensV1ResolverV2Abi,
  client: publicClient,
});
```

## Exports

| Export               | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `ensV1ResolverV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
