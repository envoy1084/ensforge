---
title: Public Resolver Set
description: Complete ABI for the Public Resolver Set contract.
---

# Public Resolver Set

Complete ABI for the Public Resolver Set contract.

## Import

```ts
import { publicResolverSetV2Abi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: publicResolverSetV2Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                   | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `publicResolverSetV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof publicResolverSetV2Abi;
```
