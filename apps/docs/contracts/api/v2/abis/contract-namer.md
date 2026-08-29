---
title: Contract Namer
description: Complete ABI for the Contract Namer contract.
---

# Contract Namer

Complete ABI for the Contract Namer contract.

## Import

```ts
import { contractNamerV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: contractNamerV2Abi,
  client: publicClient,
});
```

## Exports

| Export               | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `contractNamerV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
