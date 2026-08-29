---
title: Base Registrar
description: Focused, tree-shakable ABI fragments for Base Registrar.
---

# Base Registrar

Focused, tree-shakable ABI fragments for Base Registrar.

## Import

```ts
import {
  baseRegistrarV1ApproveAbi,
  baseRegistrarV1AvailableAbi,
  baseRegistrarV1GetApprovedAbi,
  baseRegistrarV1IsApprovedForAllAbi,
  baseRegistrarV1NameExpiresAbi,
  baseRegistrarV1OwnerOfAbi,
  baseRegistrarV1ReclaimAbi,
  baseRegistrarV1SafeTransferFromAbi,
} from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: baseRegistrarV1ApproveAbi,
  client: publicClient,
});
```

## Exports

| Export                               | Description                                             |
| ------------------------------------ | ------------------------------------------------------- |
| `baseRegistrarV1ApproveAbi`          | Immutable ABI value with viem-compatible literal types. |
| `baseRegistrarV1AvailableAbi`        | Immutable ABI value with viem-compatible literal types. |
| `baseRegistrarV1GetApprovedAbi`      | Immutable ABI value with viem-compatible literal types. |
| `baseRegistrarV1IsApprovedForAllAbi` | Immutable ABI value with viem-compatible literal types. |
| `baseRegistrarV1NameExpiresAbi`      | Immutable ABI value with viem-compatible literal types. |
| `baseRegistrarV1OwnerOfAbi`          | Immutable ABI value with viem-compatible literal types. |
| `baseRegistrarV1ReclaimAbi`          | Immutable ABI value with viem-compatible literal types. |
| `baseRegistrarV1SafeTransferFromAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
