---
title: Expiry
description: Focused, tree-shakable ABI fragments for Expiry.
---

# Expiry

Focused, tree-shakable ABI fragments for Expiry.

## Import

```ts
import {
  getExpiryV2EthRegistryAbi,
  getExpiryV2TemporalRegistryAbi,
  getExpiryV2GracePeriodAbi,
  getExpiryV2UniversalResolverAbi,
} from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: getExpiryV2EthRegistryAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                            | Description                                             |
| --------------------------------- | ------------------------------------------------------- |
| `getExpiryV2EthRegistryAbi`       | Immutable ABI value with viem-compatible literal types. |
| `getExpiryV2TemporalRegistryAbi`  | Immutable ABI value with viem-compatible literal types. |
| `getExpiryV2GracePeriodAbi`       | Immutable ABI value with viem-compatible literal types. |
| `getExpiryV2UniversalResolverAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof getExpiryV2EthRegistryAbi;
```

## Compose fragments

```ts
const abi = [...getExpiryV2EthRegistryAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
