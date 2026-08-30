---
title: DNS Registrar
description: Focused, tree-shakable ABI fragments for DNS Registrar.
---

# DNS Registrar

Focused, tree-shakable ABI fragments for DNS Registrar.

## Import

```ts
import {
  dnsRegistrarV1InceptionsAbi,
  dnsRegistrarV1OracleAbi,
  dnsRegistrarV1ProveAndClaimAbi,
  dnsRegistrarV1ProveAndClaimWithResolverAbi,
} from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: dnsRegistrarV1InceptionsAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                       | Description                                             |
| -------------------------------------------- | ------------------------------------------------------- |
| `dnsRegistrarV1InceptionsAbi`                | Immutable ABI value with viem-compatible literal types. |
| `dnsRegistrarV1OracleAbi`                    | Immutable ABI value with viem-compatible literal types. |
| `dnsRegistrarV1ProveAndClaimAbi`             | Immutable ABI value with viem-compatible literal types. |
| `dnsRegistrarV1ProveAndClaimWithResolverAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof dnsRegistrarV1InceptionsAbi;
```

## Compose fragments

```ts
const abi = [...dnsRegistrarV1InceptionsAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
