---
title: Tokenized Registry
description: Focused, tree-shakable ABI fragments for Tokenized Registry.
---

# Tokenized Registry

Focused, tree-shakable ABI fragments for Tokenized Registry.

## Import

```ts
import { tokenizedRegistryV2InterfaceSafeTransferFromAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: tokenizedRegistryV2InterfaceSafeTransferFromAbi,
  client: publicClient,
});
```

## Exports

| Export                                            | Description                                             |
| ------------------------------------------------- | ------------------------------------------------------- |
| `tokenizedRegistryV2InterfaceSafeTransferFromAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
