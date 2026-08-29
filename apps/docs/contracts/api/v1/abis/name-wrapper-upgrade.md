---
title: Name Wrapper Upgrade
description: Complete ABI for the Name Wrapper Upgrade contract.
---

# Name Wrapper Upgrade

Complete ABI for the Name Wrapper Upgrade contract.

## Import

```ts
import { nameWrapperUpgradeV1Abi } from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: nameWrapperUpgradeV1Abi,
  client: publicClient,
});
```

## Exports

| Export                    | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `nameWrapperUpgradeV1Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
