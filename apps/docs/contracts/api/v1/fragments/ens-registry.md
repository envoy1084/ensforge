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

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use the smallest fragment that contains the function or event you need. Fragments include the custom errors required to decode relevant reverts and can be composed with other fragments when one call site needs several capabilities.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof ensRegistryV1IsApprovedForAllAbi;
```

## Compose fragments

```ts
const abi = [...ensRegistryV1IsApprovedForAllAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
