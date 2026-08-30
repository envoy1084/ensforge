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

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof permissionedRegistryV2RoleMutationAbi;
```

## Compose fragments

```ts
const abi = [...permissionedRegistryV2RoleMutationAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
