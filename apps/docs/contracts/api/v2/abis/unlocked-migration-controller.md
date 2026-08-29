---
title: Unlocked Migration Controller
description: Complete ABI for the Unlocked Migration Controller contract.
---

# Unlocked Migration Controller

Complete ABI for the Unlocked Migration Controller contract.

## Import

```ts
import { unlockedMigrationControllerV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: unlockedMigrationControllerV2Abi,
  client: publicClient,
});
```

## Exports

| Export                             | Description                                             |
| ---------------------------------- | ------------------------------------------------------- |
| `unlockedMigrationControllerV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
