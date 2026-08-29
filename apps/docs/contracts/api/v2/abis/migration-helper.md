---
title: Migration Helper
description: Complete ABI for the Migration Helper contract.
---

# Migration Helper

Complete ABI for the Migration Helper contract.

## Import

```ts
import { migrationHelperV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: migrationHelperV2Abi,
  client: publicClient,
});
```

## Exports

| Export                 | Description                                             |
| ---------------------- | ------------------------------------------------------- |
| `migrationHelperV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
