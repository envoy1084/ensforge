---
title: Registration
description: Focused, tree-shakable ABI fragments for Registration.
---

# Registration

Focused, tree-shakable ABI fragments for Registration.

## Import

```ts
import { ethRegistrarControllerV1CommitAbi } from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRegistrarControllerV1CommitAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                              | Description                                             |
| ----------------------------------- | ------------------------------------------------------- |
| `ethRegistrarControllerV1CommitAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof ethRegistrarControllerV1CommitAbi;
```

## Compose fragments

```ts
const abi = [...ethRegistrarControllerV1CommitAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
