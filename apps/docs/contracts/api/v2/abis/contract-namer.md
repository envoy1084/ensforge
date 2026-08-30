---
title: Contract Namer
description: Complete ABI for the Contract Namer contract.
---

# Contract Namer

Complete ABI for the Contract Namer contract.

## Import

```ts
import { contractNamerV2Abi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: contractNamerV2Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export               | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `contractNamerV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof contractNamerV2Abi;
```
