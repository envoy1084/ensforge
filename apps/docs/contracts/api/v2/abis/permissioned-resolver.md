---
title: Permissioned Resolver
description: Complete ABI for the Permissioned Resolver contract.
---

# Permissioned Resolver

Complete ABI for the Permissioned Resolver contract.

## Import

```ts
import { permissionedResolverV2Abi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: permissionedResolverV2Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                      | Description                                             |
| --------------------------- | ------------------------------------------------------- |
| `permissionedResolverV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof permissionedResolverV2Abi;
```
