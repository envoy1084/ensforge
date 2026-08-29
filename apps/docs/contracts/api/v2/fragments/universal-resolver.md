---
title: Universal Resolver
description: Focused, tree-shakable ABI fragments for Universal Resolver.
---

# Universal Resolver

Focused, tree-shakable ABI fragments for Universal Resolver.

## Import

```ts
import {
  universalResolverV2FindExactRegistryAbi,
  universalResolverV2FindOwnerAbi,
  universalResolverV2FindParentRegistryAbi,
  universalResolverV2FindResolverAbi,
  universalResolverV2ResolveAbi,
  universalResolverV2ReverseAbi,
  universalResolverV2InterfaceFindOwnerAbi,
  universalResolverV2InterfaceFindParentRegistryAbi,
} from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: universalResolverV2FindExactRegistryAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                              | Description                                             |
| --------------------------------------------------- | ------------------------------------------------------- |
| `universalResolverV2FindExactRegistryAbi`           | Immutable ABI value with viem-compatible literal types. |
| `universalResolverV2FindOwnerAbi`                   | Immutable ABI value with viem-compatible literal types. |
| `universalResolverV2FindParentRegistryAbi`          | Immutable ABI value with viem-compatible literal types. |
| `universalResolverV2FindResolverAbi`                | Immutable ABI value with viem-compatible literal types. |
| `universalResolverV2ResolveAbi`                     | Immutable ABI value with viem-compatible literal types. |
| `universalResolverV2ReverseAbi`                     | Immutable ABI value with viem-compatible literal types. |
| `universalResolverV2InterfaceFindOwnerAbi`          | Immutable ABI value with viem-compatible literal types. |
| `universalResolverV2InterfaceFindParentRegistryAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use the smallest fragment that contains the function or event you need. Fragments include the custom errors required to decode relevant reverts and can be composed with other fragments when one call site needs several capabilities.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof universalResolverV2FindExactRegistryAbi;
```

## Compose fragments

```ts
const abi = [...universalResolverV2FindExactRegistryAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
