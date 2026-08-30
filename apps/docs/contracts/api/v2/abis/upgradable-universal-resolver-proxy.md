---
title: Upgradable Universal Resolver Proxy
description: Complete ABI for the Upgradable Universal Resolver Proxy contract.
---

# Upgradable Universal Resolver Proxy

Complete ABI for the Upgradable Universal Resolver Proxy contract.

## Import

```ts
import { upgradableUniversalResolverProxyV2Abi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: upgradableUniversalResolverProxyV2Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                  | Description                                             |
| --------------------------------------- | ------------------------------------------------------- |
| `upgradableUniversalResolverProxyV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof upgradableUniversalResolverProxyV2Abi;
```
