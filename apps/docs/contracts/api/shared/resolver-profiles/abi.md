---
title: Abi
description: Composable resolver profile ABI for Abi records.
---

# Abi

Composable resolver profile ABI for Abi records.

## Import

```ts
import { abiResolverAbi, abiResolverInterfaceId } from "@ensforge/contracts/resolver-profiles";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: abiResolverAbi,
  client: publicClient,
});
```

## Exports

| Export                   | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `abiResolverAbi`         | Immutable ABI value with viem-compatible literal types. |
| `abiResolverInterfaceId` | ERC-165 interface identifier constant.                  |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
