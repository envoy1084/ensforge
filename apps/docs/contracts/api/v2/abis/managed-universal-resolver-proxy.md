---
title: Managed Universal Resolver Proxy
description: Complete ABI for the Managed Universal Resolver Proxy contract.
---

# Managed Universal Resolver Proxy

Complete ABI for the Managed Universal Resolver Proxy contract.

## Import

```ts
import { managedUniversalResolverProxyV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: managedUniversalResolverProxyV2Abi,
  client: publicClient,
});
```

## Exports

| Export                               | Description                                             |
| ------------------------------------ | ------------------------------------------------------- |
| `managedUniversalResolverProxyV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
