---
title: Unlocked Migration Controller
description: Complete ABI for the Unlocked Migration Controller contract.
---

# Unlocked Migration Controller

Complete ABI for the Unlocked Migration Controller contract.

## Import

```ts
import { unlockedMigrationControllerV2Abi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: unlockedMigrationControllerV2Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                             | Description                                             |
| ---------------------------------- | ------------------------------------------------------- |
| `unlockedMigrationControllerV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof unlockedMigrationControllerV2Abi;
```
