---
title: Permissioned Address Set
description: ENSv2 interface definitions for Permissioned Address Set.
---

# Permissioned Address Set

ENSv2 interface definitions for Permissioned Address Set.

## Import

```ts
import { permissionedAddressSetV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: permissionedAddressSetV2InterfaceAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                 | Description                                             |
| -------------------------------------- | ------------------------------------------------------- |
| `permissionedAddressSetV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

## When to use

Use these constants for ERC-165 capability detection and protocol routing. They describe interface support; they are not contract deployment addresses.

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof permissionedAddressSetV2InterfaceAbi;
```
