---
title: ENS V1 Resolver
description: Complete ABI for the ENS V1 Resolver contract.
---

# ENS V1 Resolver

Complete ABI for the ENS V1 Resolver contract.

## Import

```ts
import { ensV1ResolverV2Abi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ensV1ResolverV2Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export               | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `ensV1ResolverV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof ensV1ResolverV2Abi;
```
