---
title: Text
description: Composable resolver profile ABI for Text records.
---

# Text

Composable resolver profile ABI for Text records.

## Import

```ts
import { textResolverAbi, textResolverInterfaceId } from "@ensforge/contracts/resolver-profiles";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: textResolverAbi,
  client: publicClient,
});
```

## Exports

| Export                    | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `textResolverAbi`         | Immutable ABI value with viem-compatible literal types. |
| `textResolverInterfaceId` | ERC-165 interface identifier constant.                  |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
