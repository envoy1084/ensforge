---
title: Standalone HCA Owner Interface
description: Experimental ENSv2 hybrid contract account definition.
---

# Standalone HCA Owner Interface

Experimental ENSv2 hybrid contract account definition.

::: warning Experimental
This module is not part of the stable ENSv2 surface. Pin the package version and review release notes before upgrading.
:::

## Import

```ts
import { standaloneHcaOwnerV2InterfaceAbi } from "@ensforge/contracts/v2/experimental/hca";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: standaloneHcaOwnerV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                             | Description                                             |
| ---------------------------------- | ------------------------------------------------------- |
| `standaloneHcaOwnerV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2/experimental/hca`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
