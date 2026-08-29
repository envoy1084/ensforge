---
title: ETH Registry
description: Complete ABI for the ETH Registry contract.
---

# ETH Registry

Complete ABI for the ETH Registry contract.

## Import

```ts
import { ethRegistryV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRegistryV2Abi,
  client: publicClient,
});
```

## Exports

| Export             | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `ethRegistryV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
