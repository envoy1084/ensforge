---
title: Bulk Renewal
description: Focused, tree-shakable ABI fragments for Bulk Renewal.
---

# Bulk Renewal

Focused, tree-shakable ABI fragments for Bulk Renewal.

## Import

```ts
import { bulkRenewalV1RenewAllAbi } from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: bulkRenewalV1RenewAllAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                     | Description                                             |
| -------------------------- | ------------------------------------------------------- |
| `bulkRenewalV1RenewAllAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof bulkRenewalV1RenewAllAbi;
```

## Compose fragments

```ts
const abi = [...bulkRenewalV1RenewAllAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
