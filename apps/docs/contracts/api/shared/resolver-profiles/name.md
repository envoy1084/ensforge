---
title: Name
description: Composable resolver profile ABI for Name records.
---

# Name

Composable resolver profile ABI for Name records.

## Import

```ts
import { nameResolverAbi, nameResolverInterfaceId } from "@ensforge/contracts/resolver-profiles";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: nameResolverAbi,
  client: publicClient,
});
```

## Exports

| Export                    | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `nameResolverAbi`         | Immutable ABI value with viem-compatible literal types. |
| `nameResolverInterfaceId` | ERC-165 interface identifier constant.                  |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
