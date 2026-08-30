---
title: Eac Grant Initializable
description: ENSv2 interface definitions for Eac Grant Initializable.
---

# Eac Grant Initializable

ENSv2 interface definitions for Eac Grant Initializable.

## Import

```ts
import { eacGrantInitializableV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: eacGrantInitializableV2InterfaceAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                | Description                                             |
| ------------------------------------- | ------------------------------------------------------- |
| `eacGrantInitializableV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

## When to use

Use these constants for ERC-165 capability detection and protocol routing. They describe interface support; they are not contract deployment addresses.

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof eacGrantInitializableV2InterfaceAbi;
```
