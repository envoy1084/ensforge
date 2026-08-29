---
title: Universal Resolver
description: Complete ABI for the Universal Resolver contract.
---

# Universal Resolver

Complete ABI for the Universal Resolver contract.

## Import

```ts
import { universalResolverV1Abi } from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: universalResolverV1Abi,
  client: publicClient,
});
```

## Exports

| Export                   | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `universalResolverV1Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
