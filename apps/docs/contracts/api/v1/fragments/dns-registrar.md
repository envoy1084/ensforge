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

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use the smallest fragment that contains the function or event you need. Fragments include the custom errors required to decode relevant reverts and can be composed with other fragments when one call site needs several capabilities.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof dnsRegistrarV1InceptionsAbi;
```

## Compose fragments

```ts
const abi = [...dnsRegistrarV1InceptionsAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
