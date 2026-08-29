---
title: ENS Registry
description: Complete ABI for the ENS Registry contract.
---

# ENS Registry

Complete ABI for the ENS Registry contract.

## Import

```ts
import { ensRegistryV1Abi } from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ensRegistryV1Abi,
  client: publicClient,
});
```

## Exports

| Export             | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `ensRegistryV1Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
