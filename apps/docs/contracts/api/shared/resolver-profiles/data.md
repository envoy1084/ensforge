---
title: Data
description: Composable resolver profile ABI for Data records.
---

# Data

Composable resolver profile ABI for Data records.

## Import

```ts
import { dataResolverAbi, dataResolverInterfaceId } from "@ensforge/contracts/resolver-profiles";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: dataResolverAbi,
  client: publicClient,
});
```

## Exports

| Export                    | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `dataResolverAbi`         | Immutable ABI value with viem-compatible literal types. |
| `dataResolverInterfaceId` | ERC-165 interface identifier constant.                  |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
