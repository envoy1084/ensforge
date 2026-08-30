---
title: Universal Resolver
description: Focused, tree-shakable ABI fragments for Universal Resolver.
---

# Universal Resolver

Focused, tree-shakable ABI fragments for Universal Resolver.

## Import

```ts
import {
  universalResolverV1ResolveAbi,
  universalResolverV1ReverseAbi,
} from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: universalResolverV1ResolveAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                          | Description                                             |
| ------------------------------- | ------------------------------------------------------- |
| `universalResolverV1ResolveAbi` | Immutable ABI value with viem-compatible literal types. |
| `universalResolverV1ReverseAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof universalResolverV1ResolveAbi;
```

## Compose fragments

```ts
const abi = [...universalResolverV1ResolveAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
