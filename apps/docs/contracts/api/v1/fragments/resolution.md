---
title: Resolution
description: Focused, tree-shakable ABI fragments for Resolution.
---

# Resolution

Focused, tree-shakable ABI fragments for Resolution.

## Import

```ts
import { universalResolverV1ResolveWithResolverAbi } from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: universalResolverV1ResolveWithResolverAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                      | Description                                             |
| ------------------------------------------- | ------------------------------------------------------- |
| `universalResolverV1ResolveWithResolverAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use the smallest fragment that contains the function or event you need. Fragments include the custom errors required to decode relevant reverts and can be composed with other fragments when one call site needs several capabilities.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof universalResolverV1ResolveWithResolverAbi;
```

## Compose fragments

```ts
const abi = [...universalResolverV1ResolveWithResolverAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
