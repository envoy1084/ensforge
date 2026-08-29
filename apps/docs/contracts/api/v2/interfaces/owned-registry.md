---
title: Owned Registry
description: ENSv2 interface definitions for Owned Registry.
---

# Owned Registry

ENSv2 interface definitions for Owned Registry.

## Import

```ts
import { ownedRegistryV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ownedRegistryV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                        | Description                                             |
| ----------------------------- | ------------------------------------------------------- |
| `ownedRegistryV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
