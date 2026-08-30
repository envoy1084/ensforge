---
title: ETH Renewer V1
description: Complete ABI for the ETH Renewer V1 contract.
---

# ETH Renewer V1

Complete ABI for the ETH Renewer V1 contract.

## Import

```ts
import { ethRenewerV1Abi } from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRenewerV1Abi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export            | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `ethRenewerV1Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/complete-abi.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof ethRenewerV1Abi;
```
