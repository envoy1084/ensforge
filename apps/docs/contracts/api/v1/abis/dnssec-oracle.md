---
title: DNSSEC Oracle
description: Complete ABI for the DNSSEC Oracle contract.
---

# DNSSEC Oracle

Complete ABI for the DNSSEC Oracle contract.

## Import

```ts
import { dnssecOracleV1InterfaceAbi, dnssecOracleV1Abi } from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: dnssecOracleV1InterfaceAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                       | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| `dnssecOracleV1InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |
| `dnssecOracleV1Abi`          | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof dnssecOracleV1InterfaceAbi;
```
