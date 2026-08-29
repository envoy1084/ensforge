---
title: Offchain DNS Resolver
description: Complete ABI for the Offchain DNS Resolver contract.
---

# Offchain DNS Resolver

Complete ABI for the Offchain DNS Resolver contract.

## Import

```ts
import { offchainDnsResolverV1Abi } from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: offchainDnsResolverV1Abi,
  client: publicClient,
});
```

## Exports

| Export                     | Description                                             |
| -------------------------- | ------------------------------------------------------- |
| `offchainDnsResolverV1Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
