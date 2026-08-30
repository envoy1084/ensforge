---
title: Renewal
description: Focused, tree-shakable ABI fragments for Renewal.
---

# Renewal

Focused, tree-shakable ABI fragments for Renewal.

## Import

```ts
import {
  ethRegistrarV2InterfaceRenewAbi,
  ethRenewerV2InterfaceRenewAbi,
} from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRegistrarV2InterfaceRenewAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                            | Description                                             |
| --------------------------------- | ------------------------------------------------------- |
| `ethRegistrarV2InterfaceRenewAbi` | Immutable ABI value with viem-compatible literal types. |
| `ethRenewerV2InterfaceRenewAbi`   | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof ethRegistrarV2InterfaceRenewAbi;
```

## Compose fragments

```ts
const abi = [...ethRegistrarV2InterfaceRenewAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
