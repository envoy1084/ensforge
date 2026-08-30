---
title: ENS Registry
description: Focused, tree-shakable ABI fragments for ENS Registry.
---

# ENS Registry

Focused, tree-shakable ABI fragments for ENS Registry.

## Import

```ts
import {
  ensRegistryV1IsApprovedForAllAbi,
  ensRegistryV1OwnerAbi,
  ensRegistryV1ResolverAbi,
  ensRegistryV1SetApprovalForAllAbi,
  ensRegistryV1SetOwnerAbi,
  ensRegistryV1SetResolverAbi,
  ensRegistryV1SetSubnodeOwnerAbi,
  ensRegistryV1SetSubnodeRecordAbi,
  ensRegistryV1SetTTLAbi,
  ensRegistryV1TtlAbi,
} from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ensRegistryV1IsApprovedForAllAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                              | Description                                             |
| ----------------------------------- | ------------------------------------------------------- |
| `ensRegistryV1IsApprovedForAllAbi`  | Immutable ABI value with viem-compatible literal types. |
| `ensRegistryV1OwnerAbi`             | Immutable ABI value with viem-compatible literal types. |
| `ensRegistryV1ResolverAbi`          | Immutable ABI value with viem-compatible literal types. |
| `ensRegistryV1SetApprovalForAllAbi` | Immutable ABI value with viem-compatible literal types. |
| `ensRegistryV1SetOwnerAbi`          | Immutable ABI value with viem-compatible literal types. |
| `ensRegistryV1SetResolverAbi`       | Immutable ABI value with viem-compatible literal types. |
| `ensRegistryV1SetSubnodeOwnerAbi`   | Immutable ABI value with viem-compatible literal types. |
| `ensRegistryV1SetSubnodeRecordAbi`  | Immutable ABI value with viem-compatible literal types. |
| `ensRegistryV1SetTTLAbi`            | Immutable ABI value with viem-compatible literal types. |
| `ensRegistryV1TtlAbi`               | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof ensRegistryV1IsApprovedForAllAbi;
```

## Compose fragments

```ts
const abi = [...ensRegistryV1IsApprovedForAllAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
