---
title: Versionable
description: Composable resolver profile ABI for Versionable records.
---

# Versionable

Composable resolver profile ABI for Versionable records.

## Import

```ts
import {
  versionableResolverAbi,
  versionableResolverInterfaceId,
} from "@ensforge/contracts/resolver-profiles";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: versionableResolverAbi,
  client: publicClient,
});
```

## Exports

| Export                           | Description                                             |
| -------------------------------- | ------------------------------------------------------- |
| `versionableResolverAbi`         | Immutable ABI value with viem-compatible literal types. |
| `versionableResolverInterfaceId` | ERC-165 interface identifier constant.                  |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
