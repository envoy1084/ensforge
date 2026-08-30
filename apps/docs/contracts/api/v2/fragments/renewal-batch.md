---
title: Renewal Batch
description: Focused, tree-shakable ABI fragments for Renewal Batch.
---

# Renewal Batch

Focused, tree-shakable ABI fragments for Renewal Batch.

## Import

```ts
import {
  ethRegistrarV2InterfaceRenewBatchAbi,
  ethRenewerV2InterfaceRenewBatchAbi,
} from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRegistrarV2InterfaceRenewBatchAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                 | Description                                             |
| -------------------------------------- | ------------------------------------------------------- |
| `ethRegistrarV2InterfaceRenewBatchAbi` | Immutable ABI value with viem-compatible literal types. |
| `ethRenewerV2InterfaceRenewBatchAbi`   | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof ethRegistrarV2InterfaceRenewBatchAbi;
```

## Compose fragments

```ts
const abi = [...ethRegistrarV2InterfaceRenewBatchAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
