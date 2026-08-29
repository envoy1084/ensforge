---
title: Pubkey
description: Composable resolver profile ABI for Pubkey records.
---

# Pubkey

Composable resolver profile ABI for Pubkey records.

## Import

```ts
import {
  pubkeyResolverAbi,
  pubkeyResolverInterfaceId,
} from "@ensforge/contracts/resolver-profiles";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: pubkeyResolverAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                      | Description                                             |
| --------------------------- | ------------------------------------------------------- |
| `pubkeyResolverAbi`         | Immutable ABI value with viem-compatible literal types. |
| `pubkeyResolverInterfaceId` | ERC-165 interface identifier constant.                  |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use this profile when encoding, decoding, or detecting the corresponding ENS resolver record. The exported selectors and ABI values are compatible with viem utilities.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof pubkeyResolverAbi;
```
