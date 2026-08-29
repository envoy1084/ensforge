---
title: Wrapper Registry
description: Complete ABI for the Wrapper Registry contract.
---

# Wrapper Registry

Complete ABI for the Wrapper Registry contract.

## Import

```ts
import { wrapperRegistryV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: wrapperRegistryV2Abi,
  client: publicClient,
});
```

## Exports

| Export                 | Description                                             |
| ---------------------- | ------------------------------------------------------- |
| `wrapperRegistryV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
