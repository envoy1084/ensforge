---
title: DNS Record
description: Composable resolver profile ABI for DNS Record records.
---

# DNS Record

Composable resolver profile ABI for DNS Record records.

## Import

```ts
import {
  dnsRecordResolverAbi,
  dnsRecordResolverInterfaceId,
} from "@ensforge/contracts/resolver-profiles";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: dnsRecordResolverAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                         | Description                                             |
| ------------------------------ | ------------------------------------------------------- |
| `dnsRecordResolverAbi`         | Immutable ABI value with viem-compatible literal types. |
| `dnsRecordResolverInterfaceId` | ERC-165 interface identifier constant.                  |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

<!--@include: @/shared/contracts/entrypoint.md-->

## When to use

Use this profile when encoding, decoding, or detecting the corresponding ENS resolver record. The exported selectors and ABI values are compatible with viem utilities.

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof dnsRecordResolverAbi;
```
