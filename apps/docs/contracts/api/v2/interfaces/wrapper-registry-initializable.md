---
title: Wrapper Registry Initializable
description: ENSv2 interface definitions for Wrapper Registry Initializable.
---

# Wrapper Registry Initializable

ENSv2 interface definitions for Wrapper Registry Initializable.

## Import

```ts
import { wrapperRegistryInitializableV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: wrapperRegistryInitializableV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                                       | Description                                             |
| -------------------------------------------- | ------------------------------------------------------- |
| `wrapperRegistryInitializableV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
