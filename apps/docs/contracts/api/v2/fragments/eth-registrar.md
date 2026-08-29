---
title: ETH Registrar
description: Focused, tree-shakable ABI fragments for ETH Registrar.
---

# ETH Registrar

Focused, tree-shakable ABI fragments for ETH Registrar.

## Import

```ts
import {
  ethRegistrarV2MaxCommitmentAgeAbi,
  ethRegistrarV2MinCommitmentAgeAbi,
  ethRegistrarV2MinRegisterDurationAbi,
  ethRegistrarV2MinRenewDurationAbi,
  ethRegistrarV2CommitmentAtAbi,
  ethRegistrarV2GetRegisterPriceAbi,
  ethRegistrarV2IsAvailableAbi,
  ethRegistrarV2IsRenewableAbi,
  ethRegistrarV2MakeCommitmentAbi,
  ethRegistrarV2RegisterAbi,
  ethRegistrarV2RentPriceOracleAbi,
} from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRegistrarV2MaxCommitmentAgeAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                                 | Description                                             |
| -------------------------------------- | ------------------------------------------------------- |
| `ethRegistrarV2MaxCommitmentAgeAbi`    | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarV2MinCommitmentAgeAbi`    | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarV2MinRegisterDurationAbi` | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarV2MinRenewDurationAbi`    | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarV2CommitmentAtAbi`        | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarV2GetRegisterPriceAbi`    | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarV2IsAvailableAbi`         | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarV2IsRenewableAbi`         | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarV2MakeCommitmentAbi`      | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarV2RegisterAbi`            | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarV2RentPriceOracleAbi`     | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use the smallest fragment that contains the function or event you need. Fragments include the custom errors required to decode relevant reverts and can be composed with other fragments when one call site needs several capabilities.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof ethRegistrarV2MaxCommitmentAgeAbi;
```

## Compose fragments

```ts
const abi = [...ethRegistrarV2MaxCommitmentAgeAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
