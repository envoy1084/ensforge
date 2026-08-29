---
title: Erc20
description: Shared contract definition for Erc20.
---

# Erc20

Shared contract definition for Erc20.

## Import

```ts
import { erc20Abi } from "@ensforge/contracts/shared";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: erc20Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export     | Description                                             |
| ---------- | ------------------------------------------------------- |
| `erc20Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/shared`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use this immutable protocol constant directly with viem encoding, decoding, contract, and log utilities.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof erc20Abi;
```
