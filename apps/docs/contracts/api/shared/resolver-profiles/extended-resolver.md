---
title: Extended Resolver
description: Composable resolver profile ABI for Extended Resolver records.
---

# Extended Resolver

Composable resolver profile ABI for Extended Resolver records.

## Import

```ts
import {
  extendedResolverAbi,
  extendedResolverInterfaceId,
  extendedDnsResolverAbi,
  extendedDnsResolverInterfaceId,
} from "@ensforge/contracts/resolver-profiles";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: extendedResolverAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                           | Description                                             |
| -------------------------------- | ------------------------------------------------------- |
| `extendedResolverAbi`            | Immutable ABI value with viem-compatible literal types. |
| `extendedResolverInterfaceId`    | ERC-165 interface identifier constant.                  |
| `extendedDnsResolverAbi`         | Immutable ABI value with viem-compatible literal types. |
| `extendedDnsResolverInterfaceId` | ERC-165 interface identifier constant.                  |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

<!--@include: @/shared/contracts/entrypoint.md-->

## When to use

Use this profile when encoding, decoding, or detecting the corresponding ENS resolver record. The exported selectors and ABI values are compatible with viem utilities.

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof extendedResolverAbi;
```
