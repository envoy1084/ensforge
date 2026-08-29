---
title: Pubkey
description: Composable resolver profile ABI for Pubkey records.
---

# Pubkey

Composable resolver profile ABI for Pubkey records.

## Import

```ts
import {
  pubkeyResolverAbi,
  pubkeyResolverInterfaceId,
} from "@ensforge/contracts/resolver-profiles";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: pubkeyResolverAbi,
  client: publicClient,
});
```

## Exports

| Export                      | Description                                             |
| --------------------------- | ------------------------------------------------------- |
| `pubkeyResolverAbi`         | Immutable ABI value with viem-compatible literal types. |
| `pubkeyResolverInterfaceId` | ERC-165 interface identifier constant.                  |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
