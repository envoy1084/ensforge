---
title: Interface
description: Composable resolver profile ABI for Interface records.
---

# Interface

Composable resolver profile ABI for Interface records.

## Import

```ts
import {
  interfaceResolverAbi,
  interfaceResolverInterfaceId,
} from "@ensforge/contracts/resolver-profiles";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: interfaceResolverAbi,
  client: publicClient,
});
```

## Exports

| Export                         | Description                                             |
| ------------------------------ | ------------------------------------------------------- |
| `interfaceResolverAbi`         | Immutable ABI value with viem-compatible literal types. |
| `interfaceResolverInterfaceId` | ERC-165 interface identifier constant.                  |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
