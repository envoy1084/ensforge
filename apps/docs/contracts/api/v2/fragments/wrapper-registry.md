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

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use the smallest fragment that contains the function or event you need. Fragments include the custom errors required to decode relevant reverts and can be composed with other fragments when one call site needs several capabilities.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof wrapperRegistryV2InterfaceGetResourceAbi;
```

## Compose fragments

```ts
const abi = [...wrapperRegistryV2InterfaceGetResourceAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
