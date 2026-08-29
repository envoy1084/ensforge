---
title: L2 Reverse Registrar
description: Complete ABI for the L2 Reverse Registrar contract.
---

# L2 Reverse Registrar

Complete ABI for the L2 Reverse Registrar contract.

## Import

```ts
import {
  l2ReverseRegistrarV1InterfaceAbi,
  l2ReverseRegistrarV1Abi,
  l2ReverseRegistrarWithMigrationV1Abi,
} from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: l2ReverseRegistrarV1InterfaceAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                 | Description                                             |
| -------------------------------------- | ------------------------------------------------------- |
| `l2ReverseRegistrarV1InterfaceAbi`     | Immutable ABI value with viem-compatible literal types. |
| `l2ReverseRegistrarV1Abi`              | Immutable ABI value with viem-compatible literal types. |
| `l2ReverseRegistrarWithMigrationV1Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use the complete ABI when one integration needs several unrelated functions or event families from this contract. For a single SDK action, prefer the corresponding focused fragment to minimize bundled ABI data.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof l2ReverseRegistrarV1InterfaceAbi;
```
