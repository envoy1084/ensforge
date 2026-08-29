---
title: Authorization
description: Focused, tree-shakable ABI fragments for Authorization.
---

# Authorization

Focused, tree-shakable ABI fragments for Authorization.

## Import

```ts
import {
  permissionedRegistryV2RoleMutationAbi,
  permissionedResolverV2RootRoleMutationAbi,
} from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: permissionedRegistryV2RoleMutationAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                      | Description                                             |
| ------------------------------------------- | ------------------------------------------------------- |
| `permissionedRegistryV2RoleMutationAbi`     | Immutable ABI value with viem-compatible literal types. |
| `permissionedResolverV2RootRoleMutationAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use the smallest fragment that contains the function or event you need. Fragments include the custom errors required to decode relevant reverts and can be composed with other fragments when one call site needs several capabilities.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof permissionedRegistryV2RoleMutationAbi;
```

## Compose fragments

```ts
const abi = [...permissionedRegistryV2RoleMutationAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
