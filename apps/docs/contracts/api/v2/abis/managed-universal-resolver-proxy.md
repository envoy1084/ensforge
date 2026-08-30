---
title: Managed Universal Resolver Proxy
description: Complete ABI for the Managed Universal Resolver Proxy contract.
---

# Managed Universal Resolver Proxy

Complete ABI for the Managed Universal Resolver Proxy contract.

## Import

```ts
import { managedUniversalResolverProxyV2Abi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: managedUniversalResolverProxyV2Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                               | Description                                             |
| ------------------------------------ | ------------------------------------------------------- |
| `managedUniversalResolverProxyV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof managedUniversalResolverProxyV2Abi;
```
