---
title: Contract Namer
description: Focused, tree-shakable ABI fragments for Contract Namer.
---

# Contract Namer

Focused, tree-shakable ABI fragments for Contract Namer.

## Import

```ts
import { contractNamerV2InterfaceIsContractNamerAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: contractNamerV2InterfaceIsContractNamerAbi,
  client: publicClient,
});
```

## Exports

| Export                                       | Description                                             |
| -------------------------------------------- | ------------------------------------------------------- |
| `contractNamerV2InterfaceIsContractNamerAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
