---
title: Reverse Registrar
description: Focused, tree-shakable ABI fragments for Reverse Registrar.
---

# Reverse Registrar

Focused, tree-shakable ABI fragments for Reverse Registrar.

## Import

```ts
import {
  reverseRegistrarV1DefaultResolverAbi,
  reverseRegistrarV1SetNameAbi,
  reverseRegistrarV1SetNameForAddrAbi,
} from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: reverseRegistrarV1DefaultResolverAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                 | Description                                             |
| -------------------------------------- | ------------------------------------------------------- |
| `reverseRegistrarV1DefaultResolverAbi` | Immutable ABI value with viem-compatible literal types. |
| `reverseRegistrarV1SetNameAbi`         | Immutable ABI value with viem-compatible literal types. |
| `reverseRegistrarV1SetNameForAddrAbi`  | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof reverseRegistrarV1DefaultResolverAbi;
```

## Compose fragments

```ts
const abi = [...reverseRegistrarV1DefaultResolverAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
