---
title: Bulk Renewal
description: Complete ABI for the Bulk Renewal contract.
---

# Bulk Renewal

Complete ABI for the Bulk Renewal contract.

## Import

```ts
import {
  bulkRenewalV1InterfaceAbi,
  bulkRenewalV1Abi,
  staticBulkRenewalV1Abi,
} from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: bulkRenewalV1InterfaceAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                      | Description                                             |
| --------------------------- | ------------------------------------------------------- |
| `bulkRenewalV1InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |
| `bulkRenewalV1Abi`          | Immutable ABI value with viem-compatible literal types. |
| `staticBulkRenewalV1Abi`    | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof bulkRenewalV1InterfaceAbi;
```
