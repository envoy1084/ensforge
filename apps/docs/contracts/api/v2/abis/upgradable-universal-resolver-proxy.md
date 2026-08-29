---
title: Upgradable Universal Resolver Proxy
description: Complete ABI for the Upgradable Universal Resolver Proxy contract.
---

# Upgradable Universal Resolver Proxy

Complete ABI for the Upgradable Universal Resolver Proxy contract.

## Import

```ts
import { upgradableUniversalResolverProxyV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: upgradableUniversalResolverProxyV2Abi,
  client: publicClient,
});
```

## Exports

| Export                                  | Description                                             |
| --------------------------------------- | ------------------------------------------------------- |
| `upgradableUniversalResolverProxyV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
