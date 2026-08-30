---
title: Text
description: Composable resolver profile ABI for Text records.
---

# Text

Composable resolver profile ABI for Text records.

## Import

```ts
import { textResolverAbi, textResolverInterfaceId } from "@ensforge/contracts/resolver-profiles";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: textResolverAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                    | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `textResolverAbi`         | Immutable ABI value with viem-compatible literal types. |
| `textResolverInterfaceId` | ERC-165 interface identifier constant.                  |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

<!--@include: @/shared/contracts/entrypoint.md-->

## When to use

Use this profile when encoding, decoding, or detecting the corresponding ENS resolver record. The exported selectors and ABI values are compatible with viem utilities.

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof textResolverAbi;
```
