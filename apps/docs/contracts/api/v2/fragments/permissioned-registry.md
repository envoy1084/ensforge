---
title: Permissioned Registry
description: Focused, tree-shakable ABI fragments for Permissioned Registry.
---

# Permissioned Registry

Focused, tree-shakable ABI fragments for Permissioned Registry.

## Import

```ts
import {
  permissionedRegistryV2InterfaceGetResourceAbi,
  permissionedRegistryV2InterfaceGetStateAbi,
  permissionedRegistryV2InterfaceGetSubregistryAbi,
  permissionedRegistryV2InterfaceHasRolesAbi,
  permissionedRegistryV2InterfaceIsApprovedForAllAbi,
  permissionedRegistryV2InterfaceRegisterAbi,
  permissionedRegistryV2InterfaceRenewAbi,
  permissionedRegistryV2InterfaceRolesAbi,
  permissionedRegistryV2InterfaceSafeTransferFromAbi,
  permissionedRegistryV2InterfaceSetResolverAbi,
  permissionedRegistryV2InterfaceSetSubregistryAbi,
  permissionedRegistryV2InterfaceUnregisterAbi,
} from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: permissionedRegistryV2InterfaceGetResourceAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                               | Description                                             |
| ---------------------------------------------------- | ------------------------------------------------------- |
| `permissionedRegistryV2InterfaceGetResourceAbi`      | Immutable ABI value with viem-compatible literal types. |
| `permissionedRegistryV2InterfaceGetStateAbi`         | Immutable ABI value with viem-compatible literal types. |
| `permissionedRegistryV2InterfaceGetSubregistryAbi`   | Immutable ABI value with viem-compatible literal types. |
| `permissionedRegistryV2InterfaceHasRolesAbi`         | Immutable ABI value with viem-compatible literal types. |
| `permissionedRegistryV2InterfaceIsApprovedForAllAbi` | Immutable ABI value with viem-compatible literal types. |
| `permissionedRegistryV2InterfaceRegisterAbi`         | Immutable ABI value with viem-compatible literal types. |
| `permissionedRegistryV2InterfaceRenewAbi`            | Immutable ABI value with viem-compatible literal types. |
| `permissionedRegistryV2InterfaceRolesAbi`            | Immutable ABI value with viem-compatible literal types. |
| `permissionedRegistryV2InterfaceSafeTransferFromAbi` | Immutable ABI value with viem-compatible literal types. |
| `permissionedRegistryV2InterfaceSetResolverAbi`      | Immutable ABI value with viem-compatible literal types. |
| `permissionedRegistryV2InterfaceSetSubregistryAbi`   | Immutable ABI value with viem-compatible literal types. |
| `permissionedRegistryV2InterfaceUnregisterAbi`       | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof permissionedRegistryV2InterfaceGetResourceAbi;
```

## Compose fragments

```ts
const abi = [...permissionedRegistryV2InterfaceGetResourceAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
