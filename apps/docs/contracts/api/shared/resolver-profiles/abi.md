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

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use this profile when encoding, decoding, or detecting the corresponding ENS resolver record. The exported selectors and ABI values are compatible with viem utilities.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof abiResolverAbi;
```
