---
title: Contract Namer
description: Focused, tree-shakable ABI fragments for Contract Namer.
---

# Contract Namer

Focused, tree-shakable ABI fragments for Contract Namer.

## Import

```ts
import { contractNamerV2InterfaceIsContractNamerAbi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: contractNamerV2InterfaceIsContractNamerAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                       | Description                                             |
| -------------------------------------------- | ------------------------------------------------------- |
| `contractNamerV2InterfaceIsContractNamerAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof contractNamerV2InterfaceIsContractNamerAbi;
```

## Compose fragments

```ts
const abi = [...contractNamerV2InterfaceIsContractNamerAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
