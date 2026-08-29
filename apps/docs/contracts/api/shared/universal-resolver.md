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

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use this immutable protocol constant directly with viem encoding, decoding, contract, and log utilities.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof universalResolverFindResolverAbi;
```
