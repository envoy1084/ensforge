---
title: Renewal
description: Focused, tree-shakable ABI fragments for Renewal.
---

# Renewal

Focused, tree-shakable ABI fragments for Renewal.

## Import

```ts
import {
  ethRegistrarV2InterfaceRenewAbi,
  ethRenewerV2InterfaceRenewAbi,
} from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRegistrarV2InterfaceRenewAbi,
  client: publicClient,
});
```

## Exports

| Export                            | Description                                             |
| --------------------------------- | ------------------------------------------------------- |
| `ethRegistrarV2InterfaceRenewAbi` | Immutable ABI value with viem-compatible literal types. |
| `ethRenewerV2InterfaceRenewAbi`   | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
