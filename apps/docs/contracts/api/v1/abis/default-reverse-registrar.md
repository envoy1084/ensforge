---
title: Default Reverse Registrar
description: Complete ABI for the Default Reverse Registrar contract.
---

# Default Reverse Registrar

Complete ABI for the Default Reverse Registrar contract.

## Import

```ts
import {
  defaultReverseRegistrarV1InterfaceAbi,
  defaultReverseRegistrarV1Abi,
} from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: defaultReverseRegistrarV1InterfaceAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                  | Description                                             |
| --------------------------------------- | ------------------------------------------------------- |
| `defaultReverseRegistrarV1InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |
| `defaultReverseRegistrarV1Abi`          | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use the complete ABI when one integration needs several unrelated functions or event families from this contract. For a single SDK action, prefer the corresponding focused fragment to minimize bundled ABI data.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof defaultReverseRegistrarV1InterfaceAbi;
```
