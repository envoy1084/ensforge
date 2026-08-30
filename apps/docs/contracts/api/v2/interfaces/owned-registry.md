---
title: Owned Registry
description: ENSv2 interface definitions for Owned Registry.
---

# Owned Registry

ENSv2 interface definitions for Owned Registry.

## Import

```ts
import { ownedRegistryV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ownedRegistryV2InterfaceAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                        | Description                                             |
| ----------------------------- | ------------------------------------------------------- |
| `ownedRegistryV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

## When to use

Use these constants for ERC-165 capability detection and protocol routing. They describe interface support; they are not contract deployment addresses.

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof ownedRegistryV2InterfaceAbi;
```
