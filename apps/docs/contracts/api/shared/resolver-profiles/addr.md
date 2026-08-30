---
title: Addr
description: Composable resolver profile ABI for Addr records.
---

# Addr

Composable resolver profile ABI for Addr records.

## Import

```ts
import {
  addrResolverAbi,
  addrResolverInterfaceId,
  addressResolverAbi,
  addressResolverInterfaceId,
  hasAddressResolverAbi,
  hasAddressResolverInterfaceId,
} from "@ensforge/contracts/resolver-profiles";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: addrResolverAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                          | Description                                             |
| ------------------------------- | ------------------------------------------------------- |
| `addrResolverAbi`               | Immutable ABI value with viem-compatible literal types. |
| `addrResolverInterfaceId`       | ERC-165 interface identifier constant.                  |
| `addressResolverAbi`            | Immutable ABI value with viem-compatible literal types. |
| `addressResolverInterfaceId`    | ERC-165 interface identifier constant.                  |
| `hasAddressResolverAbi`         | Immutable ABI value with viem-compatible literal types. |
| `hasAddressResolverInterfaceId` | ERC-165 interface identifier constant.                  |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

<!--@include: @/shared/contracts/entrypoint.md-->

## When to use

Use this profile when encoding, decoding, or detecting the corresponding ENS resolver record. The exported selectors and ABI values are compatible with viem utilities.

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof addrResolverAbi;
```
