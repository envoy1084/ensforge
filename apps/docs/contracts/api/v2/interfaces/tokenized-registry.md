---
title: Tokenized Registry
description: ENSv2 interface definitions for Tokenized Registry.
---

# Tokenized Registry

ENSv2 interface definitions for Tokenized Registry.

## Import

```ts
import { tokenizedRegistryV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: tokenizedRegistryV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                            | Description                                             |
| --------------------------------- | ------------------------------------------------------- |
| `tokenizedRegistryV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
