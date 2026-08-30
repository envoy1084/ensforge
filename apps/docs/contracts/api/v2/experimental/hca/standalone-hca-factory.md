---
title: Standalone HCA Factory
description: Experimental ENSv2 hybrid contract account definition.
---

# Standalone HCA Factory

Experimental ENSv2 hybrid contract account definition.

::: warning Experimental
This module is not part of the stable ENSv2 surface. Pin the package version and review release notes before upgrading.
:::

## Import

```ts
import { standaloneHcaFactoryV2Abi } from "@ensforge/contracts/v2/experimental/hca";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: standaloneHcaFactoryV2Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                      | Description                                             |
| --------------------------- | ------------------------------------------------------- |
| `standaloneHcaFactoryV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2/experimental/hca`

<!--@include: @/shared/contracts/entrypoint.md-->

## When to use

This export belongs to the experimental ENSv2 surface. Pin the package version and verify the selected deployment before using it in production.

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof standaloneHcaFactoryV2Abi;
```
