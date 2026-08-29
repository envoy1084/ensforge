---
title: Authorization
description: Focused, tree-shakable ABI fragments for Authorization.
---

# Authorization

Focused, tree-shakable ABI fragments for Authorization.

## Import

```ts
import {
  baseRegistrarV1SetApprovalForAllAbi,
  nameWrapperV1SetApprovalForAllAbi,
} from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: baseRegistrarV1SetApprovalForAllAbi,
  client: publicClient,
});
```

## Exports

| Export                                | Description                                             |
| ------------------------------------- | ------------------------------------------------------- |
| `baseRegistrarV1SetApprovalForAllAbi` | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1SetApprovalForAllAbi`   | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
