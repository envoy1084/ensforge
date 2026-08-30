---
title: Multicall
description: Composable resolver profile ABI for Multicall records.
---

# Multicall

Composable resolver profile ABI for Multicall records.

## Import

```ts
import { multicallResolverAbi } from "@ensforge/contracts/resolver-profiles";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: multicallResolverAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                 | Description                                             |
| ---------------------- | ------------------------------------------------------- |
| `multicallResolverAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

<!--@include: @/shared/contracts/entrypoint.md-->

## When to use

Use this profile when encoding, decoding, or detecting the corresponding ENS resolver record. The exported selectors and ABI values are compatible with viem utilities.

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof multicallResolverAbi;
```
