---
title: ETH Renewer V1
description: Focused, tree-shakable ABI fragments for ETH Renewer V1.
---

# ETH Renewer V1

Focused, tree-shakable ABI fragments for ETH Renewer V1.

## Import

```ts
import { ethRenewerV1IsRenewableAbi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRenewerV1IsRenewableAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                       | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| `ethRenewerV1IsRenewableAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof ethRenewerV1IsRenewableAbi;
```

## Compose fragments

```ts
const abi = [...ethRenewerV1IsRenewableAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
