---
title: Addr
description: Composable resolver profile ABI for Addr records.
---

# Addr

Composable resolver profile ABI for Addr records.

## Import

```ts
import {
  addrResolverAbi,
  addrResolverInterfaceId,
  addressResolverAbi,
  addressResolverInterfaceId,
  hasAddressResolverAbi,
  hasAddressResolverInterfaceId,
} from "@ensforge/contracts/resolver-profiles";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: addrResolverAbi,
  client: publicClient,
});
```

## Exports

| Export                          | Description                                             |
| ------------------------------- | ------------------------------------------------------- |
| `addrResolverAbi`               | Immutable ABI value with viem-compatible literal types. |
| `addrResolverInterfaceId`       | ERC-165 interface identifier constant.                  |
| `addressResolverAbi`            | Immutable ABI value with viem-compatible literal types. |
| `addressResolverInterfaceId`    | ERC-165 interface identifier constant.                  |
| `hasAddressResolverAbi`         | Immutable ABI value with viem-compatible literal types. |
| `hasAddressResolverInterfaceId` | ERC-165 interface identifier constant.                  |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
