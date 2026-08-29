---
title: Erc1155 Singleton
description: ENSv2 interface definitions for Erc1155 Singleton.
---

# Erc1155 Singleton

ENSv2 interface definitions for Erc1155 Singleton.

## Import

```ts
import { erc1155SingletonV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: erc1155SingletonV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                           | Description                                             |
| -------------------------------- | ------------------------------------------------------- |
| `erc1155SingletonV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
