---
title: Address Set
description: ENSv2 interface definitions for Address Set.
---

# Address Set

ENSv2 interface definitions for Address Set.

## Import

```ts
import { addressSetV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: addressSetV2InterfaceAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                     | Description                                             |
| -------------------------- | ------------------------------------------------------- |
| `addressSetV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use these constants for ERC-165 capability detection and protocol routing. They describe interface support; they are not contract deployment addresses.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof addressSetV2InterfaceAbi;
```
