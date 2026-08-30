---
title: Wrapper Registry
description: Focused, tree-shakable ABI fragments for Wrapper Registry.
---

# Wrapper Registry

Focused, tree-shakable ABI fragments for Wrapper Registry.

## Import

```ts
import {
  wrapperRegistryV2InterfaceGetResourceAbi,
  wrapperRegistryV2InterfaceIsApprovedForAllAbi,
  wrapperRegistryV2InterfaceRolesAbi,
} from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: wrapperRegistryV2InterfaceGetResourceAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                          | Description                                             |
| ----------------------------------------------- | ------------------------------------------------------- |
| `wrapperRegistryV2InterfaceGetResourceAbi`      | Immutable ABI value with viem-compatible literal types. |
| `wrapperRegistryV2InterfaceIsApprovedForAllAbi` | Immutable ABI value with viem-compatible literal types. |
| `wrapperRegistryV2InterfaceRolesAbi`            | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof wrapperRegistryV2InterfaceGetResourceAbi;
```

## Compose fragments

```ts
const abi = [...wrapperRegistryV2InterfaceGetResourceAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
