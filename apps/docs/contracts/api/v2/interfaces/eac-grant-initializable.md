---
title: Eac Grant Initializable
description: ENSv2 interface definitions for Eac Grant Initializable.
---

# Eac Grant Initializable

ENSv2 interface definitions for Eac Grant Initializable.

## Import

```ts
import { eacGrantInitializableV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: eacGrantInitializableV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                                | Description                                             |
| ------------------------------------- | ------------------------------------------------------- |
| `eacGrantInitializableV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
