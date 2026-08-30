---
title: Migration Helper
description: Complete ABI for the Migration Helper contract.
---

# Migration Helper

Complete ABI for the Migration Helper contract.

## Import

```ts
import { migrationHelperV2Abi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: migrationHelperV2Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                 | Description                                             |
| ---------------------- | ------------------------------------------------------- |
| `migrationHelperV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof migrationHelperV2Abi;
```
