---
title: Erc20
description: Focused, tree-shakable ABI fragments for Erc20.
---

# Erc20

Focused, tree-shakable ABI fragments for Erc20.

## Import

```ts
import {
  erc20AllowanceAbi,
  erc20ApproveAbi,
  erc20DecimalsAbi,
  erc20SymbolAbi,
} from "@ensforge/contracts/shared";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: erc20AllowanceAbi,
  client: publicClient,
});
```

## Exports

| Export              | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `erc20AllowanceAbi` | Immutable ABI value with viem-compatible literal types. |
| `erc20ApproveAbi`   | Immutable ABI value with viem-compatible literal types. |
| `erc20DecimalsAbi`  | Immutable ABI value with viem-compatible literal types. |
| `erc20SymbolAbi`    | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/shared`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
