---
title: Permissioned Address Set
description: ENSv2 interface definitions for Permissioned Address Set.
---

# Permissioned Address Set

ENSv2 interface definitions for Permissioned Address Set.

## Import

```ts
import { permissionedAddressSetV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: permissionedAddressSetV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                                 | Description                                             |
| -------------------------------------- | ------------------------------------------------------- |
| `permissionedAddressSetV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
