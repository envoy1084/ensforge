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

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

This export belongs to the experimental ENSv2 surface. Pin the package version and verify the selected deployment before using it in production.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof standaloneHcaFactoryV2Abi;
```
