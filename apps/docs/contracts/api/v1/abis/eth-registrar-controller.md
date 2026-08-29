---
title: ETH Registrar Controller
description: Complete ABI for the ETH Registrar Controller contract.
---

# ETH Registrar Controller

Complete ABI for the ETH Registrar Controller contract.

## Import

```ts
import {
  ethRegistrarControllerV1InterfaceAbi,
  ethRegistrarControllerV1Abi,
} from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRegistrarControllerV1InterfaceAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                 | Description                                             |
| -------------------------------------- | ------------------------------------------------------- |
| `ethRegistrarControllerV1InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarControllerV1Abi`          | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use the complete ABI when one integration needs several unrelated functions or event families from this contract. For a single SDK action, prefer the corresponding focused fragment to minimize bundled ABI data.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof ethRegistrarControllerV1InterfaceAbi;
```
