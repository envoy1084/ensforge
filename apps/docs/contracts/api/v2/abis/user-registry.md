---
title: User Registry
description: Complete ABI for the User Registry contract.
---

# User Registry

Complete ABI for the User Registry contract.

## Import

```ts
import { userRegistryV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: userRegistryV2Abi,
  client: publicClient,
});
```

## Exports

| Export              | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `userRegistryV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
