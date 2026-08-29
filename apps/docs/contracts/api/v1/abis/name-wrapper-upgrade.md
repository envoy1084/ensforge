---
title: Name Wrapper Upgrade
description: Complete ABI for the Name Wrapper Upgrade contract.
---

# Name Wrapper Upgrade

Complete ABI for the Name Wrapper Upgrade contract.

## Import

```ts
import { nameWrapperUpgradeV1Abi } from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: nameWrapperUpgradeV1Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                    | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `nameWrapperUpgradeV1Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use the complete ABI when one integration needs several unrelated functions or event families from this contract. For a single SDK action, prefer the corresponding focused fragment to minimize bundled ABI data.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof nameWrapperUpgradeV1Abi;
```
