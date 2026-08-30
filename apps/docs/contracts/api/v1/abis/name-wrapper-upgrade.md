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

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof nameWrapperUpgradeV1Abi;
```
