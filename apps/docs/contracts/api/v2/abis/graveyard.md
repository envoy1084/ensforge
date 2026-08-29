---
title: Graveyard
description: Complete ABI for the Graveyard contract.
---

# Graveyard

Complete ABI for the Graveyard contract.

## Import

```ts
import { graveyardV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: graveyardV2Abi,
  client: publicClient,
});
```

## Exports

| Export           | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `graveyardV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
