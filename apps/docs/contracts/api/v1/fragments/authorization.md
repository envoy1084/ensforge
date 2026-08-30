---
title: Authorization
description: Focused, tree-shakable ABI fragments for Authorization.
---

# Authorization

Focused, tree-shakable ABI fragments for Authorization.

## Import

```ts
import {
  baseRegistrarV1SetApprovalForAllAbi,
  nameWrapperV1SetApprovalForAllAbi,
} from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: baseRegistrarV1SetApprovalForAllAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                | Description                                             |
| ------------------------------------- | ------------------------------------------------------- |
| `baseRegistrarV1SetApprovalForAllAbi` | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1SetApprovalForAllAbi`   | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof baseRegistrarV1SetApprovalForAllAbi;
```

## Compose fragments

```ts
const abi = [...baseRegistrarV1SetApprovalForAllAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
