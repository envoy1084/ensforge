---
title: Address Set
description: ENSv2 interface definitions for Address Set.
---

# Address Set

ENSv2 interface definitions for Address Set.

## Import

```ts
import { addressSetV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: addressSetV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                     | Description                                             |
| -------------------------- | ------------------------------------------------------- |
| `addressSetV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
