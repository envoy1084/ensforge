---
title: Registry Upgrade Set
description: Complete ABI for the Registry Upgrade Set contract.
---

# Registry Upgrade Set

Complete ABI for the Registry Upgrade Set contract.

## Import

```ts
import { registryUpgradeSetV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: registryUpgradeSetV2Abi,
  client: publicClient,
});
```

## Exports

| Export                    | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `registryUpgradeSetV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
