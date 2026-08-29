---
title: Renewal Batch
description: Focused, tree-shakable ABI fragments for Renewal Batch.
---

# Renewal Batch

Focused, tree-shakable ABI fragments for Renewal Batch.

## Import

```ts
import {
  ethRegistrarV2InterfaceRenewBatchAbi,
  ethRenewerV2InterfaceRenewBatchAbi,
} from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRegistrarV2InterfaceRenewBatchAbi,
  client: publicClient,
});
```

## Exports

| Export                                 | Description                                             |
| -------------------------------------- | ------------------------------------------------------- |
| `ethRegistrarV2InterfaceRenewBatchAbi` | Immutable ABI value with viem-compatible literal types. |
| `ethRenewerV2InterfaceRenewBatchAbi`   | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
