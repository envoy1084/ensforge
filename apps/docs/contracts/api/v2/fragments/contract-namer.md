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

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use the smallest fragment that contains the function or event you need. Fragments include the custom errors required to decode relevant reverts and can be composed with other fragments when one call site needs several capabilities.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof contractNamerV2InterfaceIsContractNamerAbi;
```

## Compose fragments

```ts
const abi = [...contractNamerV2InterfaceIsContractNamerAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
