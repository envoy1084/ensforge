---
title: ETH Renewer V1
description: Focused, tree-shakable ABI fragments for ETH Renewer V1.
---

# ETH Renewer V1

Focused, tree-shakable ABI fragments for ETH Renewer V1.

## Import

```ts
import { ethRenewerV1IsRenewableAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRenewerV1IsRenewableAbi,
  client: publicClient,
});
```

## Exports

| Export                       | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| `ethRenewerV1IsRenewableAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
