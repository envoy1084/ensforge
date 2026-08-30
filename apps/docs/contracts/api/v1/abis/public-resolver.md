---
title: Public Resolver
description: Complete ABI for the Public Resolver contract.
---

# Public Resolver

Complete ABI for the Public Resolver contract.

## Import

```ts
import { publicResolverV1Abi } from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: publicResolverV1Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `publicResolverV1Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof publicResolverV1Abi;
```
