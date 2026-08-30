---
title: Verifiable Factory
description: Focused, tree-shakable ABI fragments for Verifiable Factory.
---

# Verifiable Factory

Focused, tree-shakable ABI fragments for Verifiable Factory.

## Import

```ts
import {
  verifiableFactoryV2DeployProxyAbi,
  verifiableFactoryV2VerifyContractAbi,
} from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: verifiableFactoryV2DeployProxyAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                 | Description                                             |
| -------------------------------------- | ------------------------------------------------------- |
| `verifiableFactoryV2DeployProxyAbi`    | Immutable ABI value with viem-compatible literal types. |
| `verifiableFactoryV2VerifyContractAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof verifiableFactoryV2DeployProxyAbi;
```

## Compose fragments

```ts
const abi = [...verifiableFactoryV2DeployProxyAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
