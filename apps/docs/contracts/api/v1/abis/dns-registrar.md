---
title: DNS Registrar
description: Complete ABI for the DNS Registrar contract.
---

# DNS Registrar

Complete ABI for the DNS Registrar contract.

## Import

```ts
import { dnsRegistrarV1InterfaceAbi, dnsRegistrarV1Abi } from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: dnsRegistrarV1InterfaceAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                       | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| `dnsRegistrarV1InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |
| `dnsRegistrarV1Abi`          | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof dnsRegistrarV1InterfaceAbi;
```
