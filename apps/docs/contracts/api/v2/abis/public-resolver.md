---
title: Public Resolver
description: Complete ABI for the Public Resolver contract.
---

# Public Resolver

Complete ABI for the Public Resolver contract.

## Import

```ts
import { publicResolverV2Abi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: publicResolverV2Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `publicResolverV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof publicResolverV2Abi;
```
