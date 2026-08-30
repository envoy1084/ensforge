---
title: Wrapper Registry Initializable
description: ENSv2 interface definitions for Wrapper Registry Initializable.
---

# Wrapper Registry Initializable

ENSv2 interface definitions for Wrapper Registry Initializable.

## Import

```ts
import { wrapperRegistryInitializableV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: wrapperRegistryInitializableV2InterfaceAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                       | Description                                             |
| -------------------------------------------- | ------------------------------------------------------- |
| `wrapperRegistryInitializableV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

## When to use

Use these constants for ERC-165 capability detection and protocol routing. They describe interface support; they are not contract deployment addresses.

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof wrapperRegistryInitializableV2InterfaceAbi;
```
