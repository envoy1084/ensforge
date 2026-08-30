---
title: Universal Resolver
description: Complete ABI for the Universal Resolver contract.
---

# Universal Resolver

Complete ABI for the Universal Resolver contract.

## Import

```ts
import { universalResolverV2Abi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: universalResolverV2Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                   | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `universalResolverV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof universalResolverV2Abi;
```
