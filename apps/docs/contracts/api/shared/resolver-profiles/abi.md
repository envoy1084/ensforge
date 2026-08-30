---
title: Abi
description: Composable resolver profile ABI for Abi records.
---

# Abi

Composable resolver profile ABI for Abi records.

## Import

```ts
import { abiResolverAbi, abiResolverInterfaceId } from "@ensforge/contracts/resolver-profiles";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: abiResolverAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                   | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `abiResolverAbi`         | Immutable ABI value with viem-compatible literal types. |
| `abiResolverInterfaceId` | ERC-165 interface identifier constant.                  |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

<!--@include: @/shared/contracts/entrypoint.md-->

## When to use

Use this profile when encoding, decoding, or detecting the corresponding ENS resolver record. The exported selectors and ABI values are compatible with viem utilities.

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof abiResolverAbi;
```
