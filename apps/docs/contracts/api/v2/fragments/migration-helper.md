---
title: Migration Helper
description: Focused, tree-shakable ABI fragments for Migration Helper.
---

# Migration Helper

Focused, tree-shakable ABI fragments for Migration Helper.

## Import

```ts
import {
  migrationHelperV2NameWrapperAbi,
  migrationHelperV2MigrateAbi,
} from "@ensforge/contracts/v2";
```

## Usage

::: code-group

```ts [contract.ts]
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: migrationHelperV2NameWrapperAbi,
  client: publicClient,
});
```

<<< @/snippets/contracts/client.ts

:::

## Exports

| Export                            | Description                                             |
| --------------------------------- | ------------------------------------------------------- |
| `migrationHelperV2NameWrapperAbi` | Immutable ABI value with viem-compatible literal types. |
| `migrationHelperV2MigrateAbi`     | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use the smallest fragment that contains the function or event you need. Fragments include the custom errors required to decode relevant reverts and can be composed with other fragments when one call site needs several capabilities.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof migrationHelperV2NameWrapperAbi;
```

## Compose fragments

```ts
const abi = [...migrationHelperV2NameWrapperAbi, ...anotherFragment] as const;
```

Keep the composed value local to the call site so bundlers can remove unrelated contract surfaces.
