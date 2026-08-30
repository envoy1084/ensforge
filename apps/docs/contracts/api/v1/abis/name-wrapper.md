---
title: Name Wrapper
description: Complete ABI for the Name Wrapper contract.
---

# Name Wrapper

Complete ABI for the Name Wrapper contract.

## Import

```ts
import { nameWrapperV1Abi } from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: nameWrapperV1Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export             | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `nameWrapperV1Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof nameWrapperV1Abi;
```
