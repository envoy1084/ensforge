---
title: ETH Renewer
description: ENSv2 interface definitions for ETH Renewer.
---

# ETH Renewer

ENSv2 interface definitions for ETH Renewer.

## Import

```ts
import { ethRenewerV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRenewerV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                     | Description                                             |
| -------------------------- | ------------------------------------------------------- |
| `ethRenewerV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
