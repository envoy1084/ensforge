---
title: Extended Resolver
description: Composable resolver profile ABI for Extended Resolver records.
---

# Extended Resolver

Composable resolver profile ABI for Extended Resolver records.

## Import

```ts
import {
  extendedResolverAbi,
  extendedResolverInterfaceId,
  extendedDnsResolverAbi,
  extendedDnsResolverInterfaceId,
} from "@ensforge/contracts/resolver-profiles";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: extendedResolverAbi,
  client: publicClient,
});
```

## Exports

| Export                           | Description                                             |
| -------------------------------- | ------------------------------------------------------- |
| `extendedResolverAbi`            | Immutable ABI value with viem-compatible literal types. |
| `extendedResolverInterfaceId`    | ERC-165 interface identifier constant.                  |
| `extendedDnsResolverAbi`         | Immutable ABI value with viem-compatible literal types. |
| `extendedDnsResolverInterfaceId` | ERC-165 interface identifier constant.                  |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
