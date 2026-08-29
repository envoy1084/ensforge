---
title: Wrapper Registry
description: Focused, tree-shakable ABI fragments for Wrapper Registry.
---

# Wrapper Registry

Focused, tree-shakable ABI fragments for Wrapper Registry.

## Import

```ts
import {
  wrapperRegistryV2InterfaceGetResourceAbi,
  wrapperRegistryV2InterfaceIsApprovedForAllAbi,
  wrapperRegistryV2InterfaceRolesAbi,
} from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: wrapperRegistryV2InterfaceGetResourceAbi,
  client: publicClient,
});
```

## Exports

| Export                                          | Description                                             |
| ----------------------------------------------- | ------------------------------------------------------- |
| `wrapperRegistryV2InterfaceGetResourceAbi`      | Immutable ABI value with viem-compatible literal types. |
| `wrapperRegistryV2InterfaceIsApprovedForAllAbi` | Immutable ABI value with viem-compatible literal types. |
| `wrapperRegistryV2InterfaceRolesAbi`            | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
