---
title: User Registry
description: Complete ABI for the User Registry contract.
---

# User Registry

Complete ABI for the User Registry contract.

## Import

```ts
import { userRegistryV2Abi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: userRegistryV2Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export              | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `userRegistryV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof userRegistryV2Abi;
```
