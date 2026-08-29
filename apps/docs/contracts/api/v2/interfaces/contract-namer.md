---
title: Contract Namer
description: ENSv2 interface definitions for Contract Namer.
---

# Contract Namer

ENSv2 interface definitions for Contract Namer.

## Import

```ts
import { contractNamerV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: contractNamerV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                        | Description                                             |
| ----------------------------- | ------------------------------------------------------- |
| `contractNamerV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
