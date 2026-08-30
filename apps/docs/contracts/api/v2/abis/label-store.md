---
title: Label Store
description: Complete ABI for the Label Store contract.
---

# Label Store

Complete ABI for the Label Store contract.

## Import

```ts
import { labelStoreV2Abi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: labelStoreV2Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export            | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `labelStoreV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof labelStoreV2Abi;
```
