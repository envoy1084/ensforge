---
title: Default Reverse Registrar Adapter
description: Focused, tree-shakable ABI fragments for Default Reverse Registrar Adapter.
---

# Default Reverse Registrar Adapter

Focused, tree-shakable ABI fragments for Default Reverse Registrar Adapter.

## Import

```ts
import { defaultReverseRegistrarAdapterV2SetNameAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: defaultReverseRegistrarAdapterV2SetNameAbi,
  client: publicClient,
});
```

## Exports

| Export                                       | Description                                             |
| -------------------------------------------- | ------------------------------------------------------- |
| `defaultReverseRegistrarAdapterV2SetNameAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
