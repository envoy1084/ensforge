---
title: DNS Zone
description: Composable resolver profile ABI for DNS Zone records.
---

# DNS Zone

Composable resolver profile ABI for DNS Zone records.

## Import

```ts
import {
  dnsZoneResolverAbi,
  dnsZoneResolverInterfaceId,
} from "@ensforge/contracts/resolver-profiles";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: dnsZoneResolverAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                       | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| `dnsZoneResolverAbi`         | Immutable ABI value with viem-compatible literal types. |
| `dnsZoneResolverInterfaceId` | ERC-165 interface identifier constant.                  |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

<!--@include: @/shared/contracts/entrypoint.md-->

## When to use

Use this profile when encoding, decoding, or detecting the corresponding ENS resolver record. The exported selectors and ABI values are compatible with viem utilities.

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof dnsZoneResolverAbi;
```
