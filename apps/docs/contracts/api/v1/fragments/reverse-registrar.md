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

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use the smallest fragment that contains the function or event you need. Fragments include the custom errors required to decode relevant reverts and can be composed with other fragments when one call site needs several capabilities.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof reverseRegistrarV1DefaultResolverAbi;
```

## Compose fragments

```ts
const abi = [...reverseRegistrarV1DefaultResolverAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
