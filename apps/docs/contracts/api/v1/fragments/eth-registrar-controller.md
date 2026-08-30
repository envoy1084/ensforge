---
title: ETH Registrar Controller
description: Focused, tree-shakable ABI fragments for ETH Registrar Controller.
---

# ETH Registrar Controller

Focused, tree-shakable ABI fragments for ETH Registrar Controller.

## Import

```ts
import {
  ethRegistrarControllerV1MinRegistrationDurationAbi,
  ethRegistrarControllerV1CommitmentsAbi,
  ethRegistrarControllerV1MakeCommitmentAbi,
  ethRegistrarControllerV1MaxCommitmentAgeAbi,
  ethRegistrarControllerV1MinCommitmentAgeAbi,
  ethRegistrarControllerV1PricesAbi,
  ethRegistrarControllerV1RegisterAbi,
  ethRegistrarControllerV1RenewAbi,
  ethRegistrarControllerV1RentPriceAbi,
} from "@ensforge/contracts/v1";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRegistrarControllerV1MinRegistrationDurationAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                               | Description                                             |
| ---------------------------------------------------- | ------------------------------------------------------- |
| `ethRegistrarControllerV1MinRegistrationDurationAbi` | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarControllerV1CommitmentsAbi`             | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarControllerV1MakeCommitmentAbi`          | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarControllerV1MaxCommitmentAgeAbi`        | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarControllerV1MinCommitmentAgeAbi`        | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarControllerV1PricesAbi`                  | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarControllerV1RegisterAbi`                | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarControllerV1RenewAbi`                   | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarControllerV1RentPriceAbi`               | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

<!--@include: @/shared/contracts/entrypoint.md-->

<!--@include: @/shared/contracts/fragment.md-->

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof ethRegistrarControllerV1MinRegistrationDurationAbi;
```

## Compose fragments

```ts
const abi = [...ethRegistrarControllerV1MinRegistrationDurationAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
