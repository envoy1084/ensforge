---
title: Label Store
description: ENSv2 interface definitions for Label Store.
---

# Label Store

ENSv2 interface definitions for Label Store.

## Import

```ts
import { labelStoreV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: labelStoreV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                     | Description                                             |
| -------------------------- | ------------------------------------------------------- |
| `labelStoreV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
