---
title: Registration
description: Focused, tree-shakable ABI fragments for Registration.
---

# Registration

Focused, tree-shakable ABI fragments for Registration.

## Import

```ts
import { ethRegistrarControllerV1CommitAbi } from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRegistrarControllerV1CommitAbi,
  client: publicClient,
});
```

## Exports

| Export                              | Description                                             |
| ----------------------------------- | ------------------------------------------------------- |
| `ethRegistrarControllerV1CommitAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
