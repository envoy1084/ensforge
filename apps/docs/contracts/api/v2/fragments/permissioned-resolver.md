---
title: Permissioned Resolver
description: Focused, tree-shakable ABI fragments for Permissioned Resolver.
---

# Permissioned Resolver

Focused, tree-shakable ABI fragments for Permissioned Resolver.

## Import

```ts
import {
  permissionedResolverInitializableV2InterfaceInitializeAbi,
  permissionedResolverV2AuthorizeAddrRolesAbi,
  permissionedResolverV2AuthorizeDataRolesAbi,
  permissionedResolverV2AuthorizeNameRolesAbi,
  permissionedResolverV2AuthorizeTextRolesAbi,
  permissionedResolverV2CanUpgradeFromAbi,
  permissionedResolverV2UpgradeToAndCallAbi,
  permissionedResolverV2InterfaceGetAliasAbi,
  permissionedResolverV2InterfaceHasRolesAbi,
  permissionedResolverV2InterfaceHasRootRolesAbi,
  permissionedResolverV2InterfaceRolesAbi,
  permissionedResolverV2InterfaceSetAliasAbi,
} from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: permissionedResolverInitializableV2InterfaceInitializeAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                                      | Description                                             |
| ----------------------------------------------------------- | ------------------------------------------------------- |
| `permissionedResolverInitializableV2InterfaceInitializeAbi` | Immutable ABI value with viem-compatible literal types. |
| `permissionedResolverV2AuthorizeAddrRolesAbi`               | Immutable ABI value with viem-compatible literal types. |
| `permissionedResolverV2AuthorizeDataRolesAbi`               | Immutable ABI value with viem-compatible literal types. |
| `permissionedResolverV2AuthorizeNameRolesAbi`               | Immutable ABI value with viem-compatible literal types. |
| `permissionedResolverV2AuthorizeTextRolesAbi`               | Immutable ABI value with viem-compatible literal types. |
| `permissionedResolverV2CanUpgradeFromAbi`                   | Immutable ABI value with viem-compatible literal types. |
| `permissionedResolverV2UpgradeToAndCallAbi`                 | Immutable ABI value with viem-compatible literal types. |
| `permissionedResolverV2InterfaceGetAliasAbi`                | Immutable ABI value with viem-compatible literal types. |
| `permissionedResolverV2InterfaceHasRolesAbi`                | Immutable ABI value with viem-compatible literal types. |
| `permissionedResolverV2InterfaceHasRootRolesAbi`            | Immutable ABI value with viem-compatible literal types. |
| `permissionedResolverV2InterfaceRolesAbi`                   | Immutable ABI value with viem-compatible literal types. |
| `permissionedResolverV2InterfaceSetAliasAbi`                | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof permissionedResolverInitializableV2InterfaceInitializeAbi;
```

## Compose fragments

```ts
const abi = [
  ...permissionedResolverInitializableV2InterfaceInitializeAbi,
  ...anotherFragment,
] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
