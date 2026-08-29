---
title: Locked Migration Controller
description: Complete ABI for the Locked Migration Controller contract.
---

# Locked Migration Controller

Complete ABI for the Locked Migration Controller contract.

## Import

```ts
import { lockedMigrationControllerV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: lockedMigrationControllerV2Abi,
  client: publicClient,
});
```

## Exports

| Export                           | Description                                             |
| -------------------------------- | ------------------------------------------------------- |
| `lockedMigrationControllerV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
