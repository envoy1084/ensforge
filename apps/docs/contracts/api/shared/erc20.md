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

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: erc20Abi,
  client: publicClient,
});
```

## Exports

| Export     | Description                                             |
| ---------- | ------------------------------------------------------- |
| `erc20Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/shared`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
