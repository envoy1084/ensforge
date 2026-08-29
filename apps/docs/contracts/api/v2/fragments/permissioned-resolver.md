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

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: permissionedResolverInitializableV2InterfaceInitializeAbi,
  client: publicClient,
});
```

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

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
