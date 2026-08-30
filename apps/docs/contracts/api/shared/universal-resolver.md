---
title: Universal Resolver
description: Shared contract definition for Universal Resolver.
---

# Universal Resolver

Shared contract definition for Universal Resolver.

## Import

```ts
import { universalResolverFindResolverAbi } from "@ensforge/contracts/shared";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: universalResolverFindResolverAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                             | Description                                             |
| ---------------------------------- | ------------------------------------------------------- |
| `universalResolverFindResolverAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/shared`

<!--@include: @/shared/contracts/entrypoint.md-->

## When to use

Use this immutable protocol constant directly with viem encoding, decoding, contract, and log utilities.

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof universalResolverFindResolverAbi;
```
