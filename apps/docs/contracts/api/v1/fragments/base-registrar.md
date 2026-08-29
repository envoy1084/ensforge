---
title: Base Registrar
description: Focused, tree-shakable ABI fragments for Base Registrar.
---

# Base Registrar

Focused, tree-shakable ABI fragments for Base Registrar.

## Import

```ts
import {
  baseRegistrarV1ApproveAbi,
  baseRegistrarV1AvailableAbi,
  baseRegistrarV1GetApprovedAbi,
  baseRegistrarV1IsApprovedForAllAbi,
  baseRegistrarV1NameExpiresAbi,
  baseRegistrarV1OwnerOfAbi,
  baseRegistrarV1ReclaimAbi,
  baseRegistrarV1SafeTransferFromAbi,
} from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: baseRegistrarV1ApproveAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                               | Description                                             |
| ------------------------------------ | ------------------------------------------------------- |
| `baseRegistrarV1ApproveAbi`          | Immutable ABI value with viem-compatible literal types. |
| `baseRegistrarV1AvailableAbi`        | Immutable ABI value with viem-compatible literal types. |
| `baseRegistrarV1GetApprovedAbi`      | Immutable ABI value with viem-compatible literal types. |
| `baseRegistrarV1IsApprovedForAllAbi` | Immutable ABI value with viem-compatible literal types. |
| `baseRegistrarV1NameExpiresAbi`      | Immutable ABI value with viem-compatible literal types. |
| `baseRegistrarV1OwnerOfAbi`          | Immutable ABI value with viem-compatible literal types. |
| `baseRegistrarV1ReclaimAbi`          | Immutable ABI value with viem-compatible literal types. |
| `baseRegistrarV1SafeTransferFromAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use the smallest fragment that contains the function or event you need. Fragments include the custom errors required to decode relevant reverts and can be composed with other fragments when one call site needs several capabilities.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof baseRegistrarV1ApproveAbi;
```

## Compose fragments

```ts
const abi = [...baseRegistrarV1ApproveAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
