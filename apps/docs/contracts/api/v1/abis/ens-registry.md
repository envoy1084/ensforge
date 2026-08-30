---
title: ENS Registry
description: Complete ABI for the ENS Registry contract.
---

# ENS Registry

Complete ABI for the ENS Registry contract.

## Import

```ts
import { ensRegistryV1Abi } from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ensRegistryV1Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export             | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `ensRegistryV1Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof ensRegistryV1Abi;
```
