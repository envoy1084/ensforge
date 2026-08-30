---
title: Resolution
description: Focused, tree-shakable ABI fragments for Resolution.
---

# Resolution

Focused, tree-shakable ABI fragments for Resolution.

## Import

```ts
import {
  universalResolverV2ResolveWithResolverAbi,
  wrapperRegistryV2SetResolverAbi,
} from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: universalResolverV2ResolveWithResolverAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                      | Description                                             |
| ------------------------------------------- | ------------------------------------------------------- |
| `universalResolverV2ResolveWithResolverAbi` | Immutable ABI value with viem-compatible literal types. |
| `wrapperRegistryV2SetResolverAbi`           | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof universalResolverV2ResolveWithResolverAbi;
```

## Compose fragments

```ts
const abi = [...universalResolverV2ResolveWithResolverAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
