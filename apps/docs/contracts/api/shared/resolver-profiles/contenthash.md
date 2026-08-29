---
title: Contenthash
description: Composable resolver profile ABI for Contenthash records.
---

# Contenthash

Composable resolver profile ABI for Contenthash records.

## Import

```ts
import {
  contenthashResolverAbi,
  contenthashResolverInterfaceId,
} from "@ensforge/contracts/resolver-profiles";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: contenthashResolverAbi,
  client: publicClient,
});
```

## Exports

| Export                           | Description                                             |
| -------------------------------- | ------------------------------------------------------- |
| `contenthashResolverAbi`         | Immutable ABI value with viem-compatible literal types. |
| `contenthashResolverInterfaceId` | ERC-165 interface identifier constant.                  |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
